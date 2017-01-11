(function () {
    'use strict';

    angular
        .module('app.proficiencyconfig')
        .controller('proficiencyconfigController', proficiencyconfigController);

    proficiencyconfigController.$inject = ['$q', 'dataservice', 'logger', '$scope', 'app.constants', '$state', '$location', '$timeout'];
    /* @ngInject */

    function proficiencyconfigController($q, dataservice, logger, $scope, constants, $state, $location, $timeout) {
        var vm = this;
        function Setvalue() {
            vm.LeadershipTechnical = 80;
            vm.LeadershipContributions = 10;
            vm.LeadershipCertification = 10;
            vm.L5Technical = 80;
            vm.L5Contributions = 10;
            vm.L5Certification = 10;
            vm.L6Technical = 80;
            vm.L6Contributions = 10;
            vm.L6Certification = 10;
            vm.L7Technical = 80;
            vm.L7Contributions = 10;
            vm.L7Certification = 10;
            vm.L8Technical = 80;
            vm.L8Contributions = 10;
            vm.L8Certification = 10;
            vm.L9Technical = 80;
            vm.L9Contributions = 10;
            vm.L9Certification = 10;
            vm.L10Technical = 80;
            vm.L10Contributions = 10;
            vm.L10Certification = 10;
            vm.L11Technical = 80;
            vm.L11Contributions = 10;
            vm.L11Certification = 10;
            vm.L12Technical = 80;
            vm.L12Contributions = 10;
            vm.L12Certification = 10;
            vm.L13Technical = 80;
            vm.L13Contributions = 10;
            vm.L13Certification = 10;
        }
        vm.tablevalidation = false;
        vm.peoplekey = constants.global.peopleKey;
        vm.enterprise = constants.global.enterpriseId;
        vm.uservalidation = "RC";
        if (Admin == 'Yes') {
            vm.isAdmin = true;
        } else {
            vm.isAdmin = false;
        }
        vm.compareResult = true;
        vm.compareResultExp = true;
        vm.message = constants.message.noResultsFound;
        vm.messageExp = constants.message.noResultsFound;
        vm.messagePCC = constants.message.noResultsFound;
        $(window).unbind('hashchange');
        $(window).on('hashchange', function (e) {
            e.preventDefault();
            elementLoad();
        });

        function elementLoad() {

            $("#tab_content").find("div.tab-pane").removeClass("active");
            $("#ul_content").find("li").removeClass("active");
            var h = window.location.hash;
            if (angular.isDefined(h)) {
                var tab = $(h);
                var ulli = $(h + "_li");
                if (tab.size() > 0 && ulli.size() > 0) {
                    tab.addClass("active");
                    ulli.addClass("active");
                    if (window.location.hash == '#techcertcont') {
                        getLevel();
                    }
                }
                else {
                    var activeTab;
                    var activeLi;
                    activeTab = "#total";
                    activeLi = "#total_li";
                    $(activeTab).addClass("active");
                    $(activeLi).addClass("active");
                }
            }
            else {
                var activeTab;
                var activeLi;
                activeTab = "#total";
                activeLi = "#total_li";
                $(activeTab).addClass("active");
                $(activeLi).addClass("active");
            }
        }

        getCapability();
        Setvalue();

        function getCapability() {
            vm.isLoading = true;
            vm.errordata = false;
            dataservice.getCapleaderViewSkills(vm.uservalidation).then(function (data) {
                vm.capability = data;
                elementLoad();
                if (window.location.hash == "#techcertcont") {
                    //elementLoad();
                }
                else {
                    vm.isLoading = false;
                }
                //vm.isLoading = false;
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

        vm.compare = function (m, n) {
            if (Number(m) <= Number(n)) {
                return true;
            }
            else {
                return false;
            }
        };

        /*************************************Tab Total****************************************/
        vm.getMSGroup = function (capabilityid) {
            Setvalue();
            vm.isLoading = true;
            if (angular.isDefined(vm.currentCap) && vm.currentCap != capabilityid) {
                //Tab1
                vm.selectedSG = null;
                vm.totalSettingP1 = null;
                vm.totalSettingP2 = null;
                vm.totalSettingP3 = null;
                vm.totalSettingP4 = null;
                // vm.totalSettingApprover = null;
                $scope.TotalForm.$setPristine();
                //Tab2
                $scope.ExperienceForm.$setPristine();
                vm.selectedExpSG = null;
                vm.expSettingP1 = null;
                vm.expSettingP2 = null;
                vm.expSettingP3 = null;
                vm.expSettingP4 = null;
                vm.expSettingPri = null;
                vm.expSettingSec = null;
                vm.expSettingApprover = null;
                //Tab3
                $scope.proficinecyForm.$setPristine();
                vm.info.TechW = null;
                vm.info.ContW = null;
                vm.info.CertW = null;
                vm.info.ApprEnterpriseID = null;
                vm.SG = null;

            };
            if (angular.isDefined(capabilityid)) {
                vm.currentCap = capabilityid;
                dataservice.getMSGroup(capabilityid).then(function (data) {
                    vm.msgroup = data;
                    vm.isLoading = false;
                }, function (error) {
                    //$state.go('error');
                    logger.error(constants.message.errorLoadingData);
                });
            } else {
                //tab 1
                vm.msgroup = null;
                vm.selectedSG = null;
                vm.totalSettingP1 = null;
                vm.totalSettingP2 = null;
                vm.totalSettingP3 = null;
                vm.totalSettingP4 = null;
                //vm.totalSettingApprover = null;
                $scope.TotalForm.$setPristine();
                vm.isLoading = false;

                //tab 2
                vm.msgroupExp = null;
                vm.selectedExpSG = null;
                vm.expSettingP1 = null;
                vm.expSettingP2 = null;
                vm.expSettingP3 = null;
                vm.expSettingP4 = null;
                vm.expSettingPri = null;
                vm.expSettingSec = null;
                vm.expSettingApprover = null;
                vm.isLoading = false;
                $scope.ExperienceForm.$setPristine();

                //tab 3
                //vm.msgroupPcc = null;
                //vm.info.TechW = null;
                //vm.info.ContW = null;
                //vm.info.CertW = null;
                //vm.info.ApprEnterpriseID = null;
                //vm.SG = null;
                //vm.isLoading = false;
                //$scope.TechForm.$setPristine();

            }
        }

        vm.getTotalSetting = function (levelID, SGCapMsID) {
            vm.noResults = false;
            vm.isLoading = true;
            vm.validationResult = true;
            vm.tablevalidation = true;
            if (angular.isDefined(SGCapMsID)) {
                dataservice.getTotalSetting(SGCapMsID).then(function (data) {
                    vm.totalSettingP1 = Number(data.P1);
                    vm.totalSettingP2 = Number(data.P2);
                    vm.totalSettingP3 = Number(data.P3);
                    vm.totalSettingP4 = Number(data.P4);
                }, function (error) {
                    logger.error(constants.message.errorLoadingData);
                    vm.isLoading = false;
                });
                //    .then(function () {
                //    if (vm.totalSettingApprover != '' && angular.isDefined(vm.totalSettingApprover)) {
                //        dataservice.checkResource(vm.totalSettingApprover).then(function (data) {
                //            if (data.exists == true) {
                //                vm.namePassed = true;
                //                vm.noResults = false;
                //            } else {
                //                vm.noResults = true;
                //                vm.namePassed = false;
                //                vm.message = constants.message.approverNotActive;
                //            }
                //            vm.isLoading = false;
                //        }, function (error) {
                //            logger.error(constants.message.errorLoadingData);
                //            vm.isLoading = false;
                //        });
                //    } else {
                //        vm.isLoading = false;
                //    }
                //});
            } else {
                vm.totalSettingP1 = null;
                vm.totalSettingP2 = null;
                vm.totalSettingP3 = null;
                vm.totalSettingP4 = null;
                vm.isLoading = false;
            }
            $scope.TotalForm.$setPristine();

            //tab 2

            if (angular.isDefined(SGCapMsID)) {
                dataservice.getExpSetting(SGCapMsID).then(function (data) {

                    vm.expSettingP1 = Number(data.P1);
                    vm.expSettingP2 = Number(data.P2);
                    vm.expSettingP3 = Number(data.P3);
                    vm.expSettingP4 = Number(data.P4);
                    vm.expSettingPri = Number(data.Pri);
                    vm.expSettingSec = Number(data.Sec);
                    vm.expSettingApprover = data.ApproverEID;
                    vm.isLoading = false;
                    $scope.ExperienceForm.$setPristine();
                }, function (error) {
                    logger.error(constants.message.errorLoadingData);
                    vm.isLoading = false;
                })
            } else {
                vm.expSettingP1 = null;
                vm.expSettingP2 = null;
                vm.expSettingP3 = null;
                vm.expSettingP4 = null;
                vm.expSettingPri = null;
                vm.expSettingSec = null;
                vm.expSettingApprover = null;
                vm.isLoading = false;
                $scope.ExperienceForm.$setPristine();
            }
            //tab3
            //alert(vm.level.LevelID);
            //alert(vm.SG.SGCapMsID)
            //if (levelID != undefined) {
            //    vm.GetPCCData(levelID, SGCapMsID);
            //}
            //if (angular.isDefined(SGCapMsID)) {
            //    vm.GetlevelData(SGCapMsID);
            //}
            //table
            if (angular.isDefined(SGCapMsID)) {
                dataservice.weightconfig(SGCapMsID).then(function (data) {
                    vm.LeadershipTechnical = data[0].Technical;
                    vm.LeadershipContributions = data[0].Contributions;
                    vm.LeadershipCertification = data[0].Certification;
                    vm.LeadershipCareerLevelId = data[0].CareerLevelId;
                    vm.L5Technical = data[1].Technical;
                    vm.L5Contributions = data[1].Contributions;
                    vm.L5Certification = data[1].Certification;
                    vm.L5CareerLevelId = data[1].CareerLevelId;
                    vm.L6Technical = data[2].Technical;
                    vm.L6Contributions = data[2].Contributions;
                    vm.L6Certification = data[2].Certification;
                    vm.L6CareerLevelId = data[2].CareerLevelId;
                    vm.L7Technical = data[3].Technical;
                    vm.L7Contributions = data[3].Contributions;
                    vm.L7Certification = data[3].Certification;
                    vm.L7CareerLevelId = data[3].CareerLevelId;
                    vm.L8Technical = data[4].Technical;
                    vm.L8Contributions = data[4].Contributions;
                    vm.L8Certification = data[4].Certification;
                    vm.L8CareerLevelId = data[4].CareerLevelId;
                    vm.L9Technical = data[5].Technical;
                    vm.L9Contributions = data[5].Contributions;
                    vm.L9Certification = data[5].Certification;
                    vm.L9CareerLevelId = data[5].CareerLevelId;
                    vm.L10Technical = data[6].Technical;
                    vm.L10Contributions = data[6].Contributions;
                    vm.L10Certification = data[6].Certification;
                    vm.L10CareerLevelId = data[6].CareerLevelId;
                    vm.L11Technical = data[7].Technical;
                    vm.L11Contributions = data[7].Contributions;
                    vm.L11Certification = data[7].Certification;
                    vm.L11CareerLevelId = data[7].CareerLevelId;
                    vm.L12Technical = data[8].Technical;
                    vm.L12Contributions = data[8].Contributions;
                    vm.L12Certification = data[8].Certification;
                    vm.L12CareerLevelId = data[8].CareerLevelId;
                    vm.L13Technical = data[9].Technical;
                    vm.L13Contributions = data[9].Contributions;
                    vm.L13Certification = data[9].Certification;
                    vm.L13CareerLevelId = data[9].CareerLevelId;
                }, function (error) {
                    logger.error(constants.message.errorLoadingData);
                    vm.isLoading = false;
                })
            } else {
          
            }
        }

        vm.GetlevelData = function (SGCapMsID) {
            dataservice.GetPCCData(mappid).then(function (data) {
                vm.info.TechW = data.TechWeightage;
                vm.info.ContW = data.ConWeightage;
                vm.info.CertW = data.CerWeightage;
                vm.info.ApprEnterpriseID = vm.enterprise;
                vm.isLoading = false;
                $scope.TechForm.$setPristine();
            }, function (error) {
                logger.error(constants.message.errorLoadingData);
                vm.isLoading = false;
            })

        }
        $scope.$watch('vm.totalSettingP1+vm.totalSettingP2+vm.totalSettingP3+vm.totalSettingP4', function () {
            if ((Number(vm.totalSettingP4) > Number(vm.totalSettingP3)) && (Number(vm.totalSettingP3) > Number(vm.totalSettingP2)) && (Number(vm.totalSettingP2) > Number(vm.totalSettingP1)) && (Number(vm.totalSettingP1) > 0)) {
                vm.compareResult = true;
            } else {
                vm.compareResult = false;
            };

            if (angular.isDefined(vm.totalSettingP1) && vm.totalSettingP1 != '' && vm.totalSettingP1 != null) {
                vm.totalSettingP1 = vm.totalSettingP1.toString().replace(/[^\d.]/g, "");
                if (!vm.totalSettingP1.contains('.') && vm.totalSettingP1 != '') {
                    vm.totalSettingP1 = Number(vm.totalSettingP1)
                } else {
                    vm.totalSettingP1 = vm.totalSettingP1.replace(/^\./g, "");
                    vm.totalSettingP1 = vm.totalSettingP1.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                }
            };
            if (angular.isDefined(vm.totalSettingP2) && vm.totalSettingP2 != '' && vm.totalSettingP2 != null) {
                vm.totalSettingP2 = vm.totalSettingP2.toString().replace(/[^\d.]/g, "");
                if (!vm.totalSettingP2.contains('.') && vm.totalSettingP2 != '') {
                    vm.totalSettingP2 = Number(vm.totalSettingP2)
                } else {
                    vm.totalSettingP2 = vm.totalSettingP2.replace(/^\./g, "");
                    vm.totalSettingP2 = vm.totalSettingP2.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                }
            };
            if (angular.isDefined(vm.totalSettingP3) && vm.totalSettingP3 != '' && vm.totalSettingP3 != null) {
                vm.totalSettingP3 = vm.totalSettingP3.toString().replace(/[^\d.]/g, "");
                if (!vm.totalSettingP3.contains('.') && vm.totalSettingP3 != '') {
                    vm.totalSettingP3 = Number(vm.totalSettingP3)
                } else {
                    vm.totalSettingP3 = vm.totalSettingP3.replace(/^\./g, "");
                    vm.totalSettingP3 = vm.totalSettingP3.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                }
            };
            if (angular.isDefined(vm.totalSettingP4) && vm.totalSettingP4 != '' && vm.totalSettingP4 != null) {
                vm.totalSettingP4 = vm.totalSettingP4.toString().replace(/[^\d.]/g, "");
                if (!vm.totalSettingP4.contains('.') && vm.totalSettingP4 != '') {
                    vm.totalSettingP4 = Number(vm.totalSettingP4)
                } else {
                    vm.totalSettingP4 = vm.totalSettingP4.replace(/^\./g, "");
                    vm.totalSettingP4 = vm.totalSettingP4.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                }
            };
        });

        vm.submitTotalForm = function () {
            vm.isLoading = true;
            var obj = {
                P1: Number(vm.totalSettingP1),
                P2: Number(vm.totalSettingP2),
                P3: Number(vm.totalSettingP3),
                P4: Number(vm.totalSettingP4),
                ApproverEID: vm.enterprise,
                PeopleKey: vm.peoplekey,
                SGCapMsID: vm.selectedSG.SGCapMsID
            }
            dataservice.updateTotalSetting(obj).then(function () {
                logger.success(constants.message.successSavingData);
                vm.isLoading = false;
                $scope.TotalForm.$setPristine();
            }, function (error) {
                if (error.Message == "Invalid EID") {
                    //logger.error(constants.message.invalidApprover);
                    vm.namePassed = false;

                } else {
                    logger.error(constants.message.errorSavingData);
                };
                vm.isLoading = false;
            });
            //$scope.TotalForm.$setPristine();
        };

        vm.searchResource = function (val) {
            var obj = {
                EnterpriseID: val
            };
            vm.namePassed = false;
            vm.noResults = false;
            return dataservice.getResource(obj).then(function (data) {
                if (data.length != 0) {
                    return $.map(data, function (item) {
                        if (item.EnterpriseID == val) {
                            vm.namePassed = true;
                        }
                        return item.EnterpriseID;
                    })

                } else {
                    vm.noResults = true;
                    vm.message = constants.message.noResultsFound;
                    vm.namePassed = false;
                };
            }, function (error) {
                logger.error(constants.message.errorSavingData);
            });
        };

        vm.selectName = function () {
            vm.namePassed = true;
            vm.noResults = false;
        };
        vm.reset = function () {
            // vm.msgroup = null;
            // vm.totalSettingApprover = null;
            vm.totalSettingP1 = null;
            vm.totalSettingP2 = null;
            vm.totalSettingP3 = null;
            vm.totalSettingP4 = null;
            //vm.selectedCap = null;
            //vm.selectedSG = null;
            $scope.TotalForm.$setPristine();
        };


        vm.checkNum = function (event) {

            if ((event.keyCode == 46 || (event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode == 8)) || (event.which == 46 || event.which >= 48 && event.which <= 57 || event.which == 8)) {
                return;
            } else {
                event.preventDefault();
            };
        };

        /*************************************Tab Experience****************************************/
        //Check Keycode, allow number and backspace can be input
        vm.checkExp = function (event) {

            if (((event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode == 8)) || (event.which >= 48 && event.which <= 57 || event.which == 8)) {
                return;
            } else {
                event.preventDefault();
            };
        };

        //Get Role Specialization list
        vm.getMSGroupExp = function (capabilityid) {
            vm.isLoading = true;
            //Check capability change or not
            if (angular.isDefined(vm.currentExpCap) && vm.currentExpCap != capabilityid) {
                $scope.ExperienceForm.$setPristine();
                vm.selectedExpSG = null;
                vm.expSettingP1 = null;
                vm.expSettingP2 = null;
                vm.expSettingP3 = null;
                vm.expSettingP4 = null;
                vm.expSettingPri = null;
                vm.expSettingSec = null;
                vm.expSettingApprover = null;

            };

            if (angular.isDefined(capabilityid)) {
                vm.currentExpCap = capabilityid;
                //Get Role Specialization list
                return dataservice.getMSGroup(capabilityid).then(function (data) {
                    vm.msgroupExp = data;
                    vm.isLoading = false;
                }, function (error) {
                    logger.error(constants.message.errorLoadingData);
                });
            } else {
                vm.msgroupExp = null;
                vm.selectedExpSG = null;
                vm.expSettingP1 = null;
                vm.expSettingP2 = null;
                vm.expSettingP3 = null;
                vm.expSettingP4 = null;
                vm.expSettingPri = null;
                vm.expSettingSec = null;
                vm.expSettingApprover = null;
                vm.isLoading = false;
                $scope.ExperienceForm.$setPristine();

            };
        }

        //Get Experience configuration setting
        vm.getExpSetting = function (msgid) {
            vm.isLoading = true;
            vm.noResultsExp = false;
            if (angular.isDefined(msgid)) {
                dataservice.getExpSetting(msgid).then(function (data) {

                    vm.expSettingP1 = Number(data.P1);
                    vm.expSettingP2 = Number(data.P2);
                    vm.expSettingP3 = Number(data.P3);
                    vm.expSettingP4 = Number(data.P4);
                    vm.expSettingPri = Number(data.Pri);
                    vm.expSettingSec = Number(data.Sec);
                    vm.expSettingApprover = data.ApproverEID;
                    vm.isLoading = false;
                    $scope.ExperienceForm.$setPristine();
                }, function (error) {
                    logger.error(constants.message.errorLoadingData);
                    vm.isLoading = false;
                }).then(function () {
                    //Check current exist Approver EID is vaild or not
                    if (vm.expSettingApprover != '' && angular.isDefined(vm.expSettingApprover)) {
                        dataservice.checkResource(vm.expSettingApprover).then(function (data) {
                            if (data.exists == true) {
                                vm.namePassedExp = true;
                                vm.noResultsExp = false;
                            } else {
                                vm.noResultsExp = true;
                                vm.namePassedExp = false;
                                vm.messageExp = constants.message.approverNotActive;
                            };
                            vm.isLoading = false;
                        }, function (error) {
                            logger.error(constants.message.errorLoadingData);
                            vm.isLoading = false;
                        });
                    } else {
                        vm.isLoading = false;
                    }
                });

            } else {
                vm.expSettingP1 = null;
                vm.expSettingP2 = null;
                vm.expSettingP3 = null;
                vm.expSettingP4 = null;
                vm.expSettingPri = null;
                vm.expSettingSec = null;
                vm.expSettingApprover = null;
                vm.isLoading = false;
                $scope.ExperienceForm.$setPristine();
            };
        };

        //Check experience configuration P4>P3>P2>P1
        $scope.$watch('vm.expSettingP1+vm.expSettingP2+vm.expSettingP3+vm.expSettingP4+vm.expSettingPri+vm.expSettingSec', function () {
            if ((Number(vm.expSettingP4) > Number(vm.expSettingP3)) && (Number(vm.expSettingP3) > Number(vm.expSettingP2)) && (Number(vm.expSettingP2) > Number(vm.expSettingP1)) && (Number(vm.expSettingP1) > 0)) {
                vm.compareExpResult = true;
            } else {
                vm.compareExpResult = false;
            };

            //P1:Keep number in textbox when copy special character
            if (angular.isDefined(vm.expSettingP1) && vm.expSettingP1 != '' && vm.expSettingP1 != null) {
                vm.expSettingP1 = vm.expSettingP1.toString().replace(/[^\d]/g, "");
                if (vm.expSettingP1 != '') {
                    vm.expSettingP1 = Number(vm.expSettingP1)
                }
            };

            //P2:Keep number in textbox when copy special character
            if (angular.isDefined(vm.expSettingP2) && vm.expSettingP2 != '' && vm.expSettingP2 != null) {
                vm.expSettingP2 = vm.expSettingP2.toString().replace(/[^\d]/g, "");
                if (vm.expSettingP2 != '') {
                    vm.expSettingP2 = Number(vm.expSettingP2)
                }
            };

            //P3:Keep number in textbox when copy special character
            if (angular.isDefined(vm.expSettingP3) && vm.expSettingP3 != '' && vm.expSettingP3 != null) {
                vm.expSettingP3 = vm.expSettingP3.toString().replace(/[^\d]/g, "");
                if (vm.expSettingP3 != '') {
                    vm.expSettingP3 = Number(vm.expSettingP3)
                }
            };

            //P4:Keep number in textbox when copy special character
            if (angular.isDefined(vm.expSettingP4) && vm.expSettingP4 != '' && vm.expSettingP4 != null) {
                vm.expSettingP4 = vm.expSettingP4.toString().replace(/[^\d]/g, "");
                if (vm.expSettingP4 != '') {
                    vm.expSettingP4 = Number(vm.expSettingP4)
                }
            };

            //Weightage of Primary:Keep number in textbox when copy special character
            if (angular.isDefined(vm.expSettingPri) && vm.expSettingPri != '' && vm.expSettingPri != null) {
                vm.expSettingPri = vm.expSettingPri.toString().replace(/[^\d]/g, "");
                if (vm.expSettingPri != '') {
                    vm.expSettingPri = Number(vm.expSettingPri)
                }
            };

            //Weightage of Secondary:Keep number in textbox when copy special character
            if (angular.isDefined(vm.expSettingSec) && vm.expSettingSec != '' && vm.expSettingSec != null) {
                vm.expSettingSec = vm.expSettingSec.toString().replace(/[^\d]/g, "");
                if (vm.expSettingSec != '') {
                    vm.expSettingSec = Number(vm.expSettingSec)
                }
            };
          
          
        });
        //Leadership :Keep number in textbox when copy special character
        $scope.$watch('vm.LeadershipTechnical+vm.LeadershipContributions+vm.LeadershipCertification', function () {
            if (angular.isDefined(vm.LeadershipTechnical) && vm.LeadershipTechnical != '' && vm.LeadershipTechnical != null) {
                vm.LeadershipTechnical = vm.LeadershipTechnical.toString().replace(/[^\d]/g, "");
                if (Number(vm.LeadershipTechnical) > 100)
                {
                    vm.LeadershipTechnical = "";
                }
                if (vm.LeadershipTechnical != '') {
                    vm.LeadershipTechnical = Number(vm.LeadershipTechnical)
                }
            };
            if (angular.isDefined(vm.LeadershipContributions) && vm.LeadershipContributions != '' && vm.LeadershipContributions != null) {
                vm.LeadershipContributions = vm.LeadershipContributions.toString().replace(/[^\d]/g, "");
                if (Number(vm.LeadershipContributions) > 100) {
                    vm.LeadershipContributions = "";
                }
                if (vm.LeadershipContributions != '') {
                    vm.LeadershipContributions = Number(vm.LeadershipContributions)
                }
            };
            if (angular.isDefined(vm.LeadershipCertification) && vm.LeadershipCertification != '' && vm.LeadershipCertification != null) {
                vm.LeadershipCertification = vm.LeadershipCertification.toString().replace(/[^\d]/g, "");
                if (Number(vm.LeadershipCertification) > 100) {
                    vm.LeadershipCertification = "";
                }
                if (vm.LeadershipCertification != '') {
                    vm.LeadershipCertification = Number(vm.LeadershipCertification)
                }
            };

        });

        //L5 :Keep number in textbox when copy special character
        $scope.$watch('vm.L5Technical+vm.L5Contributions+vm.L5Certification', function () {
            if (angular.isDefined(vm.L5Technical) && vm.L5Technical != '' && vm.L5Technical != null) {
                vm.L5Technical = vm.L5Technical.toString().replace(/[^\d]/g, "");
                if (Number(vm.L5Technical) > 100) {
                    vm.L5Technical = "";
                }
                if (vm.L5Technical != '') {
                    vm.L5Technical = Number(vm.L5Technical)
                }
            };
            if (angular.isDefined(vm.L5Contributions) && vm.L5Contributions != '' && vm.L5Contributions != null) {
                vm.L5Contributions = vm.L5Contributions.toString().replace(/[^\d]/g, "");
                if (Number(vm.L5Contributions) > 100) {
                    vm.L5Contributions = "";
                }
                if (vm.L5Contributions != '') {
                    vm.L5Contributions = Number(vm.L5Contributions)
                }
            };
            if (angular.isDefined(vm.L5Certification) && vm.L5Certification != '' && vm.L5Certification != null) {
                vm.L5Certification = vm.L5Certification.toString().replace(/[^\d]/g, "");
                if (Number(vm.L5Certification) > 100) {
                    vm.L5Certification = "";
                }
                if (vm.L5Certification != '') {
                    vm.L5Certification = Number(vm.L5Certification)
                }
            };

        });


        //L6 :Keep number in textbox when copy special character
        $scope.$watch('vm.L6Technical+vm.L6Contributions+vm.L6Certification', function () {
            if (angular.isDefined(vm.L6Technical) && vm.L6Technical != '' && vm.L6Technical != null) {
                vm.L6Technical = vm.L6Technical.toString().replace(/[^\d]/g, "");
                if (Number(vm.L6Technical) > 100) {
                    vm.L6Technical = "";
                }
                if (vm.L6Technical != '') {
                    vm.L6Technical = Number(vm.L6Technical)
                }
            };
            if (angular.isDefined(vm.L6Contributions) && vm.L6Contributions != '' && vm.L6Contributions != null) {
                vm.L6Contributions = vm.L6Contributions.toString().replace(/[^\d]/g, "");
                if (Number(vm.L6Contributions) > 100) {
                    vm.L6Contributions = "";
                }
                if (vm.L6Contributions != '') {
                    vm.L6Contributions = Number(vm.L6Contributions)
                }
            };
            if (angular.isDefined(vm.L6Certification) && vm.L6Certification != '' && vm.L6Certification != null) {
                vm.L6Certification = vm.L6Certification.toString().replace(/[^\d]/g, "");
                if (Number(vm.L6Certification) > 100) {
                    vm.L6Certification = "";
                }
                if (vm.L6Certification != '') {
                    vm.L6Certification = Number(vm.L6Certification)
                }
            };

        });

        //L7 :Keep number in textbox when copy special character
        $scope.$watch('vm.L7Technical+vm.L7Contributions+vm.L7Certification', function () {
            if (angular.isDefined(vm.L7Technical) && vm.L7Technical != '' && vm.L7Technical != null) {
                vm.L7Technical = vm.L7Technical.toString().replace(/[^\d]/g, "");
                if (Number(vm.L7Technical) > 100) {
                    vm.L7Technical = "";
                }
                if (vm.L7Technical != '') {
                    vm.L7Technical = Number(vm.L7Technical)
                }
            };
            if (angular.isDefined(vm.L7Contributions) && vm.L7Contributions != '' && vm.L7Contributions != null) {
                vm.L7Contributions = vm.L7Contributions.toString().replace(/[^\d]/g, "");
                if (Number(vm.L7Contributions) > 100) {
                    vm.L7Contributions = "";
                }
                if (vm.L7Contributions != '') {
                    vm.L7Contributions = Number(vm.L7Contributions)
                }
            };
            if (angular.isDefined(vm.L7Certification) && vm.L7Certification != '' && vm.L7Certification != null) {
                vm.L7Certification = vm.L7Certification.toString().replace(/[^\d]/g, "");
                if (Number(vm.L7Certification) > 100) {
                    vm.L7Certification = "";
                }
                if (vm.L7Certification != '') {
                    vm.L7Certification = Number(vm.L7Certification)
                }
            };

        });

        //L8 :Keep number in textbox when copy special character
        $scope.$watch('vm.L8Technical+vm.L8Contributions+vm.L8Certification', function () {
            if (angular.isDefined(vm.L8Technical) && vm.L8Technical != '' && vm.L8Technical != null) {
                vm.L8Technical = vm.L8Technical.toString().replace(/[^\d]/g, "");
                if (Number(vm.L8Technical) > 100) {
                    vm.L8Technical = "";
                }
                if (vm.L8Technical != '') {
                    vm.L8Technical = Number(vm.L8Technical)
                }
            };
            if (angular.isDefined(vm.L8Contributions) && vm.L8Contributions != '' && vm.L8Contributions != null) {
                vm.L8Contributions = vm.L8Contributions.toString().replace(/[^\d]/g, "");
                if (Number(vm.L8Contributions) > 100) {
                    vm.L8Contributions = "";
                }
                if (vm.L8Contributions != '') {
                    vm.L8Contributions = Number(vm.L8Contributions)
                }
            };
            if (angular.isDefined(vm.L8Certification) && vm.L8Certification != '' && vm.L8Certification != null) {
                vm.L8Certification = vm.L8Certification.toString().replace(/[^\d]/g, "");
                if (Number(vm.L8Certification) > 100) {
                    vm.L8Certification = "";
                }
                if (vm.L8Certification != '') {
                    vm.L8Certification = Number(vm.L8Certification)
                }
            };

        });

        //L9 :Keep number in textbox when copy special character
        $scope.$watch('vm.L9Technical+vm.L9Contributions+vm.L9Certification', function () {
            if (angular.isDefined(vm.L9Technical) && vm.L9Technical != '' && vm.L9Technical != null) {
                vm.L9Technical = vm.L9Technical.toString().replace(/[^\d]/g, "");
                if (Number(vm.L9Technical) > 100) {
                    vm.L9Technical = "";
                }
                if (vm.L9Technical != '') {
                    vm.L9Technical = Number(vm.L9Technical)
                }
            };
            if (angular.isDefined(vm.L9Contributions) && vm.L9Contributions != '' && vm.L9Contributions != null) {
                vm.L9Contributions = vm.L9Contributions.toString().replace(/[^\d]/g, "");
                if (Number(vm.L9Contributions) > 100) {
                    vm.L9Contributions = "";
                }
                if (vm.L9Contributions != '') {
                    vm.L9Contributions = Number(vm.L9Contributions)
                }
            };
            if (angular.isDefined(vm.L9Certification) && vm.L9Certification != '' && vm.L9Certification != null) {
                vm.L9Certification = vm.L9Certification.toString().replace(/[^\d]/g, "");
                if (Number(vm.L9Certification) > 100) {
                    vm.L9Certification = "";
                }
                if (vm.L9Certification != '') {
                    vm.L9Certification = Number(vm.L9Certification)
                }
            };

        });


        //L10 :Keep number in textbox when copy special character
        $scope.$watch('vm.L10Technical+vm.L10Contributions+vm.L10Certification', function () {
            if (angular.isDefined(vm.L10Technical) && vm.L10Technical != '' && vm.L10Technical != null) {
                vm.L10Technical = vm.L10Technical.toString().replace(/[^\d]/g, "");
                if (Number(vm.L10Technical) > 100) {
                    vm.L10Technical = "";
                }
                if (vm.L10Technical != '') {
                    vm.L10Technical = Number(vm.L10Technical)
                }
            };
            if (angular.isDefined(vm.L10Contributions) && vm.L10Contributions != '' && vm.L10Contributions != null) {
                vm.L10Contributions = vm.L10Contributions.toString().replace(/[^\d]/g, "");
                if (Number(vm.L10Contributions) > 100) {
                    vm.L10Contributions = "";
                }
                if (vm.L10Contributions != '') {
                    vm.L10Contributions = Number(vm.L10Contributions)
                }
            };
            if (angular.isDefined(vm.L10Certification) && vm.L10Certification != '' && vm.L10Certification != null) {
                vm.L10Certification = vm.L10Certification.toString().replace(/[^\d]/g, "");
                if (Number(vm.L10Certification) > 100) {
                    vm.L10Certification = "";
                }
                if (vm.L10Certification != '') {
                    vm.L10Certification = Number(vm.L10Certification)
                }
            };

        });

        //L11 :Keep number in textbox when copy special character
        $scope.$watch('vm.L11Technical+vm.L11Contributions+vm.L11Certification', function () {
            if (angular.isDefined(vm.L11Technical) && vm.L11Technical != '' && vm.L11Technical != null) {
                vm.L11Technical = vm.L11Technical.toString().replace(/[^\d]/g, "");
                if (Number(vm.L11Technical) > 100) {
                    vm.L11Technical = "";
                }
                if (vm.L11Technical != '') {
                    vm.L11Technical = Number(vm.L11Technical)
                }
            };
            if (angular.isDefined(vm.L11Contributions) && vm.L11Contributions != '' && vm.L11Contributions != null) {
                vm.L11Contributions = vm.L11Contributions.toString().replace(/[^\d]/g, "");
                if (Number(vm.L11Contributions) > 100) {
                    vm.L11Contributions = "";
                }
                if (vm.L11Contributions != '') {
                    vm.L11Contributions = Number(vm.L11Contributions)
                }
            };
            if (angular.isDefined(vm.L11Certification) && vm.L11Certification != '' && vm.L11Certification != null) {
                vm.L11Certification = vm.L11Certification.toString().replace(/[^\d]/g, "");
                if (Number(vm.L11Certification) > 100) {
                    vm.L11Certification = "";
                }
                if (vm.L11Certification != '') {
                    vm.L11Certification = Number(vm.L11Certification)
                }
            };

        });

        //L12 :Keep number in textbox when copy special character
        $scope.$watch('vm.L12Technical+vm.L12Contributions+vm.L12Certification', function () {
            if (angular.isDefined(vm.L12Technical) && vm.L12Technical != '' && vm.L12Technical != null) {
                vm.L12Technical = vm.L12Technical.toString().replace(/[^\d]/g, "");
                if (Number(vm.L12Technical) > 100) {
                    vm.L12Technical = "";
                }
                if (vm.L12Technical != '') {
                    vm.L12Technical = Number(vm.L12Technical)
                }
            };
            if (angular.isDefined(vm.L12Contributions) && vm.L12Contributions != '' && vm.L12Contributions != null) {
                vm.L12Contributions = vm.L12Contributions.toString().replace(/[^\d]/g, "");
                if (Number(vm.L12Contributions) > 100) {
                    vm.L12Contributions = "";
                }
                if (vm.L12Contributions != '') {
                    vm.L12Contributions = Number(vm.L12Contributions)
                }
            };
            if (angular.isDefined(vm.L12Certification) && vm.L12Certification != '' && vm.L12Certification != null) {
                vm.L12Certification = vm.L12Certification.toString().replace(/[^\d]/g, "");
                if (Number(vm.L12Certification) > 100) {
                    vm.L12Certification = "";
                }
                if (vm.L12Certification != '') {
                    vm.L12Certification = Number(vm.L12Certification)
                }
            };

        });


        //L13 :Keep number in textbox when copy special character
        $scope.$watch('vm.L13Technical+vm.L13Contributions+vm.L13Certification', function () {
            if (angular.isDefined(vm.L13Technical) && vm.L13Technical != '' && vm.L13Technical != null) {
                vm.L13Technical = vm.L13Technical.toString().replace(/[^\d]/g, "");
                if (Number(vm.L13Technical) > 100) {
                    vm.L13Technical = "";
                }
                if (vm.L13Technical != '') {
                    vm.L13Technical = Number(vm.L13Technical)
                }
            };
            if (angular.isDefined(vm.L13Contributions) && vm.L13Contributions != '' && vm.L13Contributions != null) {
                vm.L13Contributions = vm.L13Contributions.toString().replace(/[^\d]/g, "");
                if (Number(vm.L13Contributions) > 100) {
                    vm.L13Contributions = "";
                }
                if (vm.L13Contributions != '') {
                    vm.L13Contributions = Number(vm.L13Contributions)
                }
            };
            if (angular.isDefined(vm.L13Certification) && vm.L13Certification != '' && vm.L13Certification != null) {
                vm.L13Certification = vm.L13Certification.toString().replace(/[^\d]/g, "");
                if (Number(vm.L13Certification) > 100) {
                    vm.L13Certification = "";
                }
                if (vm.L13Certification != '') {
                    vm.L13Certification = Number(vm.L13Certification)
                }
            };

        });

        //Save experience configuration setting
        vm.submitExpForm = function () {
            //bootbox.alert("Experience configuration has been set successfully.");
            vm.isLoading = true;
            var obj = {
                P1: Number(vm.expSettingP1),
                P2: Number(vm.expSettingP2),
                P3: Number(vm.expSettingP3),
                P4: Number(vm.expSettingP4),
                Pri: Number(vm.expSettingPri),
                Sec: Number(vm.expSettingSec),
                ApproverEID: vm.enterprise,
                PeopleKey: vm.peoplekey,
                SGCapMsID: vm.selectedSG.SGCapMsID
            }
            dataservice.updateExpSetting(obj).then(function () {
                logger.success(constants.message.successSavingData);
                vm.isLoading = false;
                $scope.ExperienceForm.$setPristine();
            }, function (error) {
                if (error.Message == "Invalid EID") {
                    //logger.error(constants.message.invalidApprover);
                    vm.namePassedExp = false;
                } else {
                    logger.error(constants.message.errorSavingData);
                }
                vm.isLoading = false;
            });
            //$scope.ExperienceForm.$setPristine();
        };

        //Check input Approver EID vaild or invalid 
        vm.searchResourceExp = function (val) {
            var obj = {
                EnterpriseID: val
            };
            vm.namePassedExp = false;
            vm.noResultsExp = false;
            return dataservice.getResource(obj).then(function (data) {
                if (data.length != 0) {
                    return $.map(data, function (item) {
                        if (item.EnterpriseID == val) {
                            vm.namePassedExp = true;
                        }
                        return item.EnterpriseID;
                    });

                }
                else {
                    vm.noResultsExp = true;
                    vm.messageExp = constants.message.noResultsFound;
                    vm.namePassedExp = false;
                }
            }, function (error) {
                logger.error(constants.message.errorSavingData);
            });


        };
        //Check select Approver EID vaild or invalid 
        vm.selectNameExp = function () {
            vm.namePassedExp = true;
            vm.noResultsExp = false;
        };

        //Clear function
        vm.resetExp = function () {
            vm.msgroupExp = null;
            vm.expSettingP1 = null;
            vm.expSettingP2 = null;
            vm.expSettingP3 = null;
            vm.expSettingP4 = null;
            vm.expSettingPri = null;
            vm.expSettingSec = null;
            vm.expSettingApprover = null;
            vm.selectedExpCap = null;
            vm.selectedExpSG = null;
            $scope.ExperienceForm.$setPristine();

        };


        /*************************************Tab Tech/Cont/Cert****************************************/
        vm.getMSGroupPCC = function (capabilityid) {
            vm.isLoading = true;
            if (angular.isDefined(vm.currentPccCap) && vm.currentPccCap != capabilityid) {
                $scope.TechForm.$setPristine();
                vm.info.TechW = null;
                vm.info.ContW = null;
                vm.info.CertW = null;
                vm.info.ApprEnterpriseID = null;
                vm.SG = null;

            };
            if (angular.isDefined(capabilityid)) {
                vm.currentPccCap = capabilityid;

                return dataservice.getMSGroup(capabilityid).then(function (data) {
                    vm.msgroupPcc = data;
                    vm.isLoading = false;
                }, function (error) {
                    //$state.go('error');
                });
            } else {
                vm.msgroupPcc = null;
                vm.info.TechW = null;
                vm.info.ContW = null;
                vm.info.CertW = null;
                vm.info.ApprEnterpriseID = null;
                vm.SG = null;
                vm.isLoading = false;
                $scope.TechForm.$setPristine();
            }
        };

        //get level dropdownlist
        function getLevel() {
            if (angular.isDefined(vm.levels) == false) {
                vm.isLoading = true;
                return dataservice.getLevel().then(function (data) {
                    vm.levels = data;
                    vm.isLoading = false;
                }, function (error) {
                    $state.go('error');
                });
            }
        }
        //validition
        $scope.$watch('vm.info.TechW+vm.info.ContW+vm.info.CertW', function () {
            if ((Number(vm.info.TechW) >= 0 && Number(vm.info.TechW) <= 100) && (Number(vm.info.ContW) >= 0 && Number(vm.info.ContW) <= 100) && (Number(vm.info.CertW) >= 0 && Number(vm.info.CertW) <= 100) && ((Number(vm.info.TechW) + Number(vm.info.ContW) + Number(vm.info.CertW)) == 100)) {
                vm.validationResult = true;
                vm.PCCsum = Number(vm.info.TechW) + Number(vm.info.ContW) + Number(vm.info.CertW);
            } else {
                vm.validationResult = false;
                if (vm.info.TechW != null && vm.info.ContW != null && vm.info.CertW != null) {
                    vm.PCCsum = Number(vm.info.TechW) + Number(vm.info.ContW) + Number(vm.info.CertW);
                } else {
                    vm.PCCsum = 0
                }
            };
            if (angular.isDefined(vm.info.TechW) && vm.info.TechW != '' && vm.info.TechW != null) {
                vm.info.TechW = vm.info.TechW.toString().replace(/[^\d]/g, "");
                if (vm.info.TechW != '') {
                    vm.info.TechW = Number(vm.info.TechW)
                }
            };
            if (angular.isDefined(vm.info.ContW) && vm.info.ContW != '' && vm.info.ContW != null) {
                vm.info.ContW = vm.info.ContW.toString().replace(/[^\d]/g, "");
                if (vm.info.ContW != '') {
                    vm.info.ContW = Number(vm.info.ContW)
                }
            };
            if (angular.isDefined(vm.info.CertW) && vm.info.CertW != '' && vm.info.CertW != null) {
                vm.info.CertW = vm.info.CertW.toString().replace(/[^\d]/g, "");
                if (vm.info.CertW != '') {
                    vm.info.CertW = Number(vm.info.CertW)
                }
            };
        });
        //validition
        $scope.$watch('vm.LeadershipTechnical+vm.LeadershipContributions+vm.LeadershipCertification', function () {
            if ((Number(vm.LeadershipTechnical) >= 0 && Number(vm.LeadershipTechnical) <= 100) && (Number(vm.LeadershipContributions) >= 0 && Number(vm.LeadershipContributions) <= 100) && (Number(vm.LeadershipCertification) >= 0 && Number(vm.LeadershipCertification) < 100) && (Number(vm.LeadershipTechnical) + Number(vm.LeadershipContributions) + Number(vm.LeadershipCertification) == 100)) {
                vm.validationResultleader = true;
            } else {
                vm.validationResultleader = false;
            };
        });
        $scope.$watch('vm.L5Technical+vm.L5Contributions+vm.L5Certification', function () {
            if ((Number(vm.L5Technical) + Number(vm.L5Contributions) + Number(vm.L5Certification) == 100)) {
                vm.validationResult5 = true;
            } else {
                vm.validationResult5 = false;
            };
        });
        $scope.$watch('vm.L6Technical+vm.L6Contributions+vm.L6Certification', function () {
            if ((Number(vm.L6Technical) + Number(vm.L6Contributions) + Number(vm.L6Certification) == 100)) {
                vm.validationResult6 = true;
            } else {
                vm.validationResult6 = false;
            };
        });
        $scope.$watch('vm.L7Technical+vm.L7Contributions+vm.L7Certification', function () {
            if ((Number(vm.L7Technical) + Number(vm.L7Contributions) + Number(vm.L7Certification) == 100)) {
                vm.validationResult7 = true;
            } else {
                vm.validationResult7 = false;
            };
        });
        $scope.$watch('vm.L8Technical+vm.L8Contributions+vm.L8Certification', function () {
            if ((Number(vm.L8Technical) + Number(vm.L8Contributions) + Number(vm.L8Certification) == 100)) {
                vm.validationResult8 = true;
            } else {
                vm.validationResult8 = false;
            };
        });
        $scope.$watch('vm.L9Technical+vm.L9Contributions+vm.L9Certification', function () {
            if ((Number(vm.L9Technical) + Number(vm.L9Contributions) + Number(vm.L9Certification) == 100)) {
                vm.validationResult9 = true;
            } else {
                vm.validationResult9 = false;
            };
        });
        $scope.$watch('vm.L10Technical+vm.L10Contributions+vm.L10Certification', function () {
            if ((Number(vm.L10Technical) + Number(vm.L10Contributions) + Number(vm.L10Certification) == 100)) {
                vm.validationResult10 = true;
            } else {
                vm.validationResult10 = false;
            };
        });
        $scope.$watch('vm.L11Technical+vm.L11Contributions+vm.L11Certification', function () {
            if ((Number(vm.L11Technical) + Number(vm.L11Contributions) + Number(vm.L11Certification) == 100)) {
                vm.validationResult11 = true;
            } else {
                vm.validationResult11 = false;
            };
        });
        $scope.$watch('vm.L12Technical+vm.L12Contributions+vm.L12Certification', function () {
            if ((Number(vm.L12Technical) + Number(vm.L12Contributions) + Number(vm.L12Certification) == 100)) {
                vm.validationResult12 = true;
            } else {
                vm.validationResult12 = false;
            };
        });
        $scope.$watch('vm.L13Technical+vm.L13Contributions+vm.L13Certification', function () {
            if ((Number(vm.L13Technical) + Number(vm.L13Contributions) + Number(vm.L13Certification) == 100)) {
                vm.validationResult13 = true;
            } else {
                vm.validationResult13 = false;
            };
        });
        //save function
        vm.info = {};
        vm.SG = {};

        var sum = 0;
        vm.result = true;
        vm.Save = function (SGCapMsID) {
            vm.info.SGCapMsID = SGCapMsID;
            vm.info.P1 = vm.totalSettingP1;
            vm.info.P2 = vm.totalSettingP2;
            vm.info.P3 = vm.totalSettingP3;
            vm.info.P4 = vm.totalSettingP4;
            vm.info.P1Month = vm.expSettingP1;
            vm.info.P2Month = vm.expSettingP2;
            vm.info.P3Month = vm.expSettingP3;
            vm.info.P4Month = vm.expSettingP4;
            vm.info.PrimarySkill = vm.expSettingPri;
            vm.info.SecondarySkill = vm.expSettingSec;
            vm.info.WeightList = [{ CareerLevelId: vm.LeadershipCareerLevelId, Technical: vm.LeadershipTechnical, Contributions: vm.LeadershipContributions, Certification: vm.LeadershipCertification },
                                   { CareerLevelId: vm.L5CareerLevelId, Technical: vm.L5Technical, Contributions: vm.L5Contributions, Certification: vm.L5Certification },
                                   { CareerLevelId: vm.L6CareerLevelId, Technical: vm.L6Technical, Contributions: vm.L6Contributions, Certification: vm.L6Certification },
                                   { CareerLevelId: vm.L7CareerLevelId, Technical: vm.L7Technical, Contributions: vm.L7Contributions, Certification: vm.L7Certification },
                                   { CareerLevelId: vm.L8CareerLevelId, Technical: vm.L8Technical, Contributions: vm.L8Contributions, Certification: vm.L8Certification },
                                   { CareerLevelId: vm.L9CareerLevelId, Technical: vm.L9Technical, Contributions: vm.L9Contributions, Certification: vm.L9Certification },
                                   { CareerLevelId: vm.L10CareerLevelId, Technical: vm.L10Technical, Contributions: vm.L10Contributions, Certification: vm.L10Certification },
                                   { CareerLevelId: vm.L11CareerLevelId, Technical: vm.L11Technical, Contributions: vm.L11Contributions, Certification: vm.L11Certification },
                                   { CareerLevelId: vm.L12CareerLevelId, Technical: vm.L12Technical, Contributions: vm.L12Contributions, Certification: vm.L12Certification },
                                   { CareerLevelId: vm.L13CareerLevelId, Technical: vm.L13Technical, Contributions: vm.L13Contributions, Certification: vm.L13Certification },
            ];
            var str = JSON.stringify(vm.info);
            return dataservice.allcongif(str).then(function (data) {
                bootbox.alert("Save successfully.");
            }, function (error) {
                $state.go('error');
            });
        }
        vm.SaveproCalWeight = function (TechW, ContW, CertW) {
            sum = Number(TechW) + Number(ContW) + Number(CertW);
            if (sum == 100) {
                vm.info.selectedSG2 = vm.selectedSG.SGCapMsID;
                vm.info.selectedlevel = vm.level.LevelID;
                vm.info.currentuser = vm.peoplekey;
                vm.isLoading = true;
                dataservice.SavePCC(vm.info).then(function (data) {
                    logger.success(constants.message.successSavingData);
                    vm.isLoading = false;
                    $scope.TotalForm.$setPristine();
                }, function (error) {
                    if (error.Message == "Invalid EID") {
                        //logger.error(constants.message.invalidApprover);
                        vm.namePassedPCC = false;
                    } else {
                        logger.error(constants.message.errorSavingData);
                    }
                    vm.isLoading = false;
                });
                //$scope.TotalForm.$setPristine();
            }
            else {
                vm.result = false;
            };
            //$scope.TechForm.$setPristine();
        };

        //get function
        vm.GetPCCData = function (levelid, mappid) {
            if (angular.isDefined(levelid) && angular.isDefined(mappid)) {
                //vm.disabletext = false;
                vm.isLoading = true;
                vm.noResultsPCC = false;
                return dataservice.GetPCCData(levelid, mappid).then(function (data) {
                    vm.info.TechW = data.TechWeightage;
                    vm.info.ContW = data.ConWeightage;
                    vm.info.CertW = data.CerWeightage;
                    vm.info.ApprEnterpriseID = vm.enterprise;
                    vm.isLoading = false;
                    $scope.TechForm.$setPristine();
                }, function (error) {
                    logger.error(constants.message.errorLoadingData);
                    vm.isLoading = false;
                }).then(function () {
                    if (vm.info.ApprEnterpriseID != '' && angular.isDefined(vm.info.ApprEnterpriseID)) {
                        dataservice.checkResource(vm.info.ApprEnterpriseID).then(function (data) {
                            if (data.exists == true) {
                                vm.namePassedPCC = true;
                                vm.noResultsPCC = false;
                            } else {
                                vm.noResultsPCC = true;
                                vm.namePassedPCC = false;
                                vm.messagePCC = constants.message.approverNotActive;
                            }
                            vm.isLoading = false;
                        }, function (error) {
                            logger.error(constants.message.errorLoadingData);
                            vm.isLoading = false;
                        });
                    } else {
                        vm.isLoading = false;
                    }
                });
            } else {
                if (!angular.isDefined(levelid) && angular.isDefined(mappid)) {
                    vm.info.TechW = null;
                    vm.info.ContW = null;
                    vm.info.CertW = null;
                    vm.info.ApprEnterpriseID = null;
                    vm.isLoading = false;
                    $scope.TechForm.$setPristine();
                }
                else if (!angular.isDefined(mappid) && angular.isDefined(levelid)) {
                    vm.info.TechW = null;
                    vm.info.ContW = null;
                    vm.info.CertW = null;
                    vm.info.ApprEnterpriseID = null;
                    vm.isLoading = false;
                    $scope.TechForm.$setPristine();
                };
            };
        };

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


        //clear button
        vm.clear = function () {
            vm.tablevalidation = false;
            vm.totalSettingP1 = null;
            vm.totalSettingP2 = null;
            vm.totalSettingP3 = null;
            vm.totalSettingP4 = null;
            $scope.TotalForm.$setPristine();
            vm.expSettingP1 = null;
            vm.expSettingP2 = null;
            vm.expSettingP3 = null;
            vm.expSettingP4 = null;
            vm.expSettingPri = null;
            vm.expSettingSec = null;
            vm.selectedCap = null;
            vm.selectedSG = null;
            $scope.ExperienceForm.$setPristine();
            $scope.TableForm.$setPristine();
            vm.LeadershipTechnical = null;
            vm.LeadershipContributions = null;
            vm.LeadershipCertification = null;
            vm.LeadershipCareerLevelId = null;
            vm.L5Technical = null;
            vm.L5Contributions = null;
            vm.L5Certification = null;
            vm.L5CareerLevelId = null;
            vm.L6Technical = null;
            vm.L6Contributions = null;
            vm.L6Certification = null;
            vm.L6CareerLevelId = null;
            vm.L7Technical = null;
            vm.L7Contributions = null;
            vm.L7Certification = null;
            vm.L7CareerLevelId = null;
            vm.L8Technical = null;
            vm.L8Contributions = null;
            vm.L8Certification = null;
            vm.L8CareerLevelId = null;
            vm.L9Technical = null;
            vm.L9Contributions = null;
            vm.L9Certification = null;
            vm.L9CareerLevelId = null;
            vm.L10Technical = null;
            vm.L10Contributions = null;
            vm.L10Certification = null;
            vm.L10CareerLevelId = null;
            vm.L11Technical = null;
            vm.L11Contributions = null;
            vm.L11Certification = null;
            vm.L11CareerLevelId = null;
            vm.L12Technical = null;
            vm.L12Contributions = null;
            vm.L12Certification = null;
            vm.L12CareerLevelId = null;
            vm.L13Technical = null;
            vm.L13Contributions = null;
            vm.L13Certification = null;
            vm.L13CareerLevelId = null;
        };
        vm.clickT = true;
        vm.click = function () {
            vm.clickT = true;
            vm.clickF = false;
            vm.clickTx = false;
            vm.clickFx = true;
            vm.clickTxe = false;
            vm.clickFxe = true;
        }
        vm.clickx = function () {
            vm.clickT = false;
            vm.clickF = true;
            vm.clickTx = true;
            vm.clickFx = false;
            vm.clickTxe = false;
            vm.clickFxe = true;
        }
        vm.clickxe = function () {
            vm.clickT = false;
            vm.clickF = true;
            vm.clickTx = false;
            vm.clickFx = false;
            vm.clickTxe = true;
            vm.clickFxe = false;

        }

    };

})();
