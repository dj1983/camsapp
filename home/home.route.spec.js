/* jshint -W117, -W030 */
describe('home routes', function () {
    describe('state', function () {
        var controller, $state, templateCachem, $rootScope;
        var view = 'app/home/home.html';

        beforeEach(module('app.home'));

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

        it('should map state home to url / ', function () {
            expect($state.href('home', {})).toEqual('/');
        });

        it('should map /home route to home View template', function () {
            expect($state.get('home').templateUrl).toEqual(view);
        });

        it('of home should work with $state.go', function () {
            $state.go('home');
            $rootScope.$apply();
            expect($state.is('home'));
        });
    });
});
