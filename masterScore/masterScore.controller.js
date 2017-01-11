(function () {
    'use strict';
    angular
        .module('app.masterScore')
        .controller('masterScoreController', masterScoreController);
    masterScoreController.$inject = ['$q', 'dataservice', 'logger', '$scope', 'app.constants', '$state', 'authservice', '$interval'];
    /* @ngInject */
    function masterScoreController($q, dataservice, logger, $scope, constants, $state, authservice, $interval) {
        var vm = this;
        vm.isLoading = true;
        var uservalidation = "RCLC"; //roll capability lead capabilty
        vm.peoplekey = constants.global.peopleKey;
        vm.itemPerPage = 20;
        vm.ScroePage = 10;
        vm.selectedCap = null
        vm.selectedSG = null;
        vm.capabilityid = null;
        vm.roleid = null;
        vm.userid = null;
        getCapleaderViewSkills();
        vm.people = null;
        function getCapleaderViewSkills() {
            vm.isLoading = true;
            vm.modalLoading = true;
            vm.errordata = false;
            return dataservice.getCapleaderViewSkills(uservalidation).then(function (data) {
                if (data.length > 0) {
                    vm.selectedCap = data[0];
                    vm.selectedCapid = data[0].SkillID;
                }
                else
                {
                    vm.TotalCount = 0;
                    vm.modalLoading = false
                    vm.errormsg = constants.message.noMultiskill;
                    vm.errordata = true;
                    vm.isLoading = false;
                }
                vm.capability = data;
                vm.isLoading = false;
            }, function (error) {
                if (error.Message == "error:Haven't permission")
                {
                    vm.TotalCount = 0;
                    vm.modalLoading = false
                    vm.errormsg = constants.message.noPermission;
                    vm.errordata = true;
                }
                else if (error.Message == "Authorization has been denied for this request.") {
                    vm.TotalCount = 0;
                    vm.modalLoading = false
                    vm.errormsg = constants.message.noPermission;
                    vm.errordata = true;
                }
                else {
                    $state.go('error');
                }
                   
                vm.isLoading = false;
            }).then(function () {
                if (vm.selectedCapid != 0) {
                    vm.getMSGroup(vm.selectedCapid);
                }
            });
        }
        
        //Get Multi Skill TotalScore /Skill Name/ SKill Score
        vm.getPeopleMSSkillData = function (peoplekey, roleID) {
            vm.people = peoplekey;
            vm.modalLoading = true;
            vm.errordatas = false;
            return dataservice.GetSingleScoreProficiency(peoplekey, roleID).then(function (data) {
                if (data != null)
                {
                    vm.skilldata = data;
                    vm.skillPage = 1;
                    vm.skillXlist = data.IndividualSkillScoreList;
                    vm.SkillTotalCount = data.SkillTotalCount;
                    vm.skilltotalscore = data.TotalScore;
                    vm.skillTotalPage = Math.max(Math.ceil(data.SkillTotalCount / vm.ScroePage) || 0, 1);
                    vm.modalLoading = false;
                }
             
            }, function (error) {
                if (error.Message == "error:can't display") {
                    vm.errormsg = constants.message.errorproficiency;
                    vm.modalLoading = false;
                    vm.errordatas = true;
                }
                else {
                    $state.go('error');
                }
             
            });
        }

        //CHANGE CAPABILITY DROPDOWN 
        vm.getMSGroup = function (capabilityid) {
            vm.isLoading = true;
            if (angular.isDefined(capabilityid)) {
                vm.selectedSG = null;
                dataservice.GetMultiSkillRoleList(capabilityid).then(function (data) {
                    vm.msgroup = data;
                    vm.isLoading = false;
                }, function (error) {
                    //$state.go('error');
                    logger.error(constants.message.errorLoadingData);
                });
            }
        }
         
        vm.getSearchDate = function (capabilityid, roleid,userid)
        {
            vm.modalLoading = false;
            vm.isLoading = true;
            vm.pageIndex = 1;
            dataservice.postMultiSkillUserList(capabilityid, roleid, userid, vm.pageIndex).then(function (data) {
                if (data.TotalCapScoreProCount!=0) {
                    vm.data = data.CapScoreProficencyList;
                    vm.TotalCount = data.TotalCapScoreProCount;
                    if (vm.TotalCount != 0)
                    {
                        $('#Modal').modal('hide');
                    }
                   
                    vm.TotalPage = Math.max(Math.ceil(data.TotalCapScoreProCount / vm.itemPerPage) || 0, 1);
                    vm.Page = 1;
                    vm.capabilityid = capabilityid;
                    vm.roleid = roleid;
                    vm.userid = userid;
                }
                else
                {
                    $('#Modal').modal('show');
                    vm.TotalCount = data.TotalCapScoreProCount;
                    vm.msg = constants.message.noResultsFound;
                }
                vm.modalLoading = false;
                vm.isLoading = false;
            }, function (error) {
                //$state.go('error');
                logger.error(constants.message.errorLoadingData);
            
                vm.isLoading = false;
            });
        }
        //Pagination monitor (CORE)
        $scope.$watch('vm.Page', function () {
        //vm.getfirstlogin = function () {
            vm.isLoading = true;
            if (vm.capabilityid != null) {
                dataservice.postMultiSkillUserList(vm.capabilityid, vm.roleid, vm.userid, vm.Page).then(function (data) {
                    if (data != null) {
                        vm.data = data.CapScoreProficencyList;
                    }
                    vm.isLoading = false;
                }, function (error) {
                    logger.error(constants.message.errorLoadingData);
                });
            }
            //};
        });
        // AJAX CORE PAGE
        vm.getCurrentCore = function (capabilityid, roleid, userid, page) {
            return dataservice.postMultiSkillUserList(capabilityid, roleid, userid, page).then(function (data) {
                if (data.length > 0) {
                    vm.currentCore = data[0].Skillhier; 
                }
                }), function () {
                $state.go('error');
             };
        }

        vm.messagePCC = constants.message.noResultsFound;
        vm.searchResourcePCC = function (val) {
            var obj = {
                EnterpriseID: val
            };
            vm.namePassedPCC = false;
            vm.noResultsPCC = false;
            return dataservice.getResource(obj).then(function (data) {
                if (data.length != 0) {
                    return $.map(data, function (item) {
                        if (item.EnterpriseID == val) {
                            vm.namePassedPCC = true;
                        }
                        return item.EnterpriseID;
                    });

                }
                else {
                    vm.noResultsPCC = true;
                    vm.messagePCC = constants.message.noResultsFound;
                    vm.namePassedPCC = false;
                }
            }, function (error) {
                logger.error(constants.message.errorSavingData);
            });
        };

        vm.selectNamePCC = function () {
            vm.namePassedPCC = true;
            vm.noResultsPCC = false;
        };
        // CLEAN SKILL AND COUNT
        vm.clean=function()
        {
            getCapleaderViewSkills();
            vm.userID = null;
            vm.TotalCount = null;
        }
        vm.download = function () {
            vm.isLoading = true;
            return dataservice.postDownloadScore(vm.capabilityid, vm.roleid, vm.Page, vm.userid).then(function (data) {
                vm.url = BASE_URL.substring(0, BASE_URL.length - 5) +data;
                window.open(vm.url);
                vm.isLoading = false;
            }), function () {
                $state.go('error');
                vm.isLoading = false;
            };
            
        }
        vm.getCurrentpeopleSkill = function () {
            if (vm.people != null) {
                return dataservice.getCurrentpeopleSkillpage(vm.people, vm.skillPage).then(function (data) {
                    vm.skillXlist = data.employeeSkillList;
                }), function () {
                    $state.go('error');
                };
            }
        };
    }
})();

