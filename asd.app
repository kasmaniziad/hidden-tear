var app = angular.module('woqod', ['app.directives', 'infinite-scroll', 'ui.bootstrap', 'ngTable', 'oitozero.ngSweetAlert', 'oc.lazyLoad', 'ui.router', 'pascalprecht.translate', 'ngIdle', 'autocomplete', 'autocompletecontract', 'autocompleteuser', 'angularMoment', 'ngCookies', 'ngResource', 'filtercontrol', 'ngSanitize', 'ngCsv', 'angular.filter', 'ui.select2', 'cfp.hotkeys'])
app.constant('baseUrl', 'http://localhost:49417/')
//app.constant('baseUrl', 'http://woqv-webdev.woqod.com/TestLDO/')
//app.constant('baseUrl', 'http://intranet.woqod.com/ldo/')

//app.constant('apiUrl', 'http://intranet.woqod.com/ldoapi/api/')
//app.constant('apiUrl', 'http://woqv-webdev.woqod.com/LDOAPI/api/')
//app.constant('apiUrl', 'http://woqv-webdev.woqod.com/TESTLDOAPI/api/')
app.constant('apiUrl', 'http://localhost:59908/api/')

app.directive('icheck', icheck);
app.config(function (datepickerConfig) {
    datepickerConfig.showWeeks = false;
});

if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}

app.filter('jsonDate', ['$filter', function ($filter) {
    return function (input, format) {
        try {
            return (input) ? $filter('date')(parseInt(input.substr(6)), format) : '';
        } catch (e) {
            return input;
        }
    };
}]);

app.config(function ($stateProvider, $controllerProvider) {
    app._controller = app.controller
    app.controller = function (name, constructor) {
        $controllerProvider.register(name, constructor);
        return (this);
    }
});

//app.config(function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
//    app.register = {
//        controller: $controllerProvider.register,
//        directive: $compileProvider.directive,
//        filter: $filterProvider.register,
//        factory: $provide.factory,
//        service: $provide.service
//    };
//});


//app.filter('sumByKey', function () {
//    return function (data, key) {
//        if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
//            return 0;
//        }

//        var sum = 0;
//        for (var i = data.length - 1; i >= 0; i--) {
//            sum += parseInt(data[i][key]);
//        }

//        return sum;
//    };
//});



//Sherin Start


//Sherin End

//app.run(function ($rootScope, $templateCache) {
//    $rootScope.$on('$routeChangeStart', function (event, next, current) {
//        if (typeof (current) !== 'undefined') {
//            $templateCache.remove(current.templateUrl);
//        }
//    });
//});
//app.run(function ($rootScope, $templateCache) {
//        $rootScope.$on('$viewContentLoaded', function () {
//            //$templateCache.removeAll();
//            //$templateCache.put('ng-table/filters/select-multiple.html', '<select ng-options="data.id as data.title for data in column.data" multiple ng-multiple="true" ng-model="params.filter()[name]" ng-show="filter==\'select-multiple\'" class="filter filter-select-multiple form-control" name="{{column.filterName}}"> </select>');
//            //$templateCache.put('ng-table/filters/select.html', '<select ng-options="data.id as data.title for data in column.data" ng-model="params.filter()[name]" ng-show="filter==\'select\'" class="filter filter-select form-control" name="{{column.filterName}}"> </select>');
//            //$templateCache.put('ng-table/filters/text.html', '<input type="text" name="{{column.filterName}}" ng-model="params.filter()[name]" ng-if="filter==\'text\'" class="input-filter form-control"/>');
//            //$templateCache.put('ng-table/header.html', '<tr> <th ng-repeat="column in $columns" ng-class="{ \'sortable\': parse(column.sortable), \'sort-asc\': params.sorting()[parse(column.sortable)]==\'asc\', \'sort-desc\': params.sorting()[parse(column.sortable)]==\'desc\' }" ng-click="sortBy(column, $event)" ng-show="column.show(this)" ng-init="template=column.headerTemplateURL(this)" class="header {{column.class}}"> <div ng-if="!template" ng-show="!template" ng-bind="parse(column.title)"></div> <div ng-if="template" ng-show="template"><div ng-include="template"></div></div> </th> </tr> <tr ng-show="show_filter" class="ng-table-filters"> <th ng-repeat="column in $columns" ng-show="column.show(this)" class="filter"> <div ng-repeat="(name, filter) in column.filter"> <div ng-if="column.filterTemplateURL" ng-show="column.filterTemplateURL"> <div ng-include="column.filterTemplateURL"></div> </div> <div ng-if="!column.filterTemplateURL" ng-show="!column.filterTemplateURL"> <div ng-include="\'ng-table/filters/\' + filter + \'.html\'"></div> </div> </div> </th> </tr>');
//            //$templateCache.put('ng-table/pager.html', '<div class="ng-cloak ng-table-pager"> <div ng-if="params.settings().counts.length" class="ng-table-counts btn-group pull-right"> <button ng-repeat="count in params.settings().counts" type="button" ng-class="{\'active\':params.count()==count}" ng-click="params.count(count)" class="btn btn-default"> <span ng-bind="count"></span> </button> </div> <ul class="pagination ng-table-pagination"> <li ng-class="{\'disabled\': !page.active}" ng-repeat="page in pages" ng-switch="page.type"> <a ng-switch-when="prev" ng-click="params.page(page.number)" href="">&laquo;</a> <a ng-switch-when="first" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="page" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="more" ng-click="params.page(page.number)" href="">&#8230;</a> <a ng-switch-when="last" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="next" ng-click="params.page(page.number)" href="">&raquo;</a> </li> </ul> </div> ');
//        });
//    });

