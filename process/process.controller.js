(function () {
    'use strict';

    angular
        .module('app.process')
        .controller('processController', processController);

    processController.$inject = ['$q', 'dataservice', 'logger', '$scope', '$interval', 'app.constants','$state'];
    /* @ngInject */
    function processController($q, dataservice, logger, $scope, $interval, constants, $state) {
        var vm = this;
        vm.peoplekey = constants.global.peopleKey;
        vm.isLoading = true;
        vm.timer = null;
        vm.isAdmin = true;
        //if (Admin == 'Yes') {
        //    vm.isAdmin = true;
        //} else {
        //    vm.isAdmin = false;
        //}
        activate();

        //Get current processing status and view proficiency configuration key while loading process page
        function activate() {
            vm.errordata = false;
            var promises =[getProcessStatus(), getKey()];
            return $q.all(promises).then(function () {
                vm.showContent = true;               
            }, function (error) {
                if (error.Message == "error:Haven't permission") {
                    vm.errormsg = constants.message.noPermission;
                    vm.errordata = true;
                }
                else if (error.Message == "Authorization has been denied for this request.") {
                    vm.errormsg = constants.message.noPermission;
                    vm.errordata = true;
                }
                else {
                    $state.go('error');
                }
                vm.isLoading = false;
        });
    }

        //Get current processing status to initialize elements on the page
        function getProcessStatus() {
            vm.errordata = false;
            return dataservice.getProcessStatus().then(function (data) {
                vm.progressvalue = data.Percent;
                vm.allcount = data.AllCount;
                vm.currentcount = data.Current;
                vm.processedBy = data.PeopleKey;
                vm.isProcessing = data.IsProcessing;
                vm.status = data.Status;
                //Determine button enabled or not. 
                if (vm.processedBy != vm.peoplekey) {
                    vm.buttonEnabled = true
                    vm.isLoading = false;
                } else {
                    if (vm.isProcessing == true) {
                        vm.buttonEnabled = false;
                        
                    } else {
                        vm.buttonEnabled = true;
                        vm.isLoading = false;
                }
            }
                //Start timer for current processing user when refreshing page
                if (vm.isProcessing == true && vm.processedBy == vm.peoplekey) {
                    if (angular.isDefined(vm.timer)) {
                        $interval.cancel(vm.timer);
                    }
                    vm.startTimer();
            }
                //Verify whether there's computation in progress and processed by current user to define an owner or not
                if (vm.processedBy != vm.peoplekey && vm.processedBy != 0 && vm.isProcessing == true) {
                    vm.owner = false;
                } else {
                    vm.owner = true;
            }
            }, function (error) {
                if (error.Message == "error:Haven't permission") {
                    vm.errormsg = constants.message.noPermission;
                    vm.errordata = true;
                }
                else if (error.Message == "Authorization has been denied for this request.") {
                    vm.errormsg = constants.message.noPermission;
                    vm.errordata = true;
                }
                else {
                    $state.go('error');
                }
                vm.isLoading = false;
        });
    }

        //After click Process button, get current process status(handle concurrency). Owner admin calls service to start process. Other admins get alert. 
        vm.startProcess = function () {
            getCurrentStatus();
    };

        //Timer start function.
        vm.startTimer = function () {

            //Initialize the Timer to run every 3000 milliseconds i.e. three seconds.
           vm.timer = $interval(function () {
                   return dataservice.getProcessStatus().then(function (data) {
                       vm.progressvalue = data.Percent;
                       vm.allcount = data.AllCount;
                       vm.currentcount = data.Current;
                       vm.processedBy = data.processedBy;
                       vm.isProcessing = data.IsProcessing;
                       vm.status = data.Status;
                       vm.buttonEnabled = false;
                       vm.isLoading = false;
                       if (vm.status == 'Inprocessing') {
                           vm.message = 'Processing...';              
                       }
                       else if (vm.status == 'Failed') {
                           vm.message = 'Processing failed.';                         
                           if (angular.isDefined(vm.timer)) {
                               $interval.cancel(vm.timer);
                           }
                           vm.buttonEnabled = true;                           
                       }
                       else if (vm.status == 'Succeeded') {
                           vm.message = 'Process completed.';
                           if (angular.isDefined(vm.timer)) {
                               $interval.cancel(vm.timer);
                           }
                           vm.buttonEnabled = true;
                   }
                   }, function (error) {
                       if (angular.isDefined(vm.timer)) {
                           $interval.cancel(vm.timer);
                       }
                       $state.go('error');
                       vm.isLoading = false;
                   })
           }, 3000);
    };

        //Call service to get view proficiency configuration key
        //    function getKey() {
        //        return dataservice.getKey().then(function (data) {
        //            vm.proficiencyDisplay = data.value;
        //    })
        //}

        //Call service to update view proficiency configuration key
        //vm.updateKey = function () {
        //    vm.isLoading = true;
        //    return dataservice.updateKey(vm.peoplekey, vm.isAdmin, vm.proficiencyDisplay).then(function (data) {
        //        bootbox.alert("View proficiency key has been set successfully.");                
        //        vm.isLoading = false;
        //    }), function () {
        //        $state.go('error');
        //};
        //}

        //Call service to get view proficiency configuration key
        function getKey() {
            var mydata = { ConfigKeys: ['Display_Proscore', 'Display_Prof'] };
            return dataservice.getKey(mydata).then(function (data) {
                angular.forEach(data, function (value, key) {
                    if (data[key].ConfigKey == "Display_Prof") {
                        vm.proficiencyDisplay = (data[key].ConfigValue == 'Y') ? true : false;
                    }
                    else if (data[key].ConfigKey == "Display_ProScore") {
                        vm.scoreDisplay = (data[key].ConfigValue == 'Y') ? true : false;
                    }
                });
            })
        }

        //Call service to update view proficiency configuration key
        vm.updateKey = function (proficiencyDisplay) {
            vm.isLoading = true;
            vm.configkey = "Display_Prof";
            var value = (proficiencyDisplay == true) ? 'Y' : 'N';
            return dataservice.updateKey(vm.peoplekey, vm.isAdmin, vm.configkey, value).then(function (data) {
                bootbox.alert("View proficiency key has been set successfully.");
                vm.isLoading = false;
            }), function () {
                $state.go('error');
            };
        }
        //Call service to update view Technical Score configuration key
        vm.updateScore = function (ScoreDisplay) {
            vm.isLoading = true;
            vm.configkey = "Display_Proscore";
            var value = (ScoreDisplay == true) ? 'Y' : 'N';
            return dataservice.updateKey(vm.peoplekey, vm.isAdmin, vm.configkey, value).then(function (data) {
                bootbox.alert("View Technical Score key has been set successfully.");
                vm.isLoading = false;
            }), function () {
                $state.go('error');
            };
        }

        function getCurrentStatus() {
            
            dataservice.getProcessStatus().then(function (data) {
                vm.message = 'Processing...';
                vm.progressvalue = 0;
                vm.currentcount = 0;
                vm.processedBy = data.PeopleKey;
                vm.isProcessing = data.IsProcessing;
                vm.status = data.Status;
                //Determine button enabled or not. 
                if (vm.processedBy != vm.peoplekey) {
                    vm.buttonEnabled = true
                } else {
                    if (vm.isProcessing == true) {
                        vm.buttonEnabled = false;
                    } else {
                        vm.buttonEnabled = true;
                    }
                }
                //Start timer for current processing user when refreshing page
                if (vm.isProcessing == true && vm.processedBy == vm.peoplekey) {
                    if (angular.isDefined(vm.timer)) {
                        $interval.cancel(vm.timer);
                    }
                    vm.startTimer();                
                }
                //Verify whether there's computation in progress and processed by current user to define an owner or not
                if (vm.processedBy != vm.peoplekey && vm.processedBy != 0 && vm.isProcessing == true) {
                    vm.owner = false;
                } else {
                    vm.owner = true;
                }
                if (vm.owner == true) {
                    vm.buttonEnabled = false;
                    vm.isLoading = true;
                    return dataservice.startProcess(vm.peoplekey, vm.isAdmin).then(function (data) {
                        if (angular.isDefined(vm.timer)) {
                            $interval.cancel(vm.timer);
                        } 
                        vm.startTimer();
                    }), function () {
                    };
                } else {
                    bootbox.alert("Another process is in progress.");
                }
            }, function (error) {
                $state.go('error');
            });
        }

    }
})();

