/* jshint -W117, -W030 */
describe('admin routes', function () {
    describe('state', function () {
        var controller, $state, templateCachem, $rootScope;
        var view = 'app/admin/admin.html';

        beforeEach(module('app.admin'));

        beforeEach(inject(function (_$rootScope_, _$state_,
            $templateCache, $httpBackend) {
            $state = _$state_;
            httpBackend = $httpBackend;
            templateCache = $templateCache;
            $rootScope = _$rootScope_;
        }));

        beforeEach(function() {
            templateCache.put(view, '');
        });

        afterEach(function () {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should map state admin to url /admin ', function() {
            expect($state.href('admin', {})).toEqual('/admin');
        });

        it('should map /admin route to admin View template', function () {
            expect($state.get('admin').templateUrl).toEqual(view);
        });

        it('of admin should work with $state.go', function () {
            $state.go('admin');
            $rootScope.$apply();
            expect($state.is('admin'));
        });
    });
});