//angular.module("ngTable").service(
//    "$InterpolateUpdateService", function ($templateCache, $interpolate) {
//        'use strict';

//        this.changeGridInterpolate = function () {
//            var templates = [
//                'ng-table/filterRow.html',
//                'ng-table/filters/number.html',
//                'ng-table/filters/select-multiple.html',
//                'ng-table/filters/select.html',
//                'ng-table/filters/text.html',
//                'ng-table/groupRow.html',
//                'ng-table/header.html',
//                'ng-table/pager.html',
//                'ng-table/sorterRow.html'
//            ];

//            var start = $interpolate.startSymbol();
//            var end = $interpolate.endSymbol();

//            for (var i = 0; i < templates.length; i++) {
//                var template = templates[i];
//                var curTemplate = $templateCache.get(template);
//                if (start !== "{{") {
//                    curTemplate = curTemplate.replace(/\{\{/g, start);
//                }
//                if (end !== "}}") {
//                    curTemplate = curTemplate.replace(/\}\}/g, end);
//                }
//                $templateCache.put(template, curTemplate);
//            }
//        };
//    });

//angular.module('ngTable').run(function ($InterpolateUpdateService) {
//    'use strict';

//    $InterpolateUpdateService.changeGridInterpolate();
//});

//app.run(function ($rootScope, $templateCache) {
//    $rootScope.$on('$viewContentLoaded', function () {
//        //$templateCache.removeAll();
//        //$templateCache.put('ng-table/header.html', '<tr> <th ng-repeat="column in $columns" ng-class="{ \'sortable\': parse(column.sortable), \'sort-asc\': params.sorting()[parse(column.sortable)]==\'asc\', \'sort-desc\': params.sorting()[parse(column.sortable)]==\'desc\' }" ng-click="sortBy(column, $event)" ng-show="column.show(this)" ng-init="template=column.headerTemplateURL(this)" class="header {{column.class}}"> <div ng-if="!template" ng-show="!template" ng-bind="parse(column.title)"></div> <div ng-if="template" ng-show="template"><div ng-include="template"></div></div> </th> </tr> <tr ng-show="show_filter" class="ng-table-filters"> <th ng-repeat="column in $columns" ng-show="column.show(this)" class="filter"> <div ng-repeat="(name, filter) in column.filter"> <div ng-if="column.filterTemplateURL" ng-show="column.filterTemplateURL"> <div ng-include="column.filterTemplateURL"></div> </div> <div ng-if="!column.filterTemplateURL" ng-show="!column.filterTemplateURL"> <div ng-include="\'ng-table/filters/\' + filter + \'.html\'"></div> </div> </div> </th> </tr>');
//        //$templateCache.put('ng-table/pager.html', '<div class="ng-cloak ng-table-pager"> <div ng-if="params.settings().counts.length" class="ng-table-counts btn-group pull-right"> <button ng-repeat="count in params.settings().counts" type="button" ng-class="{\'active\':params.count()==count}" ng-click="params.count(count)" class="btn btn-default"> <span ng-bind="count"></span> </button> </div> <ul class="pagination ng-table-pagination"> <li ng-class="{\'disabled\': !page.active}" ng-repeat="page in pages" ng-switch="page.type"> <a ng-switch-when="prev" ng-click="params.page(page.number)" href="">&laquo;</a> <a ng-switch-when="first" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="page" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="more" ng-click="params.page(page.number)" href="">&#8230;</a> <a ng-switch-when="last" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="next" ng-click="params.page(page.number)" href="">&raquo;</a> </li> </ul> </div> ');
//    });
//});



app.service('anchorSmoothScroll', function () {

    this.scrollTo = function (eID) {

        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for (var i = startY; i < stopY; i += step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (var i = startY; i > stopY; i -= step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };

});

app.controller("navigationController", function ($scope, $http) {
    $scope.myMenuClick = function (value) {
        if (value == 'False') {
            var result = document.getElementsByClassName("myClass");
            for (var i = 0; i < result.length; i++) {
                result[i].className = 'myClass';
            }
            result = document.getElementsByClassName("nav-second-level");
            for (var i = 0; i < result.length; i++) {
                result[i].className = 'nav nav-second-level collapse';
            }

        }
    }
});

function icheck($timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function ($scope, element, $attrs, ngModel) {
            return $timeout(function () {
                var value;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function (newValue) {
                    $(element).iCheck('update');
                })

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green'

                }).on('ifChanged', function (event) {
                    if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                        $scope.$apply(function () {
                            return ngModel.$setViewValue(event.target.checked);
                        });
                    }
                    if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                        return $scope.$apply(function () {
                            return ngModel.$setViewValue(value);
                        });
                    }
                });
            });
        }
    };
}

app.controller("ModalInstanceCtrl", function ($scope, $modalInstance) {

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


});

