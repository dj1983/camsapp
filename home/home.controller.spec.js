/* jshint -W117, -W030 */
describe('HomeController', function() {
    var controller, log, httpBackend;

    beforeEach(module('app.home'));

    beforeEach(inject(function ($rootScope, logger, $controller, $httpBackend) {
        log = logger;
        controller = $controller('HomeController',
            {'$rootScope': $rootScope, 'logger': logger, '$scope': $scope});
        $rootScope.$apply();
        httpBackend = $httpBackend;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('Home controller', function() {
        it('should be created successfully', function () {
            expect(controller).toBeDefined;
        });

        describe('after activate', function() {
            it('should have title of Home', function() {
                expect(controller.title).toEqual('Home');
            });
        });
    });
});
