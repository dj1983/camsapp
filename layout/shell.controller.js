/* jshint -W117 */
(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject =
        ['$rootScope', '$timeout', 'config', 'logger', '$state', 'routerHelper', '$location'];
    /* @ngInject */
    function ShellController($rootScope, $timeout, config, logger, $state, routerHelper, $location) {
        var vm = this;
        vm.busyMessage = $rootScope.constants.message.busyMessage;
        vm.firstName = $rootScope.constants.global.firstName;
        vm.lastName = $rootScope.constants.global.lastName;
        vm.enterpriseID = $rootScope.constants.global.enterpriseId;
        vm.peoplekey = $rootScope.constants.global.peopleKey;
        vm.isBusy = true;
        vm.notificationsCount = 1;
        $rootScope.showSplash = true;
        var states = routerHelper.getStates();
        vm.isCurrent = isCurrent;
        vm.leftMenu = leftMenu;
        activate();
        var adminvalidition = "Yes";
        var uservalidation = User;
        // var Links = JSON.parse('[{"LinkID":1,"LinkName":"Home"},{"LinkID":2,"LinkName":"Admin"},{"LinkID":3,"LinkName":"Process"},{"LinkID":4,"LinkName":"Config"},{"LinkID":6,"LinkName":"ViewDetailsForAdmin"}]');
        // var RoteList = [Home, Admin, Process, Config, ViewDetailsForAdmin];
        var links = Links;
        vm.Admin = false; vm.Process = false; vm.Config = false; vm.Master = false;
        angular.forEach(links, function (data) {
            if (data.LinkName == "Admin") {
                vm.Admin = true;
                //vm.RoleSpecialization = true;
            }
            if (data.LinkName == "Process") {
                vm.Process = true;
            }
            if (data.LinkName == "Config") {
                vm.Config = true;
            } 
            if (data.LinkName == "ViewDetails") {
                vm.Master = true;
            }
            if (data.LinkName == "ViewDetailsForAdmin") {
                vm.Master = true;
            }
            if (data.LinkName == "RoleSpecialization") {
                vm.RoleSpecialization = true;
            }
        });
        //if (adminvalidition == "Yes") {
        //    vm.Admin = true;
        //    //if (uservalidation == 'No') {
        //    //    $state.go('process');
        //    //}
        //} else {
        //    vm.Admin = false;
        //}

        function leftMenu(e) {
            $rootScope.$emit('menuToggle', e);
        }

        function activate() {
            //jQuery(document).ready(function () {
            //    jQuery('#showRight').sidr();
            //});
            //jQuery('#showRight').sidr();//To activate JQuery Sidr plugin
            //getNavRoutes();
            //logger.success(config.appTitle + ' loaded!', null);
            //hideSplash();
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function () {
                $rootScope.showSplash = false;
            }, 1000);
        }

        function getNavRoutes() {
            vm.navRoutes = states.filter(function (r) {
                return r.settings && r.settings.nav;
            }).sort(function (r1, r2) {
                return r1.settings.nav - r2.settings.nav;
            });
        }

        function isCurrent(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return '';
            }
            var menuName = route.title;
            return $state.current.title.substr(0, menuName.length) === menuName ? 'active' : '';
        }

        vm.goto = function (statename) {
            $state.go(statename);
        }

        vm.isActive = function (path) {
       
            if (path !=null && $location.path().contains('master') && path == '/master') {
                return true;
            }
            else {
                return path === $location.path();
            };

        }
        vm.getErrorState = function () {
            if ($location.path() === '/error') {
                if (Admin == 'Yes' || User == 'Yes') {
                    return true;
            }
                return false;
            } else {
                return true;
            }
        }
    }
})();