app.controller("mapEditController", function ($scope, $http, $modal) {

    $scope.onInit = function () {
        //alert('abc')
    }

    $scope.addAddress = function (personId, parent) {

        var modalInstance = $modal.open({
            templateUrl: 'Addresses/Create?PersonId=' + personId + '&Parent=' + parent + '',
            controller: 'ModalInstanceCtrl'
        });
    };

});


//app.config(
//  ["$stateProvider", "$urlRouterProvider",
//    function ($stateProvider, $urlRouterProvider) {

//        $urlRouterProvider.otherwise("/home");

//        $stateProvider
//          .state("home", {
//              url: "/home",
//              templateUrl: "DMSIndex",
//              controller: "tmp1Controller"
//          })
//          .state("template2", {
//              url: "/template2",
//              templateUrl: "template2.html",
//              controller: "tmp2Controller"
//          });
//    }
//  ]);

var appdirectives = angular.module('app.directives', []);

appdirectives.factory('mySharedService', function ($rootScope) {
    var sharedService = {};

    sharedService.message = [];

    sharedService.prepForBroadcast = function (msg) {
        this.message = msg;
        this.broadcastItem();
    };

    sharedService.prepForClearBroadcast = function () {
        this.broadcastClear();
    };

    sharedService.broadcastItem = function () {
        $rootScope.$broadcast('handleBroadcast');
    };

    sharedService.broadcastClear = function () {
        $rootScope.$broadcast('clearBroadcast');
    };


    return sharedService;
});

appdirectives.directive('dropdownMultiselectUser', function (mySharedService) {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            options: '=',
            text: '=',
            preSelected: '=preSelected'
        },
        template: "<div class='btn-group' data-ng-class='{open : $parent.open}'>" +
         "<button type=button class='btn btn-small btn-white' data-ng-click='$parent.open=!$parent.open;openDropdown()' style='min-width:400px;text-align:left'>{{text}} <span class='caret pull-right' style='margin-top:8px;'></span></button>" +
                 "<ul class='dropdown-menu' aria-labelledby='dropdownMenu'>" +
                     "<li><a data-ng-click='selectAll()'><i class='fa fa-check'></i>  Select All</a></li>" +
                     "<li><a data-ng-click='deselectAll();'><i class='fa fa-refresh'></i>  Reset</a></li>" +
                     "<li class='divider'></li>" +
                     "<li data-ng-repeat='option in options'> <a data-ng-click='setSelectedItem()'>{{option.Description}}<span data-ng-class='isChecked(option.Id)'></span></a></li>" +
                 "</ul>" +
             "</div>",
        controller: function ($scope, $attrs, mySharedService) {

            $scope.$on('handleBroadcast', function (data) {
                $scope.text = '';
                $scope.model = [];

                angular.forEach(mySharedService.message, function (value, index) {
                    alert($scope.options.length);
                    angular.forEach($scope.options, function (opt, optIndex) {
                        alert(value);
                        if (value == opt.Id) {
                            if ($scope.text != '') {
                                $scope.text = $scope.text + ', ' + opt.Description;
                            }
                            else
                                $scope.text = opt.Description;

                            $scope.model.push(value);
                        }
                    });

                });

                if ($scope.text == '') {
                    $scope.text = 'Select';
                }

            });

            $scope.$on('clearBroadcast', function () {
                $scope.text = 'Select';
                $scope.model = [];
            });

            $scope.text = 'Select';
            $scope.openDropdown = function () {

                $scope.selected_items = [];
                for (var i = 0; i < $scope.preSelected.length; i++) {
                    $scope.selected_items.push($scope.preSelected[i].Id);
                }
            };

            $scope.selectAll = function () {
                $scope.model = _.pluck($scope.options, 'Id');
                console.log($scope.model);
                $scope.text = '';
                angular.forEach($scope.options, function (value, index) {
                    if ($scope.text != '') {
                        $scope.text = $scope.text + ', ' + value.Description;
                    }
                    else
                        $scope.text = value.Description;
                });

                $scope.$parent.open = !$scope.$parent.open;
            };
            $scope.deselectAll = function () {
                $scope.text = 'Select';
                $scope.model = [];
                console.log($scope.model);
            };
            $scope.setSelectedItem = function () {

                var id = this.option.Id;
                if (_.contains($scope.model, id)) {
                    $scope.model = _.without($scope.model, id);
                } else {
                    $scope.model.push(id);
                }
                console.log($scope.model);
                $scope.text = '';
                angular.forEach($scope.model, function (value, index) {
                    angular.forEach($scope.options, function (opt, optIndex) {
                        if (value == opt.Id) {
                            if ($scope.text != '') {
                                $scope.text = $scope.text + ', ' + opt.Description;
                            }
                            else
                                $scope.text = opt.Description;
                        }
                    });

                });

                if ($scope.text == '') {
                    $scope.text = 'Select';
                }



                return false;
            };

            $scope.isChecked = function (id) {

                if (_.contains($scope.model, id)) {
                    return 'fa fa-check pull-right mycheckright';
                }
                return false;
            };
        }
    }
});

