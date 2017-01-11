(function () {
    'use strict';

    angular
        .module('app.proficiencyconfig')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {

        var adminvalidition = "No";
        angular.forEach(Links, function (data) {
            if (data.LinkName == "Config") {
                adminvalidition = "Yes";
            }
        });
        if (adminvalidition == "Yes")
        {
            routerHelper.configureStates(getStates());
        }
        else
        {
            routerHelper.configureStates(getStateshome());
        }
    }

    function getStates() {
        return [
            {
                state: 'proficiencyconfig',
                config: {
                    url: '/proficiencyconfig',
                    templateUrl: 'app/proficiencyconfig/proficiencyconfig.html',
                    controller: 'proficiencyconfigController',
                    controllerAs: 'vm',
                    title: 'Configuration',
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
    function getStateshome() {
        return [
            {
                state: 'myMultiSkillGroupforproficiency',
                config: {
                    url: '/myMultiSkillGroup',
                    templateUrl: 'app/multiSkillGroup/myMultiSkillGroup.html',
                    controller: 'myMultiSkillGroupController',
                    controllerAs: 'vm',
                    title: 'myMultiSkillGroup',
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
