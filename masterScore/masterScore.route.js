(function () {
    'use strict';

    angular
        .module('app.masterScore')
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
        state: 'masterScore',
        config: {
            url: '/masterScore',
            templateUrl: 'app/masterScore/masterScore.html',
            controller: 'masterScoreController',
            controllerAs: 'vm',
            title: 'Score & Proficiency',
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
                state: 'masterScore2',
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