appdirectives.directive('dropdownMultiselect', function (mySharedService) {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            options: '=',
            text: '=',
            preSelected: '=preSelected'
        },
        template: "<div class='btn-group' data-ng-class='{open : $parent.open}'>" +
         "<button type=button class='btn btn-small btn-white' data-ng-click='$parent.open=!$parent.open;openDropdown()' style='min-width:100px;text-align:left'>{{text}} <span class='caret pull-right' style='margin-top:8px;'></span></button>" +
                 "<ul class='dropdown-menu' aria-labelledby='dropdownMenu'>" +
                     "<li><a data-ng-click='selectAll()'><i class='fa fa-check'></i>  Select All</a></li>" +
                     "<li><a data-ng-click='deselectAll();'><i class='fa fa-refresh'></i>  Reset</a></li>" +
                     "<li class='divider'></li>" +
                     "<li data-ng-repeat='option in options'> <a data-ng-click='setSelectedItem()'>{{option.Description}}<span data-ng-class='isChecked(option.Id)'></span></a></li>" +
                 "</ul>" +
             "</div>",
        controller: function ($scope, $attrs, mySharedService) {

            $scope.$on('handleBroadcast', function (data) {
                $scope.text = '';
                $scope.model = [];

                angular.forEach(mySharedService.message, function (value, index) {
                    angular.forEach($scope.options, function (opt, optIndex) {
                        if (value == opt.Id) {
                            if ($scope.text != '') {
                                $scope.text = $scope.text + ', ' + opt.Description;
                            }
                            else
                                $scope.text = opt.Description;

                            $scope.model.push(value);
                        }
                    });

                });

                if ($scope.text == '') {
                    $scope.text = 'Select';
                }

            });

            $scope.$on('clearBroadcast', function () {
                $scope.text = 'Select';
                $scope.model = [];
            });

            $scope.text = 'Select';
            $scope.openDropdown = function () {

                $scope.selected_items = [];
                for (var i = 0; i < $scope.preSelected.length; i++) {
                    $scope.selected_items.push($scope.preSelected[i].Id);
                }
            };

            $scope.selectAll = function () {
                $scope.model = _.pluck($scope.options, 'Id');
                console.log($scope.model);
                $scope.text = '';
                angular.forEach($scope.options, function (value, index) {
                    if ($scope.text != '') {
                        $scope.text = $scope.text + ', ' + value.Description;
                    }
                    else
                        $scope.text = value.Description;
                });

                $scope.$parent.open = !$scope.$parent.open;
            };
            $scope.deselectAll = function () {
                $scope.text = 'Select';
                $scope.model = [];
                console.log($scope.model);
            };
            $scope.setSelectedItem = function () {

                var id = this.option.Id;
                if (_.contains($scope.model, id)) {
                    $scope.model = _.without($scope.model, id);
                } else {
                    $scope.model.push(id);
                }
                console.log($scope.model);
                $scope.text = '';
                angular.forEach($scope.model, function (value, index) {
                    angular.forEach($scope.options, function (opt, optIndex) {
                        if (value == opt.Id) {
                            if ($scope.text != '') {
                                $scope.text = $scope.text + ', ' + opt.Description;
                            }
                            else
                                $scope.text = opt.Description;
                        }
                    });

                });

                if ($scope.text == '') {
                    $scope.text = 'Select';
                }



                return false;
            };

            $scope.isChecked = function (id) {

                if (_.contains($scope.model, id)) {
                    return 'fa fa-check pull-right mycheckright';
                }
                return false;
            };
        }
    }
});

app.controller('main', function ($scope, $http) {

    $scope.onInit = function () {
        alert('started');
    }

});

app.config(['$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
    }]);



function dropZonePetrolStations(baseUrl) {
    return function (scope, element, attrs) {
        element.dropzone({
            url: baseUrl + "PSOrder/PSSupply/Upload",
            maxFilesize: 6144,
            paramName: "uploadfile",
            acceptedFiles: "image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation",
            maxThumbnailFilesize: 5,
            init: function () {
                scope.files.push({ file: 'added' });
                this.on('sending', function (file, xhr, formData) {
                    console.log(scope.formData);
                    formData.append('siteId', scope.formData.SiteId);
                    formData.append('folderPath', scope.formData.FolderPath);
                });
                this.on('success', function (file, json) {
                    scope.divAttachIsBusy = true;
                    scope.getResources();
                });
                this.on('addedfile', function (file) {
                    //scope.$apply(function () {
                    //    scope.files.push({ file: 'added' });
                    //});
                });
                this.on('drop', function (file) {
                });
            }
        });
    }
}


app.directive('dropZonePetrolStations', dropZonePetrolStations);

