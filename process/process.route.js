(function () {
    'use strict';

    angular
        .module('app.process')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        var adminvalidition = "No";
        angular.forEach(Links, function (data) {
           
            if (data.LinkName == "Process") {
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
                    state: 'process',
                    config: {
                        url: '/process',
                    templateUrl: 'app/process/process.html',
                    controller: 'processController',
                    controllerAs: 'vm',
                    title: 'Process',
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
                state: 'myMultiSkillGroup2',
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
