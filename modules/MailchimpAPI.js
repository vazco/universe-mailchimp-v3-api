import {Promise} from 'meteor/promise';
import {HTTP} from 'meteor/http';
import _ from 'lodash';
import md5 from 'md5';

class MailchimpAPI {
    constructor (apiKey = null, {timeout = 10000} = {}) {
        if (apiKey) {
            this.setApiKey(apiKey);
        }
        this.timeout = timeout;
    }

    setApiKey (apiKey) {
        const dc = apiKey.split('-')[1];
        if (!dc) {
            throw 'There is no DC at the end of the apiKey. Please check if it\'s format is "someRandomHash-{dc}"';
        }
        this.dc = dc;
        this.auth = new Buffer(`anystring:${apiKey}`).toString('base64');
        this.rootDirectory = `https://${this.dc}.api.mailchimp.com/3.0`;
        this.headers = {
            'Access-Control-Allow-Origin': `https://${dc}.api.mailchimp.com/3.0/*`,
            'Authorization': `Basic ${this.auth}`
        };
        this.apiKey = apiKey;
        return this;
    }

    _apiCall (method = 'GET', {resource = '', queryParams = {}, body = {}} = {}) {
        let params = [this.rootDirectory];
        method = method.toUpperCase();
        
        if (_.isString(resource)) {
            resource = [resource];
        }

        resource = _.chain(resource)
            .map(param => {
                return _.isString(param) ? param : `${param.name}/${param.value}`;
            })
            .join('/')
            .value();

        if (!_.isEmpty(resource)) {
            params.push(resource);
        }

        queryParams = _.isEmpty(queryParams) ? '' : ('?' + _.chain(queryParams)
            .map((value, name) => {
                return `${name}=${value}`;
            })
            .join('&')
            .value());

        params = params.join('/');
        const resourceUrl = `${params}${queryParams}`;

        const mailchimpRequest = new Promise((resolve, reject) => {
            HTTP.call(
                method,
                resourceUrl,
                {
                    data: body,
                    headers: this.headers
                },
                (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                }
            );
        });

        mailchimpRequest.catch(err => {
            console.error('Mailchimp error', err);
        });

        return mailchimpRequest;
    }

    /*eslint-disable camelcase*/

    /**
     * Adds a new member to a mailing list
     * @param {String} list_id - List ID from mailchimp
     * @param {Object} body - parameters for request email_address and status are mandatory
     * @returns {Promise} promise with response from mailchimp
     */
    addANewListMember ({list_id = '', body = {}}) {
        return this._apiCall('POST', {
            resource: [
                {name: 'lists', value: list_id},
                'members'
            ],
            body
        });
    }

    /**
     * Removes a member from a mailing list.
     * @param {String} list_id - List ID from mailchimp
     * @param {string} email - An e-mail addres of the member who should be removed
     * @returns {Promise} promise with response from mailchimp
     */
    removeAListMember ({list_id = '', email = ''}) {
        return this._apiCall('DELETE', {
            resource: [
                {name: 'lists', value: list_id},
                {name: 'members', value: md5(email.toLowerCase())}
            ]
        })
    }
    /*eslint-disable camelcase*/
}

export default new MailchimpAPI();