function dropZoneFleet(baseUrl) {
    return function (scope, element, attrs) {
        element.dropzone({
            url: baseUrl + "FleetServiceCenter/FleetService/UploadAllFiles",
            autoProcessQueue: false,
            //addRemoveLinks: true,
            uploadMultiple: true,
            parallelUploads: 10000,
            maxFilesize: 3.0,
            paramName: "uploadedfiles",
            acceptedFiles: "image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation",
            maxThumbnailFilesize: 5,
            init: function () {
                var myDropzone = this;
                scope.mynewdropzone = this;
                //document.getElementById('btnSave').addEventListener("click", function (e) {
                //    // Make sure that the form isn't actually being sent.
                //    //e.preventDefault();
                //    //e.stopPropagation();
                //    //myDropzone.processQueue();
                //});

                this.on("sendingmultiple", function (file, xhr, formData) {
                    formData.append('frId', scope.id);
                    formData.append('folderPath', scope.folderPath);
                    console.log(JSON.stringify(scope.lstResources));
                    formData.append('lstResources', JSON.stringify(scope.lstResources));
                });
                //scope.files.push({ file: 'added' });
                this.on('sending', function (file, xhr, formData) {
                    console.log(file);
                    scope.files.push(file);
                });
                this.on('success', function (file, json) {
                    scope.divIsBusy = false;
                    scope.gotoindex();
                    //scope.divAttachIsBusy = true;
                    //scope.getResources();
                });
                this.on('addedfile', function (file) {
                    scope.$apply(function () {
                        debugger;
                        scope.lstResources.push({ OriginalFileName: file.name, FileName: file.name, FileExtension: file.name.split('.').pop(), Remark : '' });
                        scope.files.push(file);
                    });
                });
                this.on('drop', function (file) {
                });
            }
        });
    }
}

app.directive('dropZoneFleet', dropZoneFleet);



function dropZoneDr(baseUrl) {
    return function (scope, element, attrs) {
        element.dropzone({
            url: baseUrl + "LDO_DMS/DR/SaveDR",
            autoProcessQueue: false,
            //addRemoveLinks: true,
            uploadMultiple: false,
            parallelUploads: 10000,
            maxFilesize: 3.0,
            maxFiles : 1,
            paramName: "uploadedfiles",
            acceptedFiles: "image/jpeg,image/png",
            maxThumbnailFilesize: 1,
            init: function () {
                var myDropzone = this;
                scope.mynewdropzone = this;
                this.on("sendingmultiple", function (file, xhr, formData) {
                    formData.append('orderId', scope.order.OrderId);
                    formData.append('orderNum', scope.order.OrderNum);
                    formData.append('remark', scope.order.Remark);
                });
                this.on('sending', function (file, xhr, formData) {
                    scope.order.ResourceId = '';
                    formData.append('orderInfo', JSON.stringify(scope.order));
                    formData.append('remark', angular.isUndefined(scope.order.Remark) == false && scope.order.Remark != null ? scope.order.Remark : '');
                });
                this.on('success', function (file, json) {
                    scope.done(json);
                    //scope.divAttachIsBusy = true;
                    //scope.getResources()  ;
                });
                this.on('addedfile', function (file) {
                    scope.$apply(function () {
                        reader = new FileReader();
                        reader.onload = handleReaderLoad;
                        reader.readAsDataURL(file);
                        function handleReaderLoad(evt) {
                            //console.log(file.type.indexOf('image'));
                            if (file.accepted == true) {
                                document.getElementById("imgFile")
                                .setAttribute('style', 'min-height:500px;background-repeat:no-repeat;background-size:cover;background-image:url("' + evt.target.result + '")');
                                //document.getElementById("hiddenImage")
                                //    .setAttribute('src', evt.target.result);

                                //document.getElementById("id_base64_name")
                                //    .setAttribute('value', file.name);
                                //document.getElementById("id_base64_content_type")
                                //    .setAttribute('value', file.type);
                                //form = $('#file-form');
                            }
                            else {
                                scope.$apply(function () {
                                    scope.removeFileAndShowAlert();
                                })
                            }
                            
                        }
                        scope.files.push(file);
                    });
                });
                this.on('drop', function (file) {
                    console.log('dropped');
                });
            }
        });
    }
}

app.directive('dropZoneDr', dropZoneDr);

app.factory('lookupservice', function ($http, $q, $timeout, baseUrl) {
    var lookup = new Object();

    lookup.getData = function (code) {
        var lstData = $q.defer();
        //alert(code);
        $http.post(baseUrl + "PSOrder/PSSupply/GetLookupDataByCode", { code: code })
       .success(function (response) {
           //lstData.reject('Cannot fetch records');
           //alert(code);
           lstData.resolve(response);
       })
       .error(function (data, status, header, config) {
           lstData.reject('Cannot fetch records');
       });

        return lstData.promise;
    }

    return lookup;
});

app.factory('genericlookupservice', function ($http, $q, $timeout, baseUrl) {
    var lookup = new Object();

    lookup.getData = function (url, paramName, paramValue) {
        var lstData = $q.defer();
        //alert(code);
        var json = JSON.parse('{"' + paramName + '" : "' + paramValue + '"}')
        $http.post(baseUrl + url, json)
       .success(function (response) {
           //lstData.reject('Cannot fetch records');
           //alert(code);
           lstData.resolve(response);
       })
       .error(function (data, status, header, config) {
           lstData.reject('Cannot fetch records');
       });

        return lstData.promise;
    }

    return lookup;
});


app.factory('combolookupservice', function ($http, $q, $timeout, baseUrl) {
    var lookup = new Object();

    lookup.getData = function (url, jsonstring) {
        var lstData = $q.defer();
        //alert(code);
        //var json = JSON.parse('{"' + paramName + '" : "' + paramValue + '"}')
        $http.post(baseUrl + url, jsonstring)
       .success(function (response) {
           //lstData.reject('Cannot fetch records');
           //alert(code);
           lstData.resolve(response);
       })
       .error(function (data, status, header, config) {
           lstData.reject('Cannot fetch records');
       });

        return lstData.promise;
    }

    return lookup;
});

