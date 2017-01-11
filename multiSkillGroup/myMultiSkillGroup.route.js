(function () {
    'use strict';

    angular
        .module('app.myMultiSkillGroup')
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
                    url: '/',
                    //templateUrl: 'app/home/home.html',
                    templateUrl: 'app/multiSkillGroup/myMultiSkillGroup.html',
                    controller: 'myMultiSkillGroupController',
                    controllerAs: 'vm',
                    title: 'Home'
                }
            },
            {
                state: 'myMultiSkillGroup',
                config: {
                    url: '/myMultiSkillGroup',
                    templateUrl: 'app/multiSkillGroup/myMultiSkillGroup.html',
                    controller: 'myMultiSkillGroupController',
                    controllerAs: 'vm',
                    title: 'Home',
                    /*
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-multiSkillGroup"></i> my Multi Skill Group'
                    },
                    */
                    //This property is to protect your route with OpenID Connect Authentication
                    requireADLogin: false
                }
            }
        ];
    }
})();
