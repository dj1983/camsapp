(function () {
    'use strict';

    angular
        .module('app.roleSpecialization')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {

        var adminvalidition = "No";
        angular.forEach(Links, function (data) {
            if (data.LinkName == "RoleSpecialization") {
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
                state: 'roleSpecialization',
                config: {
                    url: '/roleSpecialization',
                    templateUrl: 'app/roleSpecialization/roleSpecialization.html',
                    controller: 'roleSpecializationController',
                    controllerAs: 'vm',
                    title: 'Role Specialization',
                    requireADLogin: false
                }
            }
        ];
    }
    function getStateshome() {
        return [
            {
                state: 'myMultiSkillGroupforroleSpecialization',
                config: {
                    url: '/myMultiSkillGroup',
                    templateUrl: 'app/multiSkillGroup/myMultiSkillGroup.html',
                    controller: 'myMultiSkillGroupController',
                    controllerAs: 'vm',
                    title: 'myMultiSkillGroup',
                    //This property is to protect your route with OpenID Connect Authentication
                    requireADLogin: false
                }
            }
        ];
    }
})();
