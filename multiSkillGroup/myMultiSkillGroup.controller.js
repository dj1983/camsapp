(function () {
    'use strict';

    angular
        .module('app.myMultiSkillGroup')
        .controller('myMultiSkillGroupController', myMultiSkillGroupController);

    myMultiSkillGroupController.$inject = ['$q', 'dataservice', 'logger', '$scope', 'app.constants', '$state', 'authservice', '$interval'];
    /* @ngInject */
    function myMultiSkillGroupController($q, dataservice, logger, $scope, constants, $state, authservice, $interval) {
        var vm = this;
        window.angularlink = $state;
        var uservalidation = User;
        vm.peoplekey = constants.global.peopleKey;
        if (uservalidation == "Yes") {
            vm.showword = false;
            vm.showc = true;
            vm.tabcontent = true;
            vm.isLoading = true;
            activate();
        }
        else {
            vm.showword = true;
            vm.showc = false;
            vm.tabcontent = false;
        }
        var i;
        vm.corePage = 1;
        vm.mandatoryPage = 1;
        vm.itemPerPage = 10;
        vm.showContent = false;
        vm.message = constants.message.noMultiskill;
        vm.ratingdesc = 'Proficiency discription goes here!'
        

        function activate() {
            var promises = [getPeopleMSData(vm.peoplekey)];

            return $q.all(promises).then(function () {
                vm.coreTotalPage = Math.max(Math.ceil(vm.coreSkillCount / vm.itemPerPage) || 0,1);
                vm.mandatoryTotalPage = Math.max(Math.ceil(vm.mandatorySkillCount / vm.itemPerPage) || 0, 1);
            }, function (error) {
                $state.go('error');
            });           
        }
        
        //Get Multi Skill Group/Core/Mandatory/Proficiency Information
        function getPeopleMSData(peoplekey) {
            return dataservice.getPeopleMSData(peoplekey).then(function (data) {
                //vm.data = data;
                //vm.masterID = data.SGCapMsID;
                //vm.skillHierarchy = data.ActSkhier;
                //vm.itemPerPage = data.PageSize;
                //vm.showProficiency = data.ProfSwitch;
                //vm.core = data.SGCapSkill[0];
                //vm.mandatory = data.SGCapSkill[1];
                //vm.currentCore = vm.core.Skillhier;
                //vm.currentMandatory = vm.mandatory.Skillhier;
                //vm.coreSkillCount = vm.core.SkillCount;
                //vm.mandatorySkillCount = vm.mandatory.SkillCount;
                //vm.title = vm.skillHierarchy.CapName + ' - ' +  vm.data.SGroupName;
                //vm.showContent = true;
                //vm.isLoading = false;
                vm.data = data;
                vm.masterID = data.SGCapMsID;
                vm.skillHierarchy = data.ActSkhier;
                vm.itemPerPage = data.PageSize;
                vm.showProficiency = data.ProfSwitch;
                if (data.SGCapSkillTotalCount != 0) {
                    vm.core = data.SGCapSkill[0];
                    vm.mandatory = data.SGCapSkill[1];
                    vm.currentCore = vm.core.Skillhier;
                    vm.currentMandatory = vm.mandatory.Skillhier;
                    vm.coreSkillCount = vm.core.SkillCount;
                    vm.mandatorySkillCount = vm.mandatory.SkillCount;
                }
                else {
                    vm.core = null;
                    vm.mandatory = null;
                    vm.currentCore = null;
                    vm.currentMandatory = null;
                    vm.coreSkillCount = 0;
                    vm.mandatorySkillCount = 0;
                }
                vm.title = vm.skillHierarchy.CapName + ' - ' + vm.data.SGroupName;
                vm.showContent = true;
                vm.isLoading = false;
              
            }, function (error) {
                $state.go('error');
            });
        }
        vm.firstlogin = false;
        //Get Multi Skill TotalScore /Skill Name/ SKill Score
        vm.getPeopleMSSkillData = function () {
            vm.firstlogin = true;
            vm.modalLoading = true;
            vm.errordata = false;
            return dataservice.getPeopleMSSkillData(vm.peoplekey).then(function (data) {
                vm.skilldata = data;
                vm.skillPage = 1;
                vm.skillXlist = data.employeeSkillList;
                vm.SkillTotalCount = data.SkillTotalCount;
                vm.skilltotalscore = data.SkillTotalScore;
                vm.skillTotalPage = Math.max(Math.ceil(data.SkillTotalCount / vm.itemPerPage) || 0, 1);
                 vm.modalLoading = false;
                // $('#ProficiencyModal').modal('show');
                 if (data.ErrorMessage == "You cannot view Proficiency & Technical Score as view  window is closed." && data.Error == true) {
                     // bootbox.alert(constants.message.errorproficiency);
                     vm.errormsg = constants.message.errorproficiency;
                     vm.modalLoading = false;
                     vm.errordata = true;
                 }
            }, function (error) {
                if (error.Message == "error: can't display") {
                   // bootbox.alert(constants.message.errorproficiency);
                    vm.errormsg = constants.message.errorproficiency;
                    vm.modalLoading = false;
                    vm.errordata = true;
                }
                else {
                    $state.go('error');
                }
            });
        }
        
        //Pagination monitor
        $scope.$watch('vm.corePage', function () {
            if (vm.masterID !== undefined) {
                vm.getCurrentCore(vm.masterID, 'C', vm.corePage);
            }          
        });

        $scope.$watch('vm.mandatoryPage', function () {
            if (vm.masterID !== undefined) {
                vm.getCurrentMandatory(vm.masterID, 'M', vm.mandatoryPage);
            }
        });
        vm.getfirstlogin = function () {
            vm.firstlogin = false;
           // $scope.$watch('vm.skillPage', function () {
                if (vm.skillPage !== undefined && vm.firstlogin != true) {
                    vm.getCurrentpeopleSkill(vm.peoplekey, vm.skillPage);
                }
            //});
        }
        //Techincal Score Pagination monitor
      
        
        vm.getCurrentCore = function (masterID,flag,page) {
            return dataservice.getCurrentSkill(vm.peoplekey,masterID, flag, page).then(function (data) {
                vm.currentCore = data[0].Skillhier;
            }), function () {
                $state.go('error');
            };   
        }
        vm.getCurrentMandatory = function (masterID, flag, page) {
            return dataservice.getCurrentSkill(vm.peoplekey, masterID, flag, page).then(function (data) {
                vm.currentMandatory = data[0].Skillhier;
            }), function () {
                $state.go('error');
            };
        }
        //Techincal Score Pagination Data builing
        vm.getCurrentpeopleSkill = function (peoplekey, page) {
            return dataservice.getCurrentpeopleSkillpage(peoplekey, page).then(function (data) {
                vm.skillXlist = data.employeeSkillList;
            }), function () {
                $state.go('error');
            };
        }
        //refresh jwt every 25 minutes
        $interval(RefreshJwt, constants.global.tokenInterval);

        function RefreshJwt() {
            console.log('starting get jwt');
            if (ENABLE_ESO.toUpperCase() == "YES") {
                authservice.getJwtToken().then(
                        function (data) {
                            jwt = data.access_token;
                            console.log("getJWTToken: " + new Date() + jwt);
                        },
                        function (error) {
                            console.log("getJWTToken: " + new Date() + "ESO token expired.");
                        }
                    );
            }

            //$timeout(function () {
            //    RefreshJwt();
            //    console.log('update with timeout fired - done getting jwt')
            //}, 5000);
        }
    }
})();

