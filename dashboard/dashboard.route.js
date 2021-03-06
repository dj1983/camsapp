(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'dashboard',
                config: {
                    url: '/dashboard',
                    templateUrl: 'app/dashboard/dashboard.html',
                    controller: 'DashboardController',
                    controllerAs: 'vm',
                    title: 'dashboard',                    
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-dashboard"></i> DASHBOARD'
                    },
                    //This property is to protect your route with OpenID Connect Authentication
                    requireADLogin: false
                }
            }
        ];
    }
})();
