'use strict';

//#region Constants
// Constant definition
app.constant('app.constants', {

    /// Declare all global constants needed by application.

    global: {
        enterpriseId: ENTERPRISE_ID, // ADFS
        peopleKey: PEOPLE_KEY, // ADFS
        displayName: DISPLAY_NAME, // ADFS
        firstName: FirstName, // ADFS
        lastName: LastName, // ADFS
        baseURL: BASE_URL,
        grantType: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        apiSvcId: API_IDENTIFIER,
        tokenUrl: TOKEN_URL,
        tokenInterval: 3000000
    },
    message: {
        errorLoadingData: 'Something went wrong while loading data. Please try again later.',
        noMultiskill: 'You are not part of multi-skill program...',
        noResultsFound: 'No Results Found',
        approverNotActive: 'Approver is not active in system.',
        errorSavingData: 'Something went wrong while saving data. Please try again later.',
        successSavingData: 'The configuration has been set successfully.',
        invalidApprover: 'Approver Enterprise ID is invalid.',
        errorproficiency: 'You cannot view Proficiency & Technical Score as view  window is closed.',
        noPermission: 'You do not have permission to access this page.',
        SavingDataOK: 'Data has been saved successfully.',
        Rolespecialization: "This role specialization is already existed for this capability, cannot add again.",
        Rolespecializationupdate: "This role specialization is already existed for this capability, cannot add again.",
        coreSkillExist: "The skill is already a core skill for this capability ,cannot add again.",
        mandatorySkillExist: "The skill is already a mandatory skill for this role specialization ,cannot add again.",
        electiveSkillExist: "The skill is already an elective skill for this role specialization ,cannot add again."
    }
});
//#endregion

    angular
        .module('app.core').run(['$rootScope', 'app.constants', function ($rootScope, constants) {
    $rootScope.constants = constants;
}]);