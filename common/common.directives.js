(function () {
    'use strict';


var directiveModule = angular.module('directiveModule', []);

directiveModule.directive("collapsedcard", ["$compile", function ($compile) {
    var directive = {};
    directive.restrict = 'E';
    directive.replace = 'true';
    directive.scope = {
        skilltype: '@',
        shortfor:'@',
        skills: '=',
        rolename: '=',
        currentskills: '=',
        currentpage: '=',
        itemperpage: '=',
        skillcount: '=',
        totalpage: '='
    };

    directive.link = function (scope, element, attrs) {
        var template = '\
            <div class="col-md-6">\
	            <div class="widget w1 card">\
		            <div ht-widget-header title="{{skilltype}} Skills ({{skillcount}})" showmore="addmore"></div>\
		            <div>\
			            <div class="widget-content cardtext-info" id="front{{skilltype}}Card" style="position:relative">\
				            <div ng-repeat="skill in skills | limitTo:4 ">\
					            <small>{{skill.SkillName}}</small>\
				            </div>\
				            <div class="card-footer" style="position:absolute;bottom:0px;right:10px">\
					            <a class="pull-right" style="font-style:italic;" href="#"  title="Click here to view all {{skilltype}} Skills" data-toggle="modal" data-target="#myModal{{skilltype}}" data-backdrop="true">See More</a>\
				            </div>\
			            </div>\
			            <div class="modal fade" id="myModal{{skilltype}}" role="dialog">\
				            <div id="modal{{skilltype}}" class="modal-dialog modal-sm">\
					            <div class="modal-content mymodalcontent">\
						            <div class="modal-header">\
							            <button type="button" class="close" data-dismiss="modal">&times;</button>\
							            <h4 class="modal-title">{{rolename}}</h4>\
						            </div>\
						            <div class="modal-body">\
							            <p class="subheadingrotis">{{skilltype}} Skills ({{skillcount}})</p>\
                                        <div ng-repeat="skill in currentskills">\
                                            <ul>\
                                            <li><small>{{skill.SkillName}}</small></li>\
                                            </ul>\
                                        </div>\
                                        <div ng-show="skillcount==0">\
                                            <span>No {{skilltype}} Skill.</span>\
                                        </div><div class="pageinfo">{{currentpage}}  /  {{totalpage}}</div>\
                                        <div class="mypagination pagerinfo" >\
                                            <pagination ng-model="currentpage"\
                                            total-items="skillcount"\
                                            max-size="0"\
                                            previous-text="<<"\
                                            next-text=">>"\
                                            boundary-links="false"\
                                            items-per-page="itemperpage">\
                                            </pagination>\
                                        </div>\
						            </div>\
					            </div>\
				            </div>\
			            </div>\
		            </div>\
	            </div>\
            </div>'
        ;

        element.html(template);
        $compile(element.contents())(scope);
        
    }
    return directive;
}]);

directiveModule.directive('ngFocus', [function() {
    var FOCUS_CLASS = "ng-focused";
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$focused = false;
            element.bind('focus', function(evt) {
                element.addClass(FOCUS_CLASS);
                scope.$apply(function() {
                    ctrl.$focused = true;
                });
            }).bind('blur', function(evt) {
                element.removeClass(FOCUS_CLASS);
                scope.$apply(function () {
                    ctrl.$focused = false;
                });
            });
        }
    }
}]);

directiveModule.directive('imageRouteHandler', function () {
    /// <summary>
    /// Manage Accenture image route.
    /// </summary>
    /// <doc>MultiSkill.directives:image-route-handler</doc>

    return {
        restrict: 'A',
        replace: false,
        link: function (scope, elem, attr) {
            /// <summary>
            /// Manage Image functionality. Link function
            /// </summary>
            /// <param name="scope">Scope object.</param>
            /// <param name="elem">Elem</param>
            /// <param name="attr">Attributes.</param>            
            /// <doc>MultiSkill.directives:image-route-handler#link</doc>

            scope.$watch(attr.ref, function () {
                var src = "Content/Images/no-user.jpg",
                    pictureUrl = "https://collabhub.accenture.com/People/ProfilePicture/" + attr.ref;

                if ((pictureUrl !== undefined) && (pictureUrl !== '')) {
                    src = 'ImageRouteHandler.ashx?URL=' + encodeURIComponent(pictureUrl);
                    // set image source
                    elem.attr('src', src);
                }
            }, true);
        }
    };
});