app.filter('filterdropdown',
function () {
    return function (items, code, status) {
        var filtered = [];
        angular.forEach(items, function (item) {
            if (!(code != 'TRACTOR' && (item.Prefix == 'CC' || item.Prefix == 'MAKECOMB'))) {
                if (code == 'TRACTOR') {
                    //console.log(status + ' -- ' + item.Prefix);
                    if (angular.isUndefined(status) == true || status == null || status == '') {
                        filtered.push(item);
                    }
                    else if (!((status == 'AVAIL' && item.Prefix == 'CC') || (status == 'OPR' && item.Prefix == 'MAKECOMB'))) {
                        filtered.push(item);
                    }

                }
                else {
                    filtered.push(item);
                }
                
            }
        });
        return filtered;
    }
});

app.directive('lookupdropdown', function () {
    return {
        restrict: 'E',
        scope: {
            value: '=ngModel',
            idvalue: '@',
            lookupcode: "=lookupcode",
            isrequired: '=isrequired',
            onFocused: '=onFocused',
            onChange: '=onChange',
            isreadonly : '=isreadonly'
        },
        controller: ['$scope', '$attrs', 'lookupservice', function ($scope, $attrs, lookupservice) {
            //console.log(': controller');
            if (angular.isUndefined($attrs.isreadonly) == true) {
                $attrs.isreadonly = false;
            }
            $scope.lstData = [];
            if (angular.isUndefined($attrs.lookupcode) == false) {
                //console.log('loading ' + $attrs.lookupcode);
                $scope.promise = lookupservice.getData($attrs.lookupcode);
                $scope.promise.then(function (data) {
                    //alert(data);
                    $scope.lstData = data;
                    //console.log('loaded ' + $attrs.lookupcode);

                    $scope.populate();
                },
                function (error) {
                    //alert(error);
                });

            }

            $scope.onFocus = function (index) {
                //console.log(index);
                if ($scope.onFocused) {
                    $scope.onFocused(index);
                }
            }

            $scope.onChanged = function () {
                ////console.log(index);
                if ($scope.onChange) {
                    $scope.onChange($scope.value);
                }
            }


            $scope.populate = function (newvalue) {
                //console.log('populating ' + $attrs.lookupcode + ' - ' + $scope.idvalue);
                if (angular.isUndefined($scope.lstData) == false && $scope.lstData != null && $scope.lstData.length > 0
                    && angular.isUndefined($attrs.lookupcode) == false && angular.isUndefined($scope.idvalue) == false && $scope.idvalue != null && $scope.idvalue != '') {
                    //console.log('populating ' + $attrs.lookupcode + ' - ' + $scope.idvalue);
                    angular.forEach($scope.lstData, function (value, index) {
                        if ($scope.idvalue == value.Id) {
                            $scope.value = $scope.lstData[index];
                            //console.log('done ' + $scope.value);
                            //$scope.$apply();
                        }
                    });
                }
            }

        }],
        compile: function (tElem, tAttrs) {
            //console.log(': compile');
            return {
                pre: function (scope, element, attrs) {
                    //console.log(': pre');

                },
                post: function (scope, element, attrs) {
                    //console.log(': post');
                    attrs.$observe('idvalue', function (value) {
                        //console.log('latestvalue');
                        scope.populate();

                    });
                }
            }
        },
        link: function (scope, element, attrs) {

        },
        template: '\
        <select class="form-control" ng-disabled="{{isreadonly}}"  data-ng-options="data as data.Name for data in lstData" ng-change="onChanged()" ng-model="value" ng-focus="onFocus($parent.$index)" ng-required="{{isrequired}}">\
            <option value="">Select</option>\
        </select>'
    };
});

