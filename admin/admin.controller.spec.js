/* jshint -W117, -W030 */
describe('AdminController', function() {
    var controller, log, httpBackend;

    beforeEach(module('app.admin'));

    beforeEach(inject(function ($rootScope, logger, $controller, $httpBackend) {
        $scope = $rootScope.$new();
        log = logger;
        controller = $controller('AdminController',
            {'$rootScope': $rootScope, 'logger': logger, '$scope': $scope});
        $rootScope.$apply();
        httpBackend = $httpBackend;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('Admin controller', function() {
        it('should be created successfully', function () {
            expect(controller).toBeDefined;
        });

        describe('after activate', function() {
            it('should have title of Admin', function() {
                expect(controller.title).toEqual('Admin');
            });
        });
    });
});
