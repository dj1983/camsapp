(function () {
    'use strict';
    angular
        .module('app.master')
        .controller('masterController', masterController);
    masterController.$inject = ['$q', 'dataservice',  'logger', '$location', '$scope', 'app.constants', '$state', '$stateParams', 'authservice', '$interval'];
    /* @ngInject */
    function masterController($q, dataservice, logger, $location, $scope, constants, $state, $stateParams, authservice, $interval) {
        var vm = this;
        vm.isLoading = true;
        vm.peoplekey = constants.global.peopleKey;
        vm.coreSkillCount = 0;
        vm.mandatorySkillCount = 0;
        vm.electiveSkillCount = 0;
        vm.corePage = 1;
        vm.mandatoryPage = 1;
        vm.electivePage = 1;
        vm.mandatoryTotalPage = 1;
        vm.electiveTotalPage = 1;
        vm.itemPerPage = 10;
        vm.selectedCap = null;
        vm.selectedRS = null;
        vm.titlemandatory = null;
        vm.titleelective = null;
        vm.titleCore = null;
        vm.selectedCapid = 0;                
        vm.tooltipInfo = null;
        var initializationrid = null;
        var count = 0;
        var initializationrtype = 'C';
        var uservalidation = "RCLC"; //roll capability
        var page = $stateParams.page; // roleSpecialization herf page used

        if (page == "roleSpecialization") {
            getCapleaderViewSkill();
        }
        else
        {
            getCapleaderViewSkills();
        }
        function getCapleaderViewSkill() {
            vm.isLoading = true;
            vm.modalLoading = true;
            vm.errordata = false;
            return dataservice.getCapleaderViewSkills(uservalidation).then(function (data) {
                if (data.length > 0 && count==0) {
                    vm.selectedCap = data[0];
                    vm.selectedCapid = data[0].SkillID;
                    for (var i = 0 ; i < data.length; i++) {
                        if (data[i].SkillName == window.localStorage.getItem('capName')) {
                            if (i == 0) {
                                vm.capability = data;
                                return;
                            } else {
                                vm.selectedCap = data[i];
                                vm.selectedCapid = data[i].SkillID;
                            }
                        }
                    }
                    count++;
                }
                else {
                    vm.modalLoading = false
                    vm.errormsg = constants.message.noMultiskill;
                    vm.errordata = true;
                    vm.isLoading = false;
                    count++;
                }
                vm.capability = data;
                vm.isLoading = false;
                count++;
            }, function (error) {
                if (error.Message == "error:Haven't permission") {
                    vm.modalLoading = false
                    vm.errormsg = constants.message.noPermission;
                    vm.errordata = true;
                }
                else if (error.Message == "Authorization has been denied for this request.") {
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
                    vm.getMSGroup(window.localStorage.getItem('capID'), true);
                }
            }).then(function () {
                if (vm.selectedCapid != 0) {
                    vm.viewMEskill(window.localStorage.getItem('capID'), window.localStorage.getItem('roleID'));
                }
            });
        }

        //Nitialization loading
        function getCapleaderViewSkills() {
            vm.isLoading = true;
            vm.modalLoading = true;
            vm.errordata = false;
            return dataservice.getCapleaderViewSkills(uservalidation).then(function (data) {
                if (data.length > 0) {
                    vm.selectedCap = data[0];
                    vm.selectedCapid = data[0].SkillID;
                }
                else {
                    vm.modalLoading = false
                    vm.errormsg = constants.message.noMultiskill;
                    vm.errordata = true;
                    vm.isLoading = false;
                }
                vm.capability = data;
                vm.isLoading = false;
            }, function (error) {
                if (error.Message == "error:Haven't permission") {
                    vm.modalLoading = false
                    vm.errormsg = constants.message.noPermission;
                    vm.errordata = true;
                }
                else if (error.Message == "Authorization has been denied for this request.") {
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
                    vm.getMSGroup(vm.selectedCapid,false);
                }
            });
        }
        //CHANGE CAPABILITY DROPDOWN
        vm.getMSGroup = function (capabilityid,BooleanRoll) {
            vm.isLoading = true;
            if (angular.isDefined(capabilityid)) {
                clean();
                vm.currentCap = capabilityid;
                dataservice.GetMultiSkillRoleList(capabilityid).then(function (data) {
                    vm.msgroup = data;
                    if (BooleanRoll) {
                        vm.selectedRS = data[0];
                        for (var i = 0 ; i < data.length; i++) {
                            if (data[i].MultiSkillGroupName == window.localStorage.getItem('roleName')) {
                                vm.selectedRS = data[i];
                                return;
                            }
                        }
                    }
                }, function (error) {
                    logger.error(constants.message.errorLoadingData);
                });
                vm.corePage = 1;
                dataservice.postQuerySkillList(capabilityid, initializationrid, initializationrtype, vm.corePage).then(function (data) {
                    vm.data = data[0];
                    vm.core = vm.data.SkillType;
                    vm.titleCore = vm.data.Skillhier;
                    vm.currentCore = vm.data.Skillhier;
                    vm.coreSkillCount = vm.data.SkillCount;
                    pagecount();
                    vm.isLoading = false;
                }, function (error) {
                    $state.go('error');
                    vm.isLoading = false;
                });

            } else if (capabilityid == null) {
                vm.coreSkillCount = 0;
                vm.currentCore = null;
                vm.coreTotalPage = 1;
                vm.titleCore = null;
                clean();
                vm.isLoading = false;
            }
        }
        //CHANGE ROLE DROPDOWN
        vm.viewMEskill = function (capabilityid, roleid) {
            vm.isLoading = true;
            if (angular.isDefined(roleid)) {
                dataservice.postQueryALLSkillList(capabilityid, roleid, 'All', 1).then(function (data) {
                    vm.mandatorydata = data[1];
                    vm.electivedata = data[2];
                    vm.mandatory = vm.mandatorydata.SkillType;
                    vm.elective = vm.electivedata.SkillType;
                    vm.currentmandatory = vm.mandatorydata.Skillhier;
                    vm.titlemandatory = vm.mandatorydata.Skillhier;
                    vm.currentelective = vm.electivedata.Skillhier;
                    vm.titleelective = vm.electivedata.Skillhier;
                    vm.mandatorySkillCount = vm.mandatorydata.SkillCount;
                    vm.electiveSkillCount = vm.electivedata.SkillCount;
                    vm.data = data[0];
                    vm.core = vm.data.SkillType;
                    vm.titleCore = vm.data.Skillhier;
                    vm.currentCore = vm.data.Skillhier;
                    vm.coreSkillCount = vm.data.SkillCount;
                    pagecount();
                    vm.isLoading = false;
                }, function (error) {
                    logger.error(constants.message.errorLoadingData);
                    vm.isLoading = false;
                });
            }
            if (roleid == null) {
                clean();
                vm.isLoading = false;
            }
        }
        //Pagination monitor (CORE)
        $scope.$watch('vm.corePage', function () {
            if (vm.selectedCap !== null) {
                vm.getCurrentCore(vm.selectedCap.SkillID, 0, 'C', vm.corePage);
            }
        });
        //Pagination monitor (MANDATORY)
        $scope.$watch('vm.mandatoryPage', function () {
            if (vm.selectedCap !== null && vm.selectedRS !== null) {
                vm.getCurrentmandatory(vm.selectedCap.SkillID, vm.selectedRS.MSGroupMasterID, 'ALL', vm.mandatoryPage);
            }

        });
        //Pagination monitor (ELECTIVE)
        $scope.$watch('vm.electivePage', function () {
            if (vm.selectedCap !== null && vm.selectedRS !== null) {
                vm.getCurrentelective(vm.selectedCap.SkillID, vm.selectedRS.MSGroupMasterID, 'ALL', vm.electivePage);
            }

        });
        // AJAX CORE PAGE
        vm.getCurrentCore = function (capabilityid, roleid, type, page) {
            return dataservice.postQuerySkillList(capabilityid, roleid, type, page).then(function (data) {
                if (data.length != 0) {
                    vm.currentCore = data[0].Skillhier;
                }
                else {
                    vm.currentelective = null;
                }
            }), function () {
                $state.go('error');
            };
        }
        // AJAX MANDATORY PAGE
        vm.getCurrentmandatory = function (capabilityid, roleid, type, page) {
            return dataservice.postQueryALLSkillList(capabilityid, roleid, type, page).then(function (data) {
                if (data.length != 0) {
                    vm.currentmandatory = data[1].Skillhier;
                }
                else {
                    vm.currentelective = null;
                }
            }), function () {
                $state.go('error');
            };
        }
        // AJAX ELECTIVE PAGE
        vm.getCurrentelective = function (capabilityid, roleid, type, page) {
            return dataservice.postQueryALLSkillList(capabilityid, roleid, type, page).then(function (data) {
                if (data.length != 0) {
                    vm.currentelective = data[2].Skillhier;
                }
                else {
                    vm.currentelective = null;
                }
            }), function () {
                $state.go('error');
            };
        }
        // CLEAN SKILL AND COUNT
        function clean() {
            vm.selectedRS = null;
            vm.titlemandatory = null;
            vm.titleelective = null;
            vm.mandatoryTotalPage = 1;
            vm.electiveTotalPage = 1;
            vm.currentmandatory = null;
            vm.currentelective = null;
            vm.electiveSkillCount = 0;
            vm.mandatorySkillCount = 0;
        }
        // CALCULATE TOTALPAGE
        function pagecount() {
            vm.coreTotalPage = Math.max(Math.ceil(vm.coreSkillCount / vm.itemPerPage) || 0, 1);
            vm.mandatoryTotalPage = Math.max(Math.ceil(vm.mandatorySkillCount / vm.itemPerPage) || 0, 1);
            vm.electiveTotalPage = Math.max(Math.ceil(vm.electiveSkillCount / vm.itemPerPage) || 0, 1);
        }

        //Edit Skills
        vm.editSkillType = function (obj) {
            vm.modalSkillType = obj;
            vm.capabilityInput = null;
            vm.capabilityDropdown = [];
            vm.modalSelectedCap = null;
            vm.specialityInput = null;
            vm.specialityDropdown = [];
            vm.modalSelectedSpe = null;
            vm.skillInput = null;
            vm.skillDropdown = [];
            vm.modalSelectedSkill = null;
            vm.selectedTier = null;
            vm.getTierDropdown();
            vm.allSkills = [];
            getSkillByType(obj);
            controlInputGroupBtn("close", 1);
            controlInputGroupBtn("close", 2);
            controlInputGroupBtn("close", 3);
        }

        vm.getTierDropdown = function () {
            return dataservice.GetTierList().then(function (data) {
                vm.tierDropdown = data;
            }), function () {
                logger.error(constants.message.errorLoadingData);
            };
        }

        function getSkillByType(obj) {            
            var roleId;
            if (vm.selectedRS != null) {
                roleId = vm.selectedRS.MSGroupMasterID;
            } else {
                roleId = 0;
            }
            var capleadParameters = {
                CapabilityID: vm.selectedCap.SkillID,
                MSGroupID: roleId,
                SkillType: obj.substring(0, 1)
            }
            return dataservice.getSkillByType(capleadParameters).then(function (data) {                
                vm.allSkills = data;
            }), function () {
                logger.error(constants.message.errorLoadingData);
            };
        }

        vm.getCapabilityDropdown = function () {
            vm.capabilityDropdown = [];
            return dataservice.GetAllCapabilityList().then(function (data) {
                vm.capabilityDropdown = data;
            }), function () {
                logger.error(constants.message.errorLoadingData);
            };
        }        

        vm.searchCapability = function (obj) {
            vm.capabilityDropdown = [];
            vm.modalSelectedCap = null;
            vm.specialityInput = null;
            vm.specialityDropdown = [];
            vm.modalSelectedSpe = null;            
            vm.skillInput = null;
            vm.skillDropdown = [];
            vm.modalSelectedSkill = null;
            if (vm.capabilityInput != undefined && vm.capabilityInput != null && vm.capabilityInput != '') {
                return dataservice.GetCapListByFilter(obj).then(function (data) {
                    vm.capabilityDropdown = data;
                    ifNoResult(1);
                    controlInputGroupBtn("open", 1);
                }), function () {
                    logger.error(constants.message.errorLoadingData);
                };
            } else { controlInputGroupBtn("close", 1); }
        }

        vm.selectCapDropdown = function (obj) {
            if (obj.CapabilityId != 0) {
                vm.modalSelectedCap = obj;
                vm.capabilityInput = obj.CapabilityName;
                vm.specialityInput = null;
                vm.specialityDropdown = [];
                vm.modalSelectedSpe = null;
                vm.skillInput = null;
                vm.skillDropdown = [];
                vm.modalSelectedSkill = null;
            }            
        }

        vm.getSpecialityDropdown = function (obj) {
            vm.specialityDropdown = [];
            if (angular.isDefined(vm.modalSelectedCap) && vm.modalSelectedCap != null) {
                dataservice.GetSpecialtyList(obj.CapabilityId).then(function (data) {
                    vm.specialityDropdown = data;
                    ifNoResult(2);
                }), function () {
                    logger.error(constants.message.errorLoadingData);
                };
            } else {
                vm.specialityDropdown = [];
                vm.specialityDropdown[0] = ({ "SpecialtyId": 0, "SpecialtyName": "Please select a Capability" });
            }
        }

        vm.searchSpeciality = function (obj) {
            vm.specialityDropdown = [];
            vm.modalSelectedSpe = null;
            vm.skillInput = null;
            vm.skillDropdown = [];
            vm.modalSelectedSkill = null;
            if (angular.isDefined(vm.specialityInput) && vm.specialityInput != null && vm.specialityInput != '') {
                controlInputGroupBtn("open", 2);
                if (vm.modalSelectedCap == undefined || vm.modalSelectedCap == null) {
                    vm.capabilityInput = null;
                    return dataservice.GetSpeListByFilter(obj).then(function (data) {
                        vm.specialityDropdown = data;
                        ifNoResult(2);
                        controlInputGroupBtn("open", 2);
                    }), function () {
                        logger.error(constants.message.errorLoadingData);
                    };
                } else {
                    dataservice.GetSpecialtyList(vm.modalSelectedCap.CapabilityId).then(function (data) {
                        var tempArray = data;
                        for (var i = 0; i < tempArray.length; i++) {
                            if (obj.toLowerCase() == tempArray[i].SpecialtyName.substring(0, obj.length).toLowerCase()) {
                                vm.specialityDropdown.push(tempArray[i]);
                            }
                        }
                        ifNoResult(2);
                        controlInputGroupBtn("open", 2);
                    }), function () {
                        logger.error(constants.message.errorLoadingData);
                    };
                }                
            } else {
                vm.specialityDropdown = [];
                controlInputGroupBtn("close", 2);
            }
        }

        vm.selectSpeDropdown = function (obj) {
            if (obj.SpecialtyId != 0) {
                if (vm.modalSelectedCap == undefined || vm.modalSelectedCap == null) {
                    dataservice.GetCapBySpeList(obj.SpecialtyId).then(function (data) {
                        if (data.length != 0) {
                            vm.modalSelectedCap = data[0];
                            vm.capabilityInput = data[0].CapabilityName;
                        } else {
                            logger.error(constants.message.errorLoadingData);
                        }
                    }), function () {
                        logger.error(constants.message.errorLoadingData);
                    };
                }
                vm.modalSelectedSpe = obj;
                vm.specialityInput = obj.SpecialtyName;
                vm.skillInput = null;
                vm.skillDropdown = [];
                vm.modalSelectedSkill = null;
            }
        }

        vm.getSkillDropdown = function (obj) {
            vm.skillDropdown = [];
            if (angular.isDefined(vm.modalSelectedSpe) && vm.modalSelectedSpe != null) {
                dataservice.GetSkillList(obj.SpecialtyId).then(function (data) {
                    vm.skillDropdown = data;
                    ifNoResult(3);
                }), function () {
                    logger.error(constants.message.errorLoadingData);
                };
            } else {
                vm.skillDropdown = [];
                vm.skillDropdown[0] = ({ "SkillId": 0, "SkillName": "Please select a Specialty" });
            }
        }

        vm.searchSkill = function (obj) {
            vm.modalSelectedSkill = null;
            vm.skillDropdown = [];
            if (angular.isDefined(vm.skillInput) && vm.skillInput != null && vm.skillInput != '') {
                controlInputGroupBtn("open", 3);
                if (vm.modalSelectedSpe == undefined || vm.modalSelectedSpe == null) {
                    vm.capabilityInput = null;
                    vm.capabilityDropdown = [];
                    vm.modalSelectedCap = null;
                    vm.specialityInput = null;
                    vm.specialityDropdown = [];
                    return dataservice.GetSkillListByFilter(obj).then(function (data) {
                        vm.skillDropdown = data;
                        ifNoResult(3);
                        controlInputGroupBtn("open", 3);
                    }), function () {
                        logger.error(constants.message.errorLoadingData);
                    };
                } else {
                    dataservice.GetSkillList(vm.modalSelectedSpe.SpecialtyId).then(function (data) {
                        var tempArray = data;
                        for (var i = 0; i < tempArray.length; i++) {
                            if (obj.toLowerCase() == tempArray[i].SkillName.substring(0, obj.length).toLowerCase()) {
                                vm.skillDropdown.push(tempArray[i]);
                            }
                        }
                        ifNoResult(3);
                        controlInputGroupBtn("open", 3);
                    }), function () {
                        logger.error(constants.message.errorLoadingData);
                    };
                }
            } else {
                vm.skillDropdown = [];
                controlInputGroupBtn("close", 3);
            }
        }

        vm.selectSkillDropdown = function (obj) {
            if (obj.SkillId != 0) {
                if (vm.modalSelectedSpe == undefined || vm.modalSelectedSpe == null) {
                    dataservice.GetSpeAndCapList(obj.SkillId).then(function (data) {
                        vm.modalSelectedCap = data[0];
                        vm.capabilityInput = data[0].CapabilityName;
                        vm.modalSelectedSpe = data[0];
                        vm.specialityInput = data[0].SpecialtyName;
                    }), function () {
                        logger.error(constants.message.errorLoadingData);
                    };
                }
                vm.modalSelectedSkill = obj;
                vm.skillInput = obj.SkillName;
            }
        }

        function ifNoResult(num) {
            switch (num) {
                case 1:
                    if (vm.capabilityDropdown.length == 0) {
                        vm.capabilityDropdown[0] = ({ "CapabilityId": 0, "CapabilityName": "No result" });
                    }
                    break;
                case 2:
                    if (vm.specialityDropdown.length == 0) {
                        vm.specialityDropdown[0] = ({ "SpecialtyId": 0, "SpecialtyName": "No result" });
                    }
                    break;
                case 3:
                    if (vm.skillDropdown.length == 0) {
                        vm.skillDropdown[0] = ({ "SkillId": 0, "SkillName": "No result" });
                    }
                    break;
            }
        }

        function controlInputGroupBtn(action,num) {
            if (action == "open") {
                switch (num) {
                    case 1:
                        $("#capInputGroupBtn").addClass("input-group-btn open")
                        break;
                    case 2:
                        $("#speInputGroupBtn").addClass("input-group-btn open")                     
                        break;
                    case 3:
                        $("#skillInputGroupBtn").addClass("input-group-btn open")                     
                        break;
                }
            } 
            if (action == "close") {
                switch (num) {
                    case 1:
                        $("#capInputGroupBtn").addClass("input-group-btn")                      
                        break;
                    case 2:
                        $("#speInputGroupBtn").addClass("input-group-btn")                     
                        break;
                    case 3:
                        $("#skillInputGroupBtn").addClass("input-group-btn")                     
                        break;
                }
            }
        }

        vm.getSkillStatus = function (obj) {            
            var roleId;
            if (vm.selectedRS != null) {
                roleId = vm.selectedRS.MSGroupMasterID;
            } else {
                roleId = 0;
            }
            var GetSkillStatusInput = {
                CapabilityId: Number(vm.selectedCap.SkillID),
                RoleSpeciallizationId: Number(roleId),
                SkillId: Number(obj.SkillId)
            }
            if (vm.modalSkillType == "Core") {
                getSkillStatusInCapability(GetSkillStatusInput);
            } else {
                getSkillStatusInRole(GetSkillStatusInput);
            }
        }

        function getSkillStatusInCapability(GetSkillStatusInput) {
            dataservice.GetSkillStatusInCapability(GetSkillStatusInput).then(function (data) {
                if (data.IsInCapability == true) {
                    logger.error(constants.message.coreSkillExist);
                } else if (data.UseInRoleSpeciallizations != null && data.UseInRoleSpeciallizations.length != 0) {
                    var UseInRoleSpeciallizations = "";
                    for (var i = 0; i < data.UseInRoleSpeciallizations.length; i++) {
                        UseInRoleSpeciallizations = UseInRoleSpeciallizations + data.UseInRoleSpeciallizations[i] + ", ";
                    }
                    bootbox.dialog({
                        message: "The skill is already added to Role Speciallization: " + UseInRoleSpeciallizations + "Do you want to make it a CORE skill?",
                        buttons: {
                            Cancel: {
                                label: "Cancel",
                                className: "btn-group",
                                callback: function () {
                                }
                            }
                            , OK: {
                                label: "OK",
                                className: "btn-group",
                                callback: function () {
                                    addCoreSkill(GetSkillStatusInput.SkillId,true);                                    
                                }
                            }
                        }
                    });
                } else {
                    addCoreSkill(GetSkillStatusInput.SkillId,false);
                }
            }), function () {
                logger.error(constants.message.errorSavingData);
            };
        }

        function getSkillStatusInRole(GetSkillStatusInput) {
            dataservice.GetSkillStatusInRole(GetSkillStatusInput).then(function (data) {
                if (data.IsInCapability == true) {
                    logger.error(constants.message.coreSkillExist);
                }
                if (data.IsInM == true) {
                    logger.error(constants.message.mandatorySkillExist);
                }
                if (data.IsInE == true) {
                    if (vm.modalSkillType == 'Mandatory') {
                        bootbox.dialog({
                            message: "The skill is already ELECTIVE skill for this role speciallization. Do you want to make it a MANDATORY skill?",
                            buttons: {
                                Cancel: {
                                    label: "Cancel",
                                    className: "btn-group",
                                    callback: function () {
                                    }
                                }
                                , OK: {
                                    label: "OK",
                                    className: "btn-group",
                                    callback: function () {
                                        addMESkill(GetSkillStatusInput.SkillId);
                                    }
                                }
                            }
                        });
                    }
                    if (vm.modalSkillType == 'Elective') {
                        logger.error(constants.message.electiveSkillExist);
                    }
                }
                if (data.IsInCapability == false && data.IsInM == false && data.IsInE == false) {
                    addMESkill(GetSkillStatusInput.SkillId);
                }
            }), function () {
                logger.error(constants.message.errorSavingData);
            };
        }

        function addCoreSkill(SkillId,isRefreshMECard) {
            var tier;
            if (vm.selectedTier == undefined || vm.selectedTier == null) {
                tier = ""
            } else {
                tier = vm.selectedTier.TierName;
            }
            var SkillInfo = {
                CapId: Number(vm.selectedCap.SkillID),
                SkillId: Number(SkillId),
                SkillType: vm.modalSkillType.substring(0, 1),                
                tier: String(tier)
            }
            dataservice.AddCoreSkill(SkillInfo).then(function () {
                getSkillByType(vm.modalSkillType);
                logger.success(constants.message.SavingDataOK);
                refreshCoreCard();
                if (isRefreshMECard == true) {
                    refreshMECard();
                }
            }, function (error) {
                logger.error(constants.message.errorSavingData);
            })
        }

        function refreshCoreCard() {
            dataservice.postQuerySkillList(vm.selectedCap.SkillID, initializationrid, initializationrtype, 1).then(function (data) {
                vm.data = data[0];
                vm.core = vm.data.SkillType;
                vm.titleCore = vm.data.Skillhier;
                vm.currentCore = vm.data.Skillhier;
                vm.coreSkillCount = vm.data.SkillCount;
                pagecount();
                vm.isLoading = false;
            }, function (error) {
                logger.error(constants.message.errorLoadingData);
                vm.isLoading = false;
            });
        }

        function addMESkill(SkillId) {
            var tier;
            if (vm.selectedTier == undefined || vm.selectedTier == null) {
                tier = ""
            } else {
                tier = vm.selectedTier.TierName;
            }
            var roleId;
            if (vm.selectedRS != null) {
                roleId = vm.selectedRS.MSGroupMasterID;
            } else {
                roleId = 0;
            }
            var SkillInfo = {
                CapId: Number(vm.selectedCap.SkillID),
                SkillId: Number(SkillId),
                SkillType: vm.modalSkillType.substring(0, 1),
                RoleId: roleId,
                tier: String(tier)
            }
            dataservice.AddMESkill(SkillInfo).then(function () {
                getSkillByType(vm.modalSkillType);
                logger.success(constants.message.SavingDataOK);
                refreshMECard();
            }, function (error) {
                logger.error(constants.message.errorSavingData);
            })
        }        

        function refreshMECard() {
            if (vm.selectedRS != null) {
                dataservice.postQueryALLSkillList(vm.selectedCap.SkillID, vm.selectedRS.MSGroupMasterID, 'All', 1).then(function (data) {
                    vm.mandatorydata = data[1];
                    vm.electivedata = data[2];
                    vm.mandatory = vm.mandatorydata.SkillType;
                    vm.elective = vm.electivedata.SkillType;
                    vm.currentmandatory = vm.mandatorydata.Skillhier;
                    vm.titlemandatory = vm.mandatorydata.Skillhier;
                    vm.currentelective = vm.electivedata.Skillhier;
                    vm.titleelective = vm.electivedata.Skillhier;
                    vm.mandatorySkillCount = vm.mandatorydata.SkillCount;
                    vm.electiveSkillCount = vm.electivedata.SkillCount;
                    vm.data = data[0];
                    pagecount();
                }, function (error) {
                    logger.error(constants.message.errorLoadingData);
                });
            }            
        }
        vm.deleteSkill = function (obj, index) {
            bootbox.dialog({
                message: "Do you want to delete Skill: " + obj.SkillName,
                buttons: {
                    Cancel: {
                        label: "Cancel",
                        className: "btn-group",
                        callback: function () {
                        }
                    }
                    , OK: {
                        label: "OK",
                        className: "btn-group",
                        callback: function () {
                            deleteSkill(obj, index);
                        }
                    }
                }
            });
        }

        function deleteSkill(obj, index) {
            var roleId;
            if (vm.selectedRS != null) {
                roleId = vm.selectedRS.MSGroupMasterID;
            } else {
                roleId = 0;
            }
            var SkillInfo = {
                SkillItem: Number(obj.SkillItem),
                CapId: Number(vm.selectedCap.SkillID),
                SkillId: Number(obj.SkillID),
                RoleId: roleId,
                SkillType: vm.modalSkillType.substring(0, 1)
            }
            if (vm.modalSkillType == 'Core') {
                dataservice.DeleteCoreSkill(SkillInfo).then(function () {
                    vm.allSkills.splice(index, 1);
                    logger.success(constants.message.SavingDataOK);
                    refreshCoreCard();
                }, function (error) {
                    logger.error(constants.message.errorSavingData);
                })
            } else {
                dataservice.DeleteMESkill(SkillInfo).then(function () {
                    vm.allSkills.splice(index, 1);
                    logger.success(constants.message.SavingDataOK);
                    refreshMECard();
                }, function (error) {
                    logger.error(constants.message.errorSavingData);
                })
            }
            vm.isLoading = false;
        }

        vm.getTooltipInfo = function (obj) {
            $("[role = 'tooltip']").css("display", "none");
            dataservice.GetSpeAndCapList(Number(obj.SkillID)).then(function (data) {
                vm.tooltipInfo = data[0];
                $('#tooltip' + obj.SkillID).toggle();
            }), function () {
                logger.error(constants.message.errorLoadingData);
            };                       
        }

        vm.hideTooltip = function () {
            $("li.list-group-item").mouseleave(function () {
                $("[role = 'tooltip']").hide();
            });
        }
    }
})();