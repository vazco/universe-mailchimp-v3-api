<h1 align="center">
    <a href="https://github.com/vazco">vazco</a>/Universe Mailchimp v3 API
</h1>

&nbsp;

Package for using the newest Mailchimp API.

## Implemented functions:

* Add a new list member

## List of all functions

http://developer.mailchimp.com/documentation/mailchimp/reference/overview/

## A way to add a new function

You need to create new function within which you invoke: 

```
#!javascript

this._apiCall(method = 'GET', {resource = '', queryParams = {}, body = {}} = {})

```

method [String] - http method type - CRUD - POST, GET, PUT, DELETE

resource [String|Array of String|Array of Object] - the order has meaning here - corresponds to "Endpoints" from Mailchimp API documentation.

queryParams [Object] - order has no meaning - corresponds to "Query string parameters" from Mailchimp API documentation.

body [Object] - request body - corresponds to "Request body parameters" from Mailchimp API.


## Usage


```
#!javascript

import mailchimpAPI from 'meteor/universe:mailchimp-v3-api';

...

mailchimpAPI.setApiKey('your API key from Mailchimp');
mailchimpAPI.addANewListMember({
    list_id: 'adfaf',
    body: {
        email_address: 'test@vazco.eu',
        status: 'pending'
    }
});
```

you can use chain notation as well:

```
#!javascript

mailchimpAPI.setApiKey('your API key from Mailchimp').addANewListMember({
    list_id: 'adfaf',
    body: {
        email_address: 'test@vazco.eu',
        status: 'pending'
    }
});
```

### License

<img src="https://vazco.eu/banner.png" align="right">

**Like every package maintained by [Vazco](https://vazco.eu/), Universe Mailchimp v3 API is [MIT licensed](https://github.com/vazco/uniforms/blob/master/LICENSE).**
