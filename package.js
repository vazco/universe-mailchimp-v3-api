Package.describe({
    name: 'universe:mailchimp-v3-api',
    version: '1.0.0',
    summary: 'Wrapper for mailchimp APIv3'
});

Package.onUse(function (api) {
    api.versionsFrom('METEOR@1.3-modules-beta.4');

    api.use('ecmascript');

    api.mainModule('index.js');
});