directiveModule.directive('acnSupportBrowser', ['$window', function ($window) {
    /// <summary>
    /// Validate browser and redirect user if browser is not supported.
    /// </summary>
    /// <doc>FeedbackJournal.directives:acn-support-browser</doc>

    return {
        restrict: 'A',
        replace: false,
        link: function (scope, element, attr) {
            /// <summary>
            /// Redirect user if the browser is not supported.
            /// </summary>
            /// <param name="scope">Scope object.</param>
            /// <param name="element">Element</param>
            /// <param name="attr">Attributes.</param>     
            /// <doc>FeedbackJournal.directives:acn-support-browser#link</doc>

            $(element).hide();

            var browser = {
                init: function () {
                    this.browser = this.searchString(this.dataBrowser) || "Other";
                    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
                },
                searchString: function (data) {
                    var i, dataString;
                    for (i = 0 ; i < data.length ; i++) {
                        dataString = data[i].string;
                        this.versionSearchString = data[i].subString;

                        if (dataString.indexOf(data[i].subString) !== -1) {
                            return data[i].identity;
                        }
                    }
                },
                searchVersion: function (dataString) {
                    var index = dataString.indexOf(this.versionSearchString);
                    if (index === -1) { return; }
                    return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
                },
                dataBrowser:
                [
                    { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
                    { string: navigator.userAgent, subString: "MSIE", identity: "Explorer" },
                    { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
                    { string: navigator.userAgent, subString: "Safari", identity: "Safari" },
                    { string: navigator.userAgent, subString: "Opera", identity: "Opera" }
                ]
            };
            browser.init();

            // Check IE version
            if ((browser.browser === 'Explorer') && ((browser.version < 9) || (document.documentMode < 9))) {
                $window.location.href = "app/views/browser_not_supported.html";
            }

            $(element).show();
        }
    };
}]);

directiveModule.directive('acnLoader', function () {
    /// <summary>
    /// loader.
    /// </summary>
    /// <doc>CompetencyAssessment.directives:acnLoader</doc>

    return {
        restrict: 'A',
        replace: false,
        link: function (scope, element, attrs) {
            /// <summary>
            /// Manage tooltip functionality.
            /// </summary>
            /// <param name="scope">Scope object.</param>
            /// <param name="elem">Elem</param>
            /// <param name="attr">Attributes.</param>            
            /// <doc>CompetencyAssessment.directives:acnLoader#link</doc>

            function AjaxLoader(el, options) {
                // Becomes this.options
                var defaults = {
                    bgColor: 'rgba(255,255,255,0.2)',
                    opacity: 1
                },
                    loader = {};

                loader.options = jQuery.extend(defaults, options);
                loader.container = $(el);

                loader.init = function () {
                    // Delete any other loaders
                    loader.remove();

                    var container = loader.container,
                        // Create the overlay 
                        overlay = $('<div></div>').css({
                            'background-color': loader.options.bgColor,
                            'opacity': loader.options.opacity,
                            'width': container.width(),
                            'height': 620,//container.height()
                            'position': 'absolute',
                            'top': 230,
                            'left':0,
                            'z-index': 99998,
                        }).addClass('ajax_overlay');

                    // insert overlay and loader into DOM 
                    container.append(
                        overlay.append(
                            $('<i style="font-size: 60px; position:relative; left:470px;top:240px;"></i>').addClass('fa fa-spinner fa-spin')
                        ));
                };

                loader.remove = function () {
                    var overlay = loader.container.children(".ajax_overlay");
                    if (overlay.length) {
                        overlay.fadeOut(loader.options.classOveride, function () {
                            overlay.remove();
                        });
                    }
                };

                loader.init();

                return loader;
            }

            var myLoader = null;

            scope.$watch(attrs.acnLoader, function (value) {
                if (value === true) {
                    myLoader = new AjaxLoader($(element));
                }
                else if (value === false) {
                    if (myLoader !== null) { myLoader.remove(); }
                }
            });
        }
    };
});

directiveModule.directive('moduleLoader', function () {
    /// <summary>
    /// loader.
    /// </summary>
    /// <doc>CompetencyAssessment.directives:moduleLoader</doc>

    return {
        restrict: 'A',
        replace: false,
        link: function (scope, element, attrs) {
            /// <summary>
            /// Manage tooltip functionality.
            /// </summary>
            /// <param name="scope">Scope object.</param>
            /// <param name="elem">Elem</param>
            /// <param name="attr">Attributes.</param>            
            /// <doc>CompetencyAssessment.directives:moduleLoader#link</doc>

            function AjaxLoader(el, options) {
                // Becomes this.options
                var defaults = {
                    bgColor: 'rgba(255,255,255,0.2)',
                    opacity: 1
                },
                    loader = {};

                loader.options = jQuery.extend(defaults, options);
                loader.container = $(el);

                loader.init = function () {
                    // Delete any other loaders
                    loader.remove();

                    var container = loader.container,
                        // Create the overlay 
                        overlay = $('<div></div>').css({
                            'opacity': 0.9,
                            'position': 'absolute',
                            'top': '40%',
                            'left': '47%',
                            'z-index': 99998,
                        

                        }).addClass('ajax_overlay');

                    // insert overlay and loader into DOM 
                    container.append(
                        overlay.append(
                            $('<i style="color:black;font-size: 60px; position:relative; left:0px;top:0px;"></i>').addClass('fa fa-spinner fa-spin')
                        ));
                };

                loader.remove = function () {
                    var overlay = loader.container.children(".ajax_overlay");
                    if (overlay.length) {
                        overlay.fadeOut(loader.options.classOveride, function () {
                            overlay.remove();
                        });
                    }
                };

                loader.init();

                return loader;
            }

            var myLoader = null;

            scope.$watch(attrs.moduleLoader, function (value) {
                if (value === true) {
                    myLoader = new AjaxLoader($(element));
                }
                else if (value === false) {
                    if (myLoader !== null) { myLoader.remove(); }
                }
            });
        }
    };
});
    
})();