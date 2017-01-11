(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'logger', 'app.constants','$state'];
    /* @ngInject */
    function dataservice($http, $q, logger, constants, $state) {
        var service = {
            getPeopleMSData: getPeopleMSData,
            getCurrentSkill: getCurrentSkill,
            getProcessStatus: getProcessStatus,
            startProcess: startProcess,
            getKey: getKey,
            updateKey: updateKey,
            getCapability: getCapability,
            getMSGroup: getMSGroup,
            getTotalSetting: getTotalSetting,
            updateTotalSetting: updateTotalSetting,
            getExpSetting: getExpSetting,
            updateExpSetting: updateExpSetting,
            getLevel: getLevel,
            SavePCC: SavePCC,
            GetPCCData: GetPCCData,
            getResource: getResource,
            checkResource: checkResource,
            getPeopleMSSkillData: getPeopleMSSkillData,
            getCurrentpeopleSkillpage: getCurrentpeopleSkillpage,
            getCapleaderViewSkills: getCapleaderViewSkills,
            postQuerySkillList: postQuerySkillList,
            postQueryALLSkillList: postQueryALLSkillList,
            GetMultiSkillRoleList: GetMultiSkillRoleList,
            postMultiSkillUserList: postMultiSkillUserList,
            GetSingleScoreProficiency: GetSingleScoreProficiency,
            postDownloadScore: postDownloadScore,
            weightconfig: weightconfig,
            allcongif: allcongif,
            SpecializationAdd: SpecializationAdd,
            SpecializationDetele: SpecializationDetele,
            SpecializationRename: SpecializationRename,
            GetRoleSpeciallization: GetRoleSpeciallization,
            getSkillByType: getSkillByType,
            GetTierList: GetTierList,
            GetAllCapabilityList: GetAllCapabilityList,
            GetSpecialtyList: GetSpecialtyList,
            GetSkillList: GetSkillList,
            GetCapBySpeList: GetCapBySpeList,
            GetSpeAndCapList: GetSpeAndCapList,
            GetCapListByFilter: GetCapListByFilter,
            GetSpeListByFilter: GetSpeListByFilter,
            GetSkillListByFilter: GetSkillListByFilter,
            GetSkillStatusInCapability: GetSkillStatusInCapability,
            GetSkillStatusInRole: GetSkillStatusInRole,
            AddCoreSkill: AddCoreSkill,
            DeleteCoreSkill: DeleteCoreSkill,
            AddMESkill: AddMESkill,
            DeleteMESkill: DeleteMESkill
        };

        return service;

        function getPeopleMSData(peoplekey) {

            //This consumes a api servic hosted through node JS server...so will work only if you are running under NodeJS.
            //var baseUrl = constants.employees.getPeopleMSData,
            //    serviceUrl = methods.urlFormat(baseUrl, peoplekey);
            var serviceUrl = BASE_URL + 'GetResSkillGroupCap' + '?PeopleKey=' + peoplekey + '&SkillType=All';
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {

                return response.data;
            }
            function fail(error) {
                //logger.error(error.data);
                return $q.reject(error.data);
            }
        }

        function getCurrentSkill(peoplekey,masterID, flag, page) {

            //This consumes a api servic hosted through node JS server...so will work only if you are running under NodeJS.
            var serviceUrl = BASE_URL + 'GetSGCapMap' + '?PeopleKey=' + peoplekey + '&SGCapMsID=' + masterID + '&SkillType=' + flag + '&PageIndex=' + page;
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                //logger.error(error.data);
                return $q.reject(error.data);
            }
        }

        function getProcessStatus() {
            //This consumes a api servic hosted through node JS server...so will work only if you are running under NodeJS.
            var serviceUrl = BASE_URL + 'proficiency';
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }
        function startProcess(peoplekey, isAdmin) {
            //This consumes a api servic hosted through node JS server...so will work only if you are running under NodeJS.
            var serviceUrl = BASE_URL + 'proficiency';
            var mydata = { isAdmin: isAdmin, peoplekey: peoplekey };
            return $http.post(serviceUrl, mydata)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }
        //function getKey() {
        //    var serviceUrl = BASE_URL + 'proficiency/config';
        //    return $http.get(serviceUrl)
        //        .then(success)
        //        .catch(fail);
        //    function success(response) {
        //        return response.data;
        //    }
        //    function fail(error) {
        //        return $q.reject(error.data);
        //    }
        //}
        //function updateKey(peoplekey, isAdmin, value) {
        //    var serviceUrl = BASE_URL + 'proficiency/config';
        //    var mydata = { isAdmin: isAdmin, peoplekey: peoplekey };
        //    var config = { Value: value, customUser: mydata };
        //    return $http.post(serviceUrl, config)
        //        .then(success)
        //        .catch(fail);
        //    function success(response) {
        //        return response.data;
        //    }
        //    function fail(error) {

        //        $state.go('error');
        //        return $q.reject(error.data);

        //    }
        //}
        function getKey(mydata) {
            var serviceUrl = BASE_URL + 'proficiency/QueryConfigValues';

            return $http.post(serviceUrl, mydata)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }
        function updateKey(peoplekey, isAdmin, configkey, value) {
            var serviceUrl = BASE_URL + 'proficiency/Updateconfiguration';
            var config = { isAdmin: isAdmin, peoplekey: peoplekey, Configkey: configkey, ConfigValue: value };
            return $http.post(serviceUrl, config)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {

                $state.go('error');
                return $q.reject(error.data);
            }
        }
        function getCapability() {

            //This consumes a api servic hosted through node JS server...so will work only if you are running under NodeJS.
            //var baseUrl = constants.employees.getPeopleMSData,
            //    serviceUrl = methods.urlFormat(baseUrl, peoplekey);
            var serviceUrl = BASE_URL + 'proficiencyCalcConfig';
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                //logger.error(error.data);
                return $q.reject(error.data);
            }
        }
        function getMSGroup(capabilityid) {

            //This consumes a api servic hosted through node JS server...so will work only if you are running under NodeJS.
            //var baseUrl = constants.employees.getPeopleMSData,
            //    serviceUrl = methods.urlFormat(baseUrl, peoplekey);
            var serviceUrl = BASE_URL + 'proficiencyCalcConfig/skillgroup?SkillID=' + capabilityid;
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                //logger.error(error.data);
                return $q.reject(error.data);
            }
        }
        function getTotalSetting(msgid) {

            //This consumes a api servic hosted through node JS server...so will work only if you are running under NodeJS.
            //var baseUrl = constants.employees.getPeopleMSData,
            //    serviceUrl = methods.urlFormat(baseUrl, peoplekey);
            var serviceUrl = BASE_URL + 'proficiencyCalcConfig/total?SGCapMsID=' + msgid;
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                //logger.error(error.data);
                return $q.reject(error.data);
            }
        }

        function updateTotalSetting(totalSetting) {

            //This consumes a api servic hosted through node JS server...so will work only if you are running under NodeJS.
            //var baseUrl = constants.employees.getPeopleMSData,
            //    serviceUrl = methods.urlFormat(baseUrl, peoplekey);
            var serviceUrl = BASE_URL + 'proficiencyCalcConfig/total';//BASE_URL + 'GetCapability' + '?PeopleKey=' + peoplekey;
            return $http.post(serviceUrl, totalSetting)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                //logger.error(error.data);
                return $q.reject(error.data);
            }
        }
        /****************************************Get Experience Setting*******************************************/
        function getExpSetting(msgid) {

            //This consumes a api servic hosted through node JS server...so will work only if you are running under NodeJS.

            var serviceUrl = BASE_URL + 'proficiencyCalcConfig/exp' + '?SGCapMsID=' + msgid;
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                //logger.error(error.data);
                return $q.reject(error.data);
            }
        }
        function updateExpSetting(expSetting) {

            //This consumes a api servic hosted through node JS server...so will work only if you are running under NodeJS.

            var serviceUrl = BASE_URL + 'proficiencyCalcConfig/exp';
            return $http.post(serviceUrl, expSetting)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                //logger.error(error.data);
                return $q.reject(error.data);
            }
        }


        /******************************************Tech/Cert/Count************************************************/
        function SavePCC(saveinfo) {
            var serviceUrl = BASE_URL + 'ProficiencyCalcConfig/techcertcont';
            var mydata = { MSGroupCapabilityMasterID: saveinfo.selectedSG2, CareerLevelID: saveinfo.selectedlevel, TechWeightage: saveinfo.TechW, ConWeightage: saveinfo.ContW, CerWeightage: saveinfo.CertW, ApproverEID: saveinfo.ApprEnterpriseID, PeopleKey: saveinfo.currentuser };
            return $http.post(serviceUrl, mydata)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                 return $q.reject(error.data);

            }
        }

        function getLevel() {

            //This consumes a api servic hosted through node JS server...so will work only if you are running under NodeJS.
            //var baseUrl = constants.employees.getPeopleMSData,
            //    serviceUrl = methods.urlFormat(baseUrl, peoplekey);
            var serviceUrl = BASE_URL + 'ProficiencyCalcConfig/level';
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                //logger.error(error.data);
                return $q.reject(error.data);
            }
        }
        function GetPCCData(levelid, mappid) {
            //
            var serviceUrl = BASE_URL + 'ProficiencyCalcConfig/techcertcont' + '?levelID=' + levelid + '&mappID=' + mappid;
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }

        function getResource(obj) {
            var serviceUrl = BASE_URL + 'resources?enterpriseID=' + obj.EnterpriseID;
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }       
        }

        function checkResource(EID) {
            var serviceUrl = BASE_URL + 'odata/resources?enterpriseID=' + EID;
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }

        function getPeopleMSSkillData(peoplekey) {
            var serviceUrl = BASE_URL + 'ProTechScore' + '?PeopleKey=' + peoplekey ;
            //var serviceUrl = "app/data/capability.json";
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                //logger.error(error.data);
                return $q.reject(error.data);
            }
        }        
        function getCurrentpeopleSkillpage(peoplekey, page) {
                var serviceUrl = BASE_URL + 'ProTechScore/PagedList' + '?startPageIndex=' + page + '&PeopleKey=' + peoplekey;
           // var serviceUrl = "app/data/msgroup.json";
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                //logger.error(error.data);
                return $q.reject(error.data);
            }
        }
        function getCapleaderViewSkills(parameter) {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills?ScenariosIdentify=' + parameter;
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                //logger.error(error.data);
                return $q.reject(error.data);
            }
        }

        function postQuerySkillList(capabilityid,roupid,type,page) {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/QuerySkillList';
            var mydata = { capabilityid: capabilityid, msgroupid: roupid, skilltype: type, pageindex: page };
            return $http.post(serviceUrl, mydata)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) { 

                $state.go('error');
                return $q.reject(error.data);

            }
        }
        function postQueryALLSkillList(capabilityid,roleid,type,page) {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/QuerySkillList';
            var mydata = { capabilityid: capabilityid, msgroupid: roleid, skilltype: type, pageindex: page };
            return $http.post(serviceUrl, mydata)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                $state.go('error');
                return $q.reject(error.data);

            }
        }

        function GetMultiSkillRoleList(capabilityid) {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/GetMultiSkillRoleList?capabilityID=' + capabilityid;
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                //logger.error(error.data);
                return $q.reject(error.data);
            }
        }

        function postMultiSkillUserList(capabilityid, roleid, user, page) {
           // url:localhost:44899/api/CapleaderViewSkills/GetCapLeadScoreProList    
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/GetCapLeadScoreProList';
            var mydata = { capabilityid: capabilityid, msgroupid: roleid, EnterpriseID: user, pageindex: page };
            return $http.post(serviceUrl, mydata)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                $state.go('error');
                return $q.reject(error.data);
            }
        }
        function GetSingleScoreProficiency(peopleKey, roleID)
        {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/GetSingleScoreProficiency?peopleKey=' + peopleKey + "&multiskillRoleID=" + roleID;
            return $http.get(serviceUrl)
                    .then(success)
                    .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }

        function postDownloadScore(capabilityID, groupID, pageIndex, enterpriseID) {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/CapLeadDownLoadEmployeeScore';
            var mydata = { capabilityid: capabilityID, MSGroupID: groupID, pageindex: pageIndex, EnterpriseID: enterpriseID };
            return $http.post(serviceUrl, mydata)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }
        

        function weightconfig(msgid) {
            var serviceUrl = BASE_URL + 'proficiencyCalcConfig/weightconfig' + '?SGCapMsID=' + msgid;
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                //logger.error(error.data);
                return $q.reject(error.data);
            }
        }
        
        function allcongif(obj) {
            //This consumes a api servic hosted through node JS server...so will work only if you are running under NodeJS.
            var serviceUrl = BASE_URL + 'proficiencyCalcConfig/allconfig';
            return $http.post(serviceUrl, obj)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }

        //Edit Skill
        function getSkillByType(obj) {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/getSkillByType';
            return $http.post(serviceUrl,obj)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }

        function GetAllCapabilityList() {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/GetAllCapabilityList';
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }

        function GetTierList() {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/GetTierList';
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }

        function GetSpecialtyList(CapId) {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/GetSpecialtyList' + '?CapId=' + CapId;
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }

        function GetSkillList(SpeId) {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/GetSkillList' + '?SpeId=' + SpeId;
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }

        function GetCapBySpeList(SpeId) {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/GetCapBySpeList' + '?SpeId=' + SpeId;
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }

        function GetSpeAndCapList(SkillId) {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/GetSpeAndCapList' + '?SkillId=' + SkillId;
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }

        function GetCapListByFilter(obj) {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/GetCapListByFilter' + '?capname=' + obj;
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }

        function GetSpeListByFilter(obj) {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/GetSpeListByFilter' + '?spename=' + obj;
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }

        function GetSkillListByFilter(obj) {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/GetSkillListByFilter' + '?skillname=' + obj;
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }

        function GetSkillStatusInCapability(obj) {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/GetSkillStatusInCapability';
            return $http.post(serviceUrl, obj)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }

        function GetSkillStatusInRole(obj) {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/GetSkillStatusInRole';
            return $http.post(serviceUrl, obj)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }

        function AddCoreSkill(obj) {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/AddCoreSkill';
            return $http.post(serviceUrl, obj)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }

        function DeleteCoreSkill(obj) {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/DeleteCoreSkill';
            return $http.post(serviceUrl, obj)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }

        function AddMESkill(obj) {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/AddMESkill';
            return $http.post(serviceUrl, obj)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }

        function DeleteMESkill(obj) {
            var serviceUrl = BASE_URL + 'CapleaderViewSkills/DeleteMESkill';
            return $http.post(serviceUrl, obj)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }

        //Role Specialization Management
        function SpecializationAdd(obj) {
            var serviceUrl = BASE_URL + 'RoleSpecializationMgmt/AddRoleSpeciallization';
            return $http.post(serviceUrl, obj)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                //logger.error(error.data);
                return $q.reject(error.data);
            }
        }
        function SpecializationDetele(obj) {
            var serviceUrl = BASE_URL + 'RoleSpecializationMgmt/DeleteRoleSpeciallization';
            return $http.post(serviceUrl, obj)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }
        function SpecializationRename(obj) {
            var serviceUrl = BASE_URL + 'RoleSpecializationMgmt/UpdateRoleSpeciallization';
            return $http.post(serviceUrl, obj)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                return $q.reject(error.data);
            }
        }
        
        function GetRoleSpeciallization(CapId) {
            var serviceUrl = BASE_URL + 'RoleSpecializationMgmt/GetRoleSpeciallization' + '?CapId=' + CapId;
            return $http.get(serviceUrl)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                //logger.error(error.data);
                return $q.reject(error.data);
            }
        }
    }
})();