app.directive('filterlookupdropdown', function () {
    return {
        restrict: 'E',
        scope: {
            value: '=ngModel',
            idvalue: '@',
            parentvalue: '@',
            parentvalue2:'@',
            lookupcode: "=lookupcode",
            isrequired: '=isrequired',
            onFocused: '=onFocused',
            onChange: '=onChange'
        },
        controller: ['$scope', '$attrs', 'lookupservice', function ($scope, $attrs, lookupservice) {
            //console.log(': controller');
            $scope.lstData = [];
            $scope.filtervalue = '';
            $scope.filtervalue2 = '';
            if (angular.isUndefined($attrs.lookupcode) == false) {
                //console.log('loading ' + $attrs.lookupcode);
                $scope.promise = lookupservice.getData($attrs.lookupcode);
                $scope.promise.then(function (data) {
                    //alert(data);
                    $scope.lstData = data;
                    //console.log('loaded ' + $attrs.lookupcode);

                    $scope.populate();
                },
                function (error) {
                    //alert(error);
                });

            }

            $scope.onFocus = function (index) {
                //console.log(index);
                if ($scope.onFocused) {
                    $scope.onFocused(index);
                }
            }

            $scope.onChanged = function () {
                ////console.log(index);
                if ($scope.onChange) {
                    $scope.onChange($scope.value);
                }
            }


            $scope.populate = function (newvalue) {
                //console.log('populating ' + $attrs.lookupcode + ' - ' + $scope.idvalue);
                if (angular.isUndefined($scope.lstData) == false && $scope.lstData != null && $scope.lstData.length > 0
                    && angular.isUndefined($attrs.lookupcode) == false && angular.isUndefined($scope.idvalue) == false && $scope.idvalue != null && $scope.idvalue != '') {
                    //console.log('populating ' + $attrs.lookupcode + ' - ' + $scope.idvalue);
                    angular.forEach($scope.lstData, function (value, index) {
                        if ($scope.idvalue == value.Id) {
                            $scope.value = $scope.lstData[index];
                            //console.log('done ' + $scope.value);
                            //$scope.$apply();
                        }
                    });
                }
            }

        }],
        compile: function (tElem, tAttrs) {
            //console.log(': compile');
            return {
                pre: function (scope, element, attrs) {
                    //console.log(': pre');

                },
                post: function (scope, element, attrs) {
                    //console.log(': post');
                    attrs.$observe('idvalue', function (value) {
                        //console.log('latestvalue');
                        scope.populate();

                    });

                    attrs.$observe('parentvalue', function (value) {
                        //console.log(value);
                        scope.value = null;
                        scope.filtervalue = value;

                    });

                    attrs.$observe('parentvalue2', function (value) {
                        console.log(value);
                        //scope.value = null;
                        scope.filtervalue2 = value;

                    });
                }
            }
        },
        link: function (scope, element, attrs) {

        },
        template: '\
        <select class="form-control" data-ng-options="data as data.Name for data in lstData | filterdropdown:filtervalue:filtervalue2" ng-change="onChanged()" ng-model="value" ng-focus="onFocus($parent.$index)" ng-required="{{isrequired}}">\
            <option value="">Select</option>\
        </select>'
    };
});

app.directive('genericlookupdropdown', function () {
    return {
        restrict: 'E',
        scope: {
            value: '=ngModel',
            idvalue: '@',
            url: "=url",
            isrequired: '=isrequired',
            onFocused: '=onFocused',
            onChange: '=onChange'
        },
        controller: ['$scope', '$attrs', 'genericlookupservice', function ($scope, $attrs, genericlookupservice) {
            //console.log(': controller');
            $scope.lstData = [];
            if (angular.isUndefined($attrs.url) == false) {
                //console.log('loading ' + $attrs.lookupcode);
                $scope.promise = genericlookupservice.getData($attrs.url);
                $scope.promise.then(function (data) {
                    //alert(data);
                    $scope.lstData = data;
                    //console.log('loaded ' + $attrs.lookupcode);

                    $scope.populate();
                },
                function (error) {
                    //alert(error);
                });

            }

            $scope.onFocus = function (index) {
                //console.log(index);
                if ($scope.onFocused) {
                    $scope.onFocused(index);
                }
            }

            $scope.onChanged = function () {
                ////console.log(index);
                if ($scope.onChange) {
                    $scope.onChange($scope.value);
                }
            }


            $scope.populate = function (newvalue) {
                //console.log('populating ' + $attrs.lookupcode + ' - ' + $scope.idvalue);
                if (angular.isUndefined($scope.lstData) == false && $scope.lstData != null && $scope.lstData.length > 0
                    && angular.isUndefined($attrs.lookupcode) == false && angular.isUndefined($scope.idvalue) == false && $scope.idvalue != null && $scope.idvalue != '') {
                    //console.log('populating ' + $attrs.lookupcode + ' - ' + $scope.idvalue);
                    angular.forEach($scope.lstData, function (value, index) {
                        if ($scope.idvalue == value.Id) {
                            $scope.value = $scope.lstData[index];
                            //console.log('done ' + $scope.value);
                            //$scope.$apply();
                        }
                    });
                }
            }

        }],
        compile: function (tElem, tAttrs) {
            //console.log(': compile');
            return {
                pre: function (scope, element, attrs) {
                    //console.log(': pre');

                },
                post: function (scope, element, attrs) {
                    //console.log(': post');
                    attrs.$observe('idvalue', function (value) {
                        //console.log('latestvalue');
                        scope.populate();

                    });
                }
            }
        },
        link: function (scope, element, attrs) {

        },
        template: '\
        <select class="form-control" data-ng-options="data as data.Name for data in lstData" ng-change="onChanged()" ng-model="value" ng-focus="onFocus($parent.$index)" ng-required="{{isrequired}}">\
            <option value="">Select</option>\
        </select>'
    };
});

