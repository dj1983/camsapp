(function () {
    'use strict';
    angular
        .module('app.talenthub')
        .controller('talenthubController', talenthubController);
    talenthubController.$inject = ['$location', '$q', 'dataservice', 'logger', '$scope', 'app.constants', '$state', 'authservice', '$interval'];
    /* @ngInject */
    function talenthubController($location, $q, dataservice, logger, $scope, constants, $state, authservice, $interval) {
        var vm = this;
        vm.isLoading = true;
        var uservalidation = "RCLC"; //roll capability lead capabilty
        vm.peoplekey = constants.global.peopleKey;
        vm.itemPerPage = 20;
        vm.ScroePage = 10;

    }
})();

