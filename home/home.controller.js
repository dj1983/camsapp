(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['logger', '$scope','$state'];
    /* @ngInject */
    function HomeController(logger, $scope, $state) {
        var vm = this;
        vm.title = 'Home';
        vm.message =
            'Template for developing Single Page Application with Angular JS and MVC.' +
                'The project structure and styling is based on HotTowel-Angular Template';
        vm.user = ' REBAR';
        activate();

        function activate() {
            logger.info('Activated Home View');
            $scope.$on('adal:loginFailure', HandleLoginFailure);
        }

        function HandleLoginFailure(error)
        {
            logger.info('Login failure: ' + error);
        }

        vm.goMultiSkilGroup =function() {
            $state.go('myMultiSkillGroup');
        }

    }
})();
