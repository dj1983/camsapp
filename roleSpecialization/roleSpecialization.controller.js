(function () {
    'use strict';
    angular
        .module('app.roleSpecialization')
        .controller('roleSpecializationController', roleSpecializationController);
    roleSpecializationController.$inject = ['$location', '$q',  'dataservice', 'logger', '$scope', 'app.constants', '$state', 'authservice', '$interval'];
    /* @ngInject */
    function roleSpecializationController($location, $q, dataservice, logger, $scope, constants, $state, authservice, $interval) {
        var vm = this;
        vm.isLoading = true;
        var uservalidation = "RCLC"; //roll capability lead capabilty
        vm.peoplekey = constants.global.peopleKey;
        vm.itemPerPage = 20;
        vm.ScroePage = 10;
        getCapleaderViewSkills();
        function getCapleaderViewSkills() {
            vm.isLoading = true;
            vm.modalLoading = true;
            vm.errordata = false;
            return dataservice.GetAllCapabilityList(uservalidation).then(function (data) {
                if (data.length > 0) {
                    vm.selectedCap = data[0];
                    vm.selectedCapid = data[0].CapabilityId;
                }
                else {
                    vm.TotalCount = 0;
                    vm.modalLoading = false
                    vm.errormsg = constants.message.noMultiskill;
                    vm.errordata = true;
                    vm.isLoading = false;
                }
                vm.capability = data;
                vm.isLoading = false;
            }, function (error) {
                if (error.Message == "error:Haven't permission") {
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
        //herf master page
        vm.tomaster = function (capID, roleID, roleName, capName)
        {
            //$state.go('masters', { capId: capID, roleId: roleID, name: roleName, capname: capname });
            $state.go('masters', { page: "roleSpecialization" });
          
            localStorage.clear();
            localStorage.setItem('capID', capID);
            localStorage.setItem('roleID', roleID);
            localStorage.setItem('roleName', roleName);
            localStorage.setItem('capName', capName);
        }
        // add new data for roleSpecialization 
        vm.addData = function ()
        {
            if (vm.rolename != null && vm.selectedCapid != 0 && vm.rolename!="")
            { 
                bootbox.dialog({
                    message: "Do you want to add Role Specialization?",
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
                                var mydata = { CapabilityId: vm.selectedCap.CapabilityId, CapabilityName: vm.selectedCap.CapabilityName, RoleSpeciallizationName: vm.rolename, RoleDefinition: vm.comment };
                                dataservice.SpecializationAdd(mydata).then(function (data) {
                                    vm.rolename = null;
                                    vm.comment = null;
                                    logger.success("Add Role Specialization Successfully.")
                                    if (vm.selectedCapid != 0) {
                                        vm.getMSGroup(vm.selectedCap.CapabilityId);
                                    }
                                }, function (error) {
                                    if (error.Message == "Name has exists") {
                                    logger.error(constants.message.Rolespecialization);
                                    }
                                    else
                                    {
                                        logger.error(constants.message.errorLoadingData)
                                    }
                                });
                            }
                        }
                    }
                });
            }
        }
        vm.roleid = null;
        vm.SetParameters = function (param)
        {
            vm.roleid = param.RoleSpeciallizationId;
            vm.editrolename = param.RoleSpeciallizationName;
            vm.definition = param.RoleDefinition;
             
        }
        vm.ClearParameters = function () {
            vm.roleid = null;
            vm.editrolename = null;
            vm.definition = null;
        }
        // update  data for roleSpecialization 
        vm.renameData = function () {
            if (vm.roleid != 0 && vm.selectedCapid != 0 && vm.editrolename != "" && vm.editrolename!=null)
            {
            bootbox.dialog({
                message: "Do you want to Update Role Specialization?",
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
                            var mydata = { RoleSpeciallizationId: vm.roleid, CapabilityId: vm.selectedCap.CapabilityId, CapabilityName: vm.selectedCap.CapabilityName, RoleSpeciallizationName: vm.editrolename, RoleDefinition: vm.definition };
                            dataservice.SpecializationRename(mydata).then(function (data) {
                                logger.success("Update Role Specialization Successfully.");
                                if (vm.selectedCapid != 0) {
                                    vm.getMSGroup(vm.selectedCap.CapabilityId);
                                }
                            }, function (error) {
                                if (error.Message == "Name has exists") {
                                    logger.error(constants.message.Rolespecialization);
                                } else
                                {
                                    logger.error(constants.message.errorLoadingData);
                                }
                            });
                        }
                    }
                }
            });
            }
        }
        // detale  data for roleSpecialization 
        vm.deleteData = function (roleid, RoleMappingCount) {
            if (RoleMappingCount == 0) {
                bootbox.dialog({
                    message: "Do you want to Delete Role Specialization?",
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
                                var mydata = { RoleSpeciallizationId: roleid };
                                dataservice.SpecializationDetele(mydata).then(function (data) {
                                    logger.success("Delete Role Specialization Successfully.");
                                    if (vm.selectedCapid != 0) {
                                        vm.getMSGroup(vm.selectedCap.CapabilityId);
                                    }
                                }, function (error) {
                                    logger.error(constants.message.errorLoadingData);
                                });
                            }
                        }
                    }
                });
            }
            else
            {
                bootbox.dialog({
                    message:  "Have "+RoleMappingCount + " employees mapped to this role specialization ,you cannot delete this role specialization.",
                    buttons: {
                        Cancel: {
                            label: "Cancel",
                            className: "btn-group",
                        }
                    }
                });
            }

    
        }
        //herf load eidt skill page
        vm.editData = function () {
            $location.path('/master');
        }
        //CHANGE CAPABILITY DROPDOWN 
        vm.getMSGroup = function (capabilityid) {
            vm.isLoading = true;
            vm.rolename = null;
            vm.comment = null;
            if (angular.isDefined(capabilityid)) {
                vm.selectedSG = null;
                dataservice.GetRoleSpeciallization(capabilityid).then(function (data) {
                    vm.msgroup = data;
                    vm.isLoading = false;
                }, function (error) {
                    //$state.go('error');
                    logger.error(constants.message.errorLoadingData);
                });
            }
        }

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
    }
})();

