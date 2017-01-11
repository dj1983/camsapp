/* jshint -W117, -W030 */
describe('dashboard routes', function () {
    describe('state', function () {
        var controller, $state, templateCachem, $rootScope;
        var view = 'app/dashboard/dashboard.html';

        beforeEach(module('app.dashboard'));

        beforeEach(inject(function (_$rootScope_, _$state_,
            $templateCache, $httpBackend) {
            $state = _$state_;
            httpBackend = $httpBackend;
            templateCache = $templateCache;
            $rootScope = _$rootScope_;
        }));

        beforeEach(function () {
            templateCache.put(view, '');
        });

        afterEach(function () {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should map state dashboard to url /dashboard ', function () {
            expect($state.href('dashboard', {})).toEqual('/dashboard');
        });

        it('should map /dashboard route to dashboard View template', function () {
            expect($state.get('dashboard').templateUrl).toEqual(view);
        });

        it('of dashboard should work with $state.go', function () {
            $state.go('dashboard');
            $rootScope.$apply();
            expect($state.is('dashboard'));
        });
    });
});
