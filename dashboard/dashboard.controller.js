(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function DashboardController($q, dataservice, logger) {
        var vm = this;
        vm.notification = {
            title: 'MSA',
            description: 'Notification Card'
        };
        vm.message = 'User List ';
        vm.messageCount = 0;
        vm.title = 'Dashboard';
        
        activate();

        function activate() {

            //vm.menuState = { show: false };
            //vm.toggleMenu = function () {
            //    vm.menuState.show = !vm.menuState.show;
            //};
            // death ray functions left as exercise to reader

                var promises = [getPeopleData()];

                return $q.all(promises).then(function() {
                    logger.info('Activated Dashboard View');
                }, function (error) {
                    logger.error('Failed to activate Dashboard View');
                });            
            }

            function getPeopleData() {
                return dataservice.getPeopleData().then(function (data) {
                    vm.people = data;
                    return vm.people;
                }, function (error) {
                    logger.error('Failed to get user data - ' + error );                
                });
            }

            vm.updateUser = function (updatedUser) {
                return dataservice.updatePeopleData(updatedUser).then(function () {
                    logger.success('User info is updated');
                }), function () {
                    logger.error('Failed to update user data');
                };
                vm.people = updatedUser;
            }

    }
})();
