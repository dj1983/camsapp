(function () {
    'use strict';

    angular
        .module('app.master')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        var adminvalidition = "No";
        angular.forEach(Links, function (data) {
            if (data.LinkName == "ViewDetails" || data.LinkName == "ViewDetailsForAdmin") {
                adminvalidition = "Yes";
            }
        });
        if (adminvalidition == "Yes") {
            routerHelper.configureStates(getStates());
        }
        else {
            routerHelper.configureStates(getStateshome());
        }
    }
    

    function getStates() {
        return [
    {
        state: 'master',
        config: {
            url: '/master',
            templateUrl: 'app/master/master.html',
            controller: 'masterController',
            controllerAs: 'vm',
            title: 'Skills',
            requireADLogin: false
        }
    },
    {
            state: 'masters',
            config: {
              //  url: '/master/:capId/:roleId/:name/:capname',
                url: '/master/:page',
                templateUrl: 'app/master/master.html',
                controller: 'masterController',
                controllerAs: 'vm',
                title: 'Skills',
                requireADLogin: false
        }
    }
        ];
    }
    function getStateshome() {
        return [
            {
                state: 'master2',
                config: {
                    url: '/myMultiSkillGroup',
                    templateUrl: 'app/multiSkillGroup/myMultiSkillGroup.html',
                    controller: 'myMultiSkillGroupController',
                    controllerAs: 'vm',
                    title: 'Home',

                    requireADLogin: false
                }
            }
        ];
    }
})();
