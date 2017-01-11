/* jshint -W117, -W030 */
describe('DashboardController', function () {
    var controller, log, httpBackend;

    beforeEach(module('app.dashboard'));

    beforeEach(inject(function ($rootScope, logger, $controller, $httpBackend) {
        $scope = $rootScope.$new();
        log = logger;
        controller = $controller('DashboardController',
            { '$rootScope': $rootScope, 'logger': logger, '$scope': $scope });
        httpBackend = $httpBackend;
        $httpBackend.whenGET('/api/People')
            .respond({});
        $httpBackend.expectGET('/api/People');
        $rootScope.$apply();
        
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
        
    });

    describe('Dashboard controller', function () {
        it('should be created successfully', function () {
            expect(controller).toBeDefined;
            httpBackend.flush();
        });

        describe('after activate', function () {
            it('should have title of Dashboard', function () {
                expect(controller.title).toEqual('Dashboard');
                httpBackend.flush();
            });
        });
    });
});
