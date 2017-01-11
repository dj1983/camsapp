(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        var otherwise = '/404';
        if (ENTERPRISE_ID != '') {
            otherwise = '/';
        }
        routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates() {
        return [
             {
                 state: '401',
                 config: {
                     url: '/401',
                     templateUrl: 'app/core/401.html',
                     title: '401'
                 }
             },
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: 'app/core/404.html',
                    title: '404'
                }
            },
            {
                state: 'error',
                config: {
                    url: '/error',
                    templateUrl: 'app/core/error.html',
                    title: 'error'
                }
            }
            ,
            {
                state: 'multiskillgroupmaster',
                config: {
                    url: '/multi_skill_group_master',
                    templateUrl: 'app/core/multi_skill_group_master.html',
                    title: 'multiskillgroupmaster'
                }
            }
            ,
            {
                state: 'employeeassignment',
                config: {
                    url: '/employee_assignment',
                    templateUrl: 'app/core/employee_assignment.html',
                    title: 'employeeassignment'
                }
            }
            ,
            {
                state: 'technicalscore',
                config: {
                    url: '/technical_score',
                    templateUrl: 'app/core/technical_score.html',
                    title: 'technicalscore'
                }
            }
            //{
            //    state: 'browsernotsupported',
            //    config: {
            //        url: '/browser_not_supported',
            //        templateUrl: 'app/core/browser_not_supported.html',
            //        title: 'browsernotsupported'
            //    }
            //}
        ];
    }
})();