app.directive('combolookupdropdown', function () {
    return {
        restrict: 'E',
        scope: {
            value: '=ngModel',
            idvalue: '@',
            json: "@",
            addon : '@',
            url: "=url",
            isrequired: '=isrequired',
            onFocused: '=onFocused',
            onChange: '=onChange'
        },
        controller: ['$scope', '$attrs', 'combolookupservice', function ($scope, $attrs, combolookupservice) {
            //console.log(': controller');
            $scope.lstData = [];
            if (angular.isUndefined($attrs.url) == false) {
                console.log($scope.json);
                $scope.promise = combolookupservice.getData($attrs.url, $scope.json);
                $scope.promise.then(function (data) {
                    //alert(data);
                    $scope.lstData = data;
                    //console.log('loaded ' + $attrs.lookupcode);

                    $scope.populate();
                },
                function (error) {
                    //alert(error);
                });

            }

            $scope.onFocus = function (index) {
                //console.log(index);
                if ($scope.onFocused) {
                    $scope.onFocused(index);
                }
            }

            $scope.onChanged = function () {
                ////console.log(index);
                if ($scope.onChange) {
                    $scope.onChange($scope.value);
                }
            }


            $scope.populate = function (newvalue) {
                //console.log('populating ' + $attrs.lookupcode + ' - ' + $scope.idvalue);
                if (angular.isUndefined($scope.lstData) == false && $scope.lstData != null && $scope.lstData.length > 0
                    && angular.isUndefined($attrs.lookupcode) == false && angular.isUndefined($scope.idvalue) == false && $scope.idvalue != null && $scope.idvalue != '') {
                    //console.log('populating ' + $attrs.lookupcode + ' - ' + $scope.idvalue);
                    angular.forEach($scope.lstData, function (value, index) {
                        if ($scope.idvalue == value.Id) {
                            $scope.value = $scope.lstData[index];
                            //console.log('done ' + $scope.value);
                            //$scope.$apply();
                        }
                    });
                }
            }

        }],
        compile: function (tElem, tAttrs) {
            //console.log(': compile');
            return {
                pre: function (scope, element, attrs) {
                    //console.log(': pre');

                },
                post: function (scope, element, attrs) {
                    //console.log(': post');
                    attrs.$observe('idvalue', function (value) {
                        //console.log('latestvalue');
                        scope.populate();

                    });

                    attrs.$observe('addon', function (value) {
                        //console.log('latestvalue');
                        scope.populate();

                    });
                }
            }
        },
        link: function (scope, element, attrs) {

        },
        template: '\
        <select class="form-control" data-ng-options="data as data.Name for data in lstData" ng-change="onChanged()" ng-model="value" ng-focus="onFocus($parent.$index)" ng-required="{{isrequired}}">\
            <option value="">Select</option>\
        </select>'
    };
});

app.directive('lookupcheckbox', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            lstData: '=ngModel',
            lookupcode: "=lookupcode",
            isrequired: '=isrequired',
        },
        controller: ['$scope', '$attrs', 'lookupservice', function ($scope, $attrs, lookupservice) {
            $scope.lstData = [];
            $scope.selection = [];
            $scope.promise = lookupservice.getData($attrs.lookupcode);
            $scope.promise.then(function (data) {
                //alert(data);
                $scope.lstData = data;
            },
            function (error) {
                //alert(error);
            });

        }],
        compile: function (tElem, tAttrs) {
            console.log(': compile');
            return {
                pre: function (scope, element, attrs) {

                },
                post: function (scope, element, attrs) {

                }
            }
        },
        link: function (scope, element, attrs) {

        },
        template: '\
        <label ng-repeat="data in lstData" style="padding-left:10px;">\
          <input\
            type="checkbox"\
            name="selectedItems[]"\
            value="{{data.Id}}"\
            ng-model="data.selected"\
          >&nbsp; {{data.Name}} &nbsp;&nbsp;&nbsp;&nbsp;\
        </label>'
    };
});

app.directive('genericlookupcheckbox', function () {
    return {
        restrict: 'E',
        scope: {
            parameterValue: '@',
            lstData: '=ngModel',
            checked: '=checked',
            url: "=url",
            parameterName: '=parameterName',
            isrequired: '=isrequired',
        },
        controller: ['$scope', '$attrs', 'genericlookupservice', function ($scope, $attrs, genericlookupservice) {
            $scope.lstData = [];
            $scope.selection = [];

            $scope.loadData = function () {

                if (angular.isUndefined($scope.parameterValue) == false && $scope.parameterValue != null && $scope.parameterValue != '') {
                    $scope.promise = genericlookupservice.getData($attrs.url, $attrs.parameterName, $scope.parameterValue);
                    $scope.promise.then(function (data) {
                        //alert(data);
                        $scope.lstData = data;
                    },
                    function (error) {
                        //alert(error);
                    });
                }


            }
            $scope.loadData();



            $scope.changed = function (data) {
                if ($scope.checked) {
                    $scope.checked(data);
                }
            }



        }],
        compile: function (tElem, tAttrs) {
            console.log(': compile');
            return {
                pre: function (scope, element, attrs) {

                },
                post: function (scope, element, attrs) {
                    scope.$watch("parameterValue", function (newValue, oldValue) {
                        console.log('later load');
                        scope.loadData();
                    });
                }
            }
        },
        link: function (scope, element, attrs) {

        },
        template: '\
        <label ng-repeat="data in lstData" style="padding-left:10px;">\
          <input\
            type="checkbox" \
            name="selectedItems[]"\
            value="{{data.Id}}"\
            ng-model="data.selected"\
            ng-change="changed(data)"\
          >&nbsp; {{data.Name}} &nbsp;&nbsp;&nbsp;&nbsp;\
        </label>'
    };
});

app.factory('httpservice', function ($http, $q, $timeout, baseUrl) {
    var httpObj = new Object();

    httpObj.getData = function (url, json) {
        var data = $q.defer();
        $http.post(baseUrl + url, json)
       .success(function (response) {
           data.resolve(response);
       })
       .error(function (obj, status, header, config) {
           data.reject('Cannot fetch records');
       });

        return data.promise;
    }

    return httpObj;
});


app.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {

            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }
});
