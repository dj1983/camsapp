(function() {
    'use strict';

    angular
        .module('app.home')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'index',
                config: {
                    url: '/index.html',
                    //templateUrl: 'app/home/home.html',
                    templateUrl: 'app/multiSkillGroup/myMultiSkillGroup.html',
                    title: 'Home'
                }
            },
            {
                state: 'home',
                config: {
                    url: '/',
                    //templateUrl: 'app/home/home.html',
                    //controller: 'HomeController',
                    templateUrl: 'app/multiSkillGroup/myMultiSkillGroup.html',
                    controller: 'myMultiSkillGroupController',
                    controllerAs: 'vm',
                    title: 'Home',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-home"></i> HOME'
                    }
                }
            }
        ];
    }
})();
