(function () {
    'use strict';

    angular
        .module('app.core', [
            'ngAnimate', 'ngSanitize',
            'blocks.exception', 'blocks.logger', 'blocks.router',
            'ui.router', 'ngplus', 'ngDialog', 'toastr', 'AdalAngular'
        ]);

    var core = angular.module('app.core');
    //core.run(function ($timeout, authservice) {
    //    RefreshJwt();
    //});

    //function RefreshJwt()
    //{
    //    console.log('starting get jwt');
    //    if (ENABLE_ESO.toUpperCase() == "YES")
    //    {
    //        authservice.getJwtToken().then(
    //                function (data) {
    //                    jwt = data.access_token;
    //                    console.log("getJWTToken: " + new Date() + jwt);
    //                },
    //                function (error) {
    //                    console.log("getJWTToken: " + new Date() + "ESO token expired.");
    //                }
    //            );
    //    }

    //    $timeout(function () {
    //        RefreshJwt();
    //        console.log('update with timeout fired - done getting jwt')
    //    }, 5000);
    //}
})();
