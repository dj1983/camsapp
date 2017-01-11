/* jshint -W106 */
/* jshint -W117 */
(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    toastrConfig.$inject = [];
    /* @ngInject */
    function toastrConfig() {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[MSA Error] ',
        appTitle: 'Multi Skill CAMS'
    };
    core.value('config', config);
    core.config(configure);
    configure.$inject = ['$logProvider', '$locationProvider',
        '$httpProvider', 'routerHelperProvider', 'exceptionHandlerProvider',
        'adalAuthenticationServiceProvider'];

    /* @ngInject */
    function configure($logProvider, $locationProvider, $httpProvider,
        routerHelperProvider, exceptionHandlerProvider, adalProvider) {

        $httpProvider.interceptors.push('authservice');
        
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({docTitle: config.appTitle});

        // using '!' as the hashPrefix but can be a character of your choosing
        $locationProvider.html5Mode(true).hashPrefix('!');

        //Initialize REBAR OAUTH2 plugin for OAUTH2 authorization
        //Its pre-configured for Dev Signon Identity server

        adalProvider.init(
        {

            /*
            authorizationUrl value for various environemnts:
            Dev Sign On: http://localhost:44336/core/connect/
            ADFS Stage: https://federation-sts-stage.accenture.com/oauth/ls/connect/
            ADFS PROD: https://federation-sts.accenture.com/oauth/ls/connect/
            */

            authorizationUrl: 'http://localhost:44336/core/connect/',
            clientId: 'spa-template',
            'response_type': 'id_token token',
            'redirect_uri': 'http://localhost:32344/',
            scope: 'openid identityApi MyServicesApi',

            //Optional -- Only If you need to support OAUTH1 based services
            oauth1Endpoint: 'http://localhost:44336/adfs',

            //Optional -- Only If you need to consume OAUTH1 based services            
            //You need to add it as a map of identifier:ServiceRootUrl
            /*
            identifier: this should be the service identifier registered in adfs
            ServiceRootUrl: This is the base url of the service
            */
            //For e.g.
            /*
            oauth1ServicesAndIdentifierMap: {
            'urn:myteliteservices': 'https://myteservices.accenture.com',
            'urn:peopleservice': 'https://peopleservices.accenture.com',
            }
            */
            oauth1ServicesAndIdentifierMap:
            {
                'urn:MyService':
                    'http://localhost:52583/oauth1'
            }

            //cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
        },
        $httpProvider
        );
    }
})();
