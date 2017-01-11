
(function () {
    'use strict';

    var core = angular.module('app.core');

    core.factory('authservice', authservice);
    authservice.$inject = ['logger', 'config', '$rootScope', '$injector','$q', 'app.constants'];

    function authservice(logger, config, $rootScope, $injector, $q, constants) {
        var service = {
            //getAuthTokens: getAuthTokens,
            getJwtToken:getJwtToken,
            request: request,
            responseError: responseError
        };

        return service;

        function getAuthTokens () {
                var deferred = $q.defer();

                var tokens = {};
                var serviceIdentiferMap = config.authSettings.serviceNameAndBaseUrlMap;

                $injector.get('$http')({
                    method: 'POST',
                    url: config.authSettings.authUrl,
                    ignoreInterceptor:true,
                    data:
                        {
                            ForceTokenRefresh: false,
                            RelyingParties: Object.keys(serviceIdentiferMap)
                        }
                }).success(function (data) {
                    if (data.IsUserAuthenticated)
                    {
                        logger.log('refreshed jwt tokens: ' + data);
                        var serviceTokenMap = {};
                        angular.forEach(data.JwtToken, function (value, key) {
                            var serviceName = data.JwtToken[key].RelyingParty;

                            //Get root url for service name from the configured- serviceNameAndBaseUrlMap
                            var serviceRootUrl = serviceIdentiferMap[serviceName];

                            //Create a Service Token map which will store mapping of service-url:jwtToken...
                            //This map would be used by Interceptor to inject token for the corresponding service url
                            serviceTokenMap[serviceRootUrl] = data.JwtToken[key].Token;
                        });

                        $rootScope.serviceTokensMap = serviceTokenMap;
                        //log(serviceTokenMap);
                        deferred.resolve();
                    }
                    else
                    {
                        //Our session has expired, so alert the user and reload the page
                        //so that he is taken to login page
                        $injector.get('ngDialog').open({
                            template: 'Your session has expired. Please login again',
                            plain: true,
                            preCloseCallback: function () {
                                //reload to redirect user to login page
                                location.reload();
                            }
                        });
                    }

                }).error(function (e) {
                    logger.log('Failed to obtain user info: ');
                    deferred.reject('Failed to obtain user info.');
                });
                return deferred.promise;
        }

        function getJwtToken() {
            var url = constants.global.tokenUrl,
                    deferred = $q.defer(),
                    defaults = {},
                    parameter = 'grant_type=' + encodeURIComponent(constants.global.grantType) + '&assertion=' + encodeURIComponent(jwt) + '&scope=' + encodeURIComponent(constants.global.apiSvcId),
            config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                }
            };
            var http = $injector.get('$http');
            http.post(url, parameter, config)
                .success(function (data) { deferred.resolve(data); })
                .error(function (data, status) {
                    logger.log('Failed to obtain jwt' + data);
                    deferred.reject({ data: data, status: status });
                });

            return deferred.promise;
        }

        //Request Interceptor to add auth bearer token to request header
        //function request(config) {
        //    logger.log('In Request interceptor');
        //    for (var serviceRootUrl in $rootScope.serviceTokensMap) {
        //        if (config.url.toLowerCase().match(serviceRootUrl.toLowerCase())) {
        //            config.headers.Authorization = 'Bearer ' +
        //                $rootScope.serviceTokensMap[serviceRootUrl];
        //            break;
        //        }
        //    }
        //    return config;
        //}

        function request(config) {
            logger.log('In Request interceptor');
            if (config && config.url!=undefined) {
                if (config.url.indexOf(BASE_URL) === 0) {
                    //jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ind0NFVKb0lheHFadUpSTnE5Sk12LW5LU0FQOCJ9.eyJpc3MiOiJ1cm46ZmVkZXJhdGlvbjphY2NlbnR1cmU6c3RhZ2UiLCJhdWQiOiJodHRwczovL211bHRpc2tpbGxhcGkuY2lvZGV2LmFjY2VudHVyZS5jb20iLCJuYmYiOjE0NTcwODIxOTAsImV4cCI6MTQ1NzA4NTc5MCwibmFtZWlkIjoibGkuZC5saUBhY2NlbnR1cmUuY29tIiwidXBuIjoibGkuZC5saUBhY2NlbnR1cmUuY29tIiwidW5pcXVlX25hbWUiOiJsaS5kLmxpQGFjY2VudHVyZS5jb20iLCJlbWFpbCI6ImxpLmQubGlAYWNjZW50dXJlLmNvbSIsImh0dHBzOi8vZmVkZXJhdGlvbi1zdHMuYWNjZW50dXJlLmNvbS9zY2hlbWFzL2NsYWltcy8xL2VudGVycHJpc2VpZCI6ImxpLmQubGkiLCJodHRwczovL2ZlZGVyYXRpb24tc3RzLmFjY2VudHVyZS5jb20vc2NoZW1hcy9jbGFpbXMvMS9wZW9wbGVrZXkiOiI4MTI2MzQiLCJodHRwczovL2ZlZGVyYXRpb24tc3RzLmFjY2VudHVyZS5jb20vc2NoZW1hcy9jbGFpbXMvMS9wZXJzb25uZWxudW1iZXIiOiIxMDc3Mzg1NCIsImF1dGhtZXRob2QiOiJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YWM6Y2xhc3NlczpQYXNzd29yZFByb3RlY3RlZFRyYW5zcG9ydCIsImF1dGhfdGltZSI6IjIwMTYtMDMtMDRUMDI6NDM6MTQuNjk2WiJ9.c79NUzF1cilpWc2V5eSfsitb0jS94zWDU7J2L6Vq5sve7uN4vJt7h8RkWxjL6BZfTS6NYA5RMN2guOlKjavdFDOP5V0hRgKpOlOyEPmvatCJEdmbVpqy3fzJwwLMZB_kc178zl5kl3Ie5mXmJSnVsD1nbMeSaj8tY3CbX2KeM1qObplh5FkPkgi4xcQkHOI2XPCOxPRLm2nuGg75Rk37G92nMc0IFbxH7vy9IGLwemKkTfbrufOLrL1ztgEGJHk6xM9EQtE6oB1tx1XT5himeyekP8uTKzcYB9wRuKYorRphWaKNRcbAPTDy98KDTKAsx72AApI_tdGN3cvmLPVrSQ';
                    if (jwt !== '') {
                        config.headers.Authorization = "Bearer " + jwt;
                    }
                }
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     

            return config;
        }

      
        //Response Interceptor to manage token refreshal
        function responseError(response) {

            //Handles 401 response by renewing the token and retrying the service call again
            //ignoreInterceptor proeprty is set to bypass the response interceptor in scenario
            //when the service retry call is made
            //from within the interceptor

            var deferred = $q.defer(); // defer until we can re-request a new token

            if (!(response.config.hasOwnProperty('ignoreInterceptor') &&
                response.config.ignoreInterceptor)) {
                switch (response.status) {
                    case 400:
                        logger.error(response.data.Message);
                        break;
                    case 401:
                        window.angularlink.go('401');
                        //Refresh jwt tokens
                        //service.getAuthTokens().then(
                        //function () {
                        //    response.config.ignoreInterceptor = true;
                        //    logger.log('Retrying service request with new Tokens');
                        //    $injector.get('$http')(response.config).then(function (response) {
                        //        logger.log('Retry was success');
                        //        // we have a successful response - resolve it using deferred
                        //        deferred.resolve(response);
                        //    },
                        //    function (error) {
                        //        logger.log('error on retrying service request: ' + error);
                        //        deferred.reject(error);
                        //        // something went wrong
                        //    });

                        //}, function (response, status) {
                        //    //log('error on fetching jwt token.');
                        //    logger.log('failed to refresh jwt');
                        //    // not a recoverable error
                        //    deferred.reject('failed to refresh jwt, error: ' + response);

                        //});
                        //   $state.go('error');

                        break;
                    case 402:
                        logger.error(response.data.Message);
                        break;
                    case 403:
                        logger.error(response.data.Message);
                        break;
                    case 405:                       
                        logger.error(response.data.Message);
                        break;
                    default:
                     //   $state.go('error');

                }
            }
            else {
                logger.log('Ignored response interceptor');
                deferred.reject(response);
            }
            return deferred.promise;//// return the deferred promise
        }
    }
})();
