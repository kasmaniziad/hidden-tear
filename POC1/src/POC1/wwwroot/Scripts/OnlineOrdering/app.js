
var app = angular.module('woqodoo', ['ui.bootstrap', 'cgBusy', 'ui.router', 'oc.lazyLoad', 'ngIdle', 'ngCanvasGauge', 'infinite-scroll'])

app.directive('blink', function ($timeout) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function ($scope, $element) {
            function showElement() {
                $element.css("display", "inline");
                $timeout(hideElement, 2000);
            }

            function hideElement() {
                $element.css("display", "none");
                $timeout(showElement, 500);
            }
            showElement();
        },
        template: '<span ng-transclude></span>',
        replace: true
    }
});


/*Local*/
//app.constant('baseUrl', 'http://localhost:59870/');
/*test*/
app.constant('baseUrl', 'http://woqv-webdev.woqod.com/Fuel/');
/*Production*/
//app.constant('baseUrl', 'https://www.woqod.com/Fuel/');

app.service('IsBlank', function () {

    this.isBlank = function (obj) {
        if (angular.isUndefined(obj) || obj == null || obj.toString().trim() == '') {
            return true;
        }
        return false;
    }
});

app.config(function (datepickerConfig) {
    datepickerConfig.showWeeks = false;
});

app.filter('jsonDate', ['$filter', function ($filter) {
    return function (input, format) {
        try {
            return (input) ? $filter('date')(parseInt(input.substr(6)), format) : '';
        } catch (e) {
            return input;
        }
    };
}]);

app.controller('homecontroller', ['$scope', '$http', 'IsBlank', function ($scope, $http, IsBlank) {

}]);
app.controller('FaqController', ['$scope', '$http', 'IsBlank', function ($scope, $http, IsBlank) {

}]);

app.controller('reportsController', ['$scope', '$http', '$timeout', '$interval', 'baseUrl', 'IsBlank', function ($scope, $http, $timeout, $interval, baseUrl, IsBlank) {

    $scope.onInit = function () {
        $scope.data = { progress: 0 };
        $scope.pageId = 0;
        $scope.fromDate = new Date();
        $scope.toDate = new Date();
        $scope.refreshOrders();

    }

    $scope.showBusyDiv = function (value) {
        if (value == true) {
            $scope.divIsBusy = value;
            $scope.interval = $interval(function () {
                try {
                    if ($scope.data.progress < 100) {
                        $scope.data.progress += 5;
                    }
                    else {
                        $scope.data.progress = 10;
                    }

                } catch (e) {
                }
            }, 100);

        }
        else {
            $scope.data = { progress: 0 };
            $scope.divIsBusy = false;
            $interval.cancel($scope.interval);
        }

    }

    $scope.refreshOrders = function () {
        $scope.selectedProductId = 0;
        if (angular.isUndefined($scope.selectedProduct) == false && $scope.selectedProduct.Id != null) {
            $scope.selectedProductId = $scope.selectedProduct.Id;
        }
        $scope.showBusyDiv(true);
        //$scope.divIsBusy = true;
        $http.post(baseUrl + 'Ordering/GetSearchedOrders', {
            info: {
                SearchString: $scope.SearchString, StartDate: $scope.fromDate
                , EndDate: $scope.toDate, ProductId: $scope.selectedProductId, PageId: $scope.pageId, NumOfRows: $scope.NumOfRows
            }
        })
        .success(function (response) {
            $timeout(function () {
                $scope.showBusyDiv(false);
                //$scope.divIsBusy = false;
                $scope.lstOrders = response.Item1;
                $scope.lstProducts = response.Item2;
                if (angular.isUndefined($scope.lstProducts) == false && $scope.lstProducts != null && $scope.lstProducts.length > 0 && angular.isUndefined($scope.selectedProduct) == true) {
                    $scope.selectedProduct = $scope.lstProducts[0];
                }
                else {
                    angular.forEach($scope.lstProducts, function (value, index) {
                        if (value.Id == $scope.selectedProductId) {
                            $scope.selectedProduct = $scope.lstProducts[index];
                        }
                    });
                }
                $scope.SiteName = response.Item3;
            }, 500);
        })
        .error(function (data, status, header, config) {
            $scope.showBusyDiv(false);
            //$scope.divIsBusy = false;
            alert('Unable to process the request');
        })
    }


}]);

function customModalController($scope, message) {
    $scope.message = message;
}

function confirmModalController($scope, parentScope, $modalInstance, $state, message1, message2, message3, date) {
    $scope.parentScope = parentScope
    $scope.message1 = message1;
    $scope.message2 = message2;
    $scope.message3 = message3;

    $scope.edit = function () {
        $state.go('changeorder', { mydate: date });
        $modalInstance.dismiss('cancel');
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        $scope.parentScope.onInit();
    }

}

function errorModalController($scope, $modalInstance, message1) {

    $scope.message1 = message1;

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }

}
//$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ftp|blob):|data:image\//);


function circularModalController($scope, parentScope, $modalInstance, $state, $http, $modal, baseUrl) {

    $scope.parentScope = parentScope;
    $scope.isProcessing = false;

    $scope.onInit = function () {
        $scope.isBusyDownloading = true;
        $http.post(baseUrl + 'Ordering/GetPendingCircular')
        .success(function (response) {
            $scope.Circular = response;
            $scope.isBusyDownloading = false;
        })
        .error(function (data, status, header, config) {
            $scope.modalInstance = $modal.open({
                templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                size: 'sm',
                keyboard: false,
                backdrop: 'static',
                controller: errorModalController,
                resolve: {
                    parentScope: function () {
                        return $scope;
                    },
                    message1: function () {
                        return 'Unable to process the request.';
                    },
                    message2: function () {
                        return null;
                    },
                    message3: function () {
                        return null;
                    },
                    date: function () {
                        return null;
                    }
                }

            });
        });
    }

    $scope.accepted = function () {
        $scope.isProcessing = true;
        //if ($scope.hasAgreed == true) {
        $http.post(baseUrl + 'Ordering/UpdateCircularStatus', { notificationId: $scope.Circular.Id })
        .success(function (response) {
            $modalInstance.dismiss('cancel');
            $scope.parentScope.accepted();
        })
        .error(function (data, status, header, config) {
            $scope.isProcessing = false;
            $scope.modalInstance = $modal.open({
                templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                size: 'sm',
                keyboard: false,
                backdrop: 'static',
                controller: errorModalController,
                resolve: {
                    parentScope: function () {
                        return $scope;
                    },
                    message1: function () {
                        return 'Unable to process the request.';
                    },
                    message2: function () {
                        return null;
                    },
                    message3: function () {
                        return null;
                    },
                    date: function () {
                        return null;
                    }
                }

            });
        });
        //}
        //else {
        //    $modalInstance.dismiss('cancel');
        //    $scope.modalInstance = $modal.open({
        //        templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
        //        size: 'sm',
        //        keyboard: false,
        //        backdrop: 'static',
        //        controller: errorModalController,
        //        resolve: {
        //            parentScope: function () {
        //                return $scope;
        //            },
        //            message1: function () {
        //                return 'Unable to process the request.';
        //            },
        //            message2: function () {
        //                return null;
        //            },
        //            message3: function () {
        //                return null;
        //            },
        //            date: function () {
        //                return null;
        //            }
        //        }

        //    });
        //    $scope.parentScope.logout();
        //}

    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        $scope.parentScope.logout();
    }

}

function confirmModalRedirectController($scope, parentScope, $modalInstance, $state, message1, message2, message3, date) {
    $scope.parentScope = parentScope
    $scope.message1 = message1;
    $scope.message2 = message2;
    $scope.message3 = message3;

    $scope.edit = function () {
        $state.go('order', { mydate: date });
        $modalInstance.dismiss('cancel');
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        $scope.parentScope.onInit();
    }

}

function modalController($scope, message, status, $modalInstance) {
    $scope.message = message;
    $scope.status = status;
}

app.controller('newOrderController', ['$scope', '$http', '$filter', '$timeout', '$interval', '$modal', '$state', '$stateParams', 'IsBlank', 'baseUrl', function ($scope, $http, $filter, $timeout, $interval, $modal, $state, $stateParams, IsBlank, baseUrl) {

    $scope.onInit = function () {

        if (angular.isUndefined($scope.$parent) == false && $scope.$parent != null && angular.isUndefined($scope.$parent.checkCirculars) == false && $scope.$parent.checkCirculars != null) {
            $scope.$parent.checkCirculars();
        }

        //var modalInstance = $modal.open({
        //    templateUrl: baseUrl + 'Ordering/OrderPlaced',
        //    size: 'sm'
        //});
        $scope.header = "Place Order";
        $scope.isInitial == true;
        $scope.data = { progress: 0 };
        $scope.maxDate = new Date();
        $scope.maxDate.setDate($scope.maxDate.getDate() + 60)
        $scope.hasErrors = false;
        $scope.resetValidationLabels();
        $scope.formData = {};
        $scope.formData.hasAgreed = false;
        //$scope.formData.currentDate = new Date();
        if (angular.isUndefined($stateParams.mydate) == false && $stateParams.mydate != null) {
            $scope.formData.currentDate = angular.copy($stateParams.mydate);
            $stateParams.mydate = null;
            $scope.fetchOrderDetails();
        }
        else {
            $scope.fetchInitialOrderDetails();
        }
    }

    $scope.showDummyValues = function () {
        if ($scope.isInitial == true) {
            return true
        }
        else if ($scope.hidePlaceOrder == true) {
            return true;
        }

        return false;
    }

    $scope.showBusyDiv = function (value) {
        if (value == true) {
            $scope.divIsBusy = value;
            $scope.interval = $interval(function () {
                try {
                    if ($scope.data.progress < 100) {
                        $scope.data.progress += 5;
                    }
                    else {
                        $scope.data.progress = 10;
                    }

                } catch (e) {
                }
            }, 100);

        }
        else {
            $scope.data = { progress: 0 };
            $scope.divIsBusy = false;
            $interval.cancel($scope.interval);
        }

    }

    $scope.resetValidationLabels = function () {
        $scope.formData.hasAgreed = false;
        $scope.showNewOrderMessage = false;
        $scope.hasNotOrdered = false;
        $scope.canEdit = false;
        $scope.showLateNewOrderMessage = false;
        $scope.lateUpdateOrderMessage = false;
    }

    $scope.getCaptionForShift = function (shiftData) {
        if (angular.isUndefined(shiftData.Quantity) == true || shiftData.Quantity == null) {
            return '-';
        }
        else if (shiftData.Quantity == 0) {
            return 'Not Required (0)';
        }
        else {
            return $filter("number")(shiftData.Quantity);
        }
    }

    $scope.getCaptionForLoad = function (shiftData) {
        return (angular.isUndefined(shiftData.NoOfLoad) == true || shiftData.NoOfLoad == null || shiftData.NoOfLoad == '') ? '' : '(' + shiftData.NoOfLoad + ')';
    }

    $scope.refreshData = function () {
        $scope.fetchOrderDetails();
    }

    $scope.fetchInitialOrderDetails = function () {
        $scope.resetValidationLabels();
        $scope.showBusyDiv(true);
        //$scope.divIsBusy = true;
        $scope.isInitial = true;
        $scope.tempCurrentDate = new Date();
        $scope.tempCurrentDate.setHours(0, 0, 0, 0);
        $http.post(baseUrl + 'Ordering/GetDataForNewOrder', { date: $scope.tempCurrentDate })
        .success(function (response) {
            $timeout(function () {
                $scope.showBusyDiv(false);
                //$scope.divIsBusy = false;
                $scope.lstDays = response.Item1;
                $scope.lstShifts = response.Item2;
                $scope.SiteName = response.Item3;
            }, 500);
        })
        .error(function (data, status, header, config) {
            $scope.showBusyDiv(false);
            //$scope.divIsBusy = false;
            $scope.modalInstance = $modal.open({
                templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                size: 'sm',
                keyboard: false,
                backdrop: 'static',
                controller: confirmModalController,
                resolve: {
                    parentScope: function () {
                        return $scope;
                    },
                    message1: function () {
                        return 'Unable to process the request.';
                    },
                    message2: function () {
                        return null;
                    },
                    message3: function () {
                        return null;
                    },
                    date: function () {
                        return $scope.formData.currentDate;
                    }
                }

            });
            //alert('Unable to process the request');
        })
    }

    $scope.fetchOrderDetails = function () {
        $scope.isInitial = false;
        $scope.header = "Place Order";
        $scope.resetValidationLabels();
        $scope.showBusyDiv(true);
        //$scope.divIsBusy = true;
        $http.post(baseUrl + 'Ordering/GetDataForNewOrder', { date: $scope.formData.currentDate })
        .success(function (response) {
            $timeout(function () {
                $scope.showBusyDiv(false);
                //$scope.divIsBusy = false;
                $scope.lstDays = response.Item1;
                angular.forEach($scope.lstDays, function (day, index) {
                    angular.forEach(day.lstProducts, function (product, productIndex) {
                        angular.forEach(product.lstShiftData, function (shiftData, shiftDataIndex) {
                            if (shiftData.Quantity == null) {
                                $scope.hasNotOrdered = true;
                            }
                            if (shiftData.CanEdit == true) {
                                $scope.canEdit = true;
                            }

                        });
                    });
                });

                $scope.lstShifts = response.Item2;
                $scope.SiteName = response.Item3;

                $scope.selectedDate = angular.copy($scope.formData.currentDate);
                $scope.selectedDate.setHours(0, 0, 0, 0);

                $scope.currentDateTime = new Date();
                $scope.currentDateTime.setTime($scope.currentDateTime.getTime() + (14 * 60 * 60 * 1000));

                //alert($scope.currentDateTime);

                $scope.todaysDate = new Date();
                $scope.todaysDate.setHours(0, 0, 0, 0);
                //alert($scope.todaysDate);


                //alert($scope.selectedDate);

                //alert($scope.hasNotOrdered);

                if ($scope.hasNotOrdered == true && $scope.todaysDate >= $scope.selectedDate) {
                    $scope.hidePlaceOrder = true;
                    $scope.showNewOrderMessage = true;
                    $scope.modalInstance = $modal.open({
                        templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                        size: 'sm',
                        keyboard: false,
                        backdrop: 'static',
                        controller: confirmModalController,
                        resolve: {
                            parentScope: function () {
                                return $scope;
                            },
                            message1: function () {
                                return 'Dear Customer, a New Order can be only entered one day in advance and before 10:00 a.m';
                            },
                            message2: function () {
                                return null;
                            },
                            message3: function () {
                                return null;
                            },
                            date: function () {
                                return $scope.formData.currentDate;
                            }
                        }

                    });
                    //alert('Cannot place order for this date');
                }
                else if ($scope.currentDateTime > $scope.selectedDate && $scope.hasNotOrdered == true) {
                    $scope.hidePlaceOrder = true;
                    $scope.showLateNewOrderMessage = true;
                    $scope.modalInstance = $modal.open({
                        templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                        size: 'sm',
                        keyboard: false,
                        backdrop: 'static',
                        controller: confirmModalController,
                        resolve: {
                            parentScope: function () {
                                return $scope;
                            },
                            message1: function () {
                                return 'Dear Customer, a New Order can be only entered one day in advance and before 10:00 a.m';
                            },
                            message2: function () {
                                return null;
                            },
                            message3: function () {
                                return null;
                            },
                            date: function () {
                                return $scope.formData.currentDate;
                            }
                        }

                    });
                }
                else if ($scope.canEdit == false) {
                    $scope.hidePlaceOrder = true;
                    $scope.lateUpdateOrderMessage = true;
                    $scope.modalInstance = $modal.open({
                        templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                        size: 'sm',
                        keyboard: false,
                        backdrop: 'static',
                        controller: confirmModalController,
                        resolve: {
                            parentScope: function () {
                                return $scope;
                            },
                            message1: function () {
                                return 'Dear Customer, a New Order can be only entered one day in advance and before 10:00 a.m';
                            },
                            message2: function () {
                                return null;
                            },
                            message3: function () {
                                return null;
                            },
                            date: function () {
                                return $scope.formData.currentDate;
                            }
                        }

                    });
                }
                else {
                    $scope.hidePlaceOrder = false;
                }

                if ($scope.hasNotOrdered == false && $scope.canEdit) {
                    $scope.header = "Change Order";
                    $scope.modalInstance = $modal.open({
                        templateUrl: baseUrl + 'Ordering/Confirm',
                        size: 'sm',
                        keyboard: false,
                        backdrop: 'static',
                        controller: confirmModalController,
                        resolve: {
                            parentScope: function () {
                                return $scope;
                            },
                            message1: function () {
                                return "Dear Customer, an order is currently existing for ";
                            },
                            message2: function () {
                                return $filter("date")($scope.formData.currentDate, 'EEEE MMM dd, yyyy');
                            },
                            message3: function () {
                                return "Would you like to change order??";
                            },
                            date: function () {
                                return $scope.formData.currentDate;
                            }
                        }

                    });
                }


            }, 500);
        })
        .error(function (data, status, header, config) {
            $scope.showBusyDiv(false);
            $scope.modalInstance = $modal.open({
                templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                size: 'sm',
                keyboard: false,
                backdrop: 'static',
                controller: confirmModalController,
                resolve: {
                    parentScope: function () {
                        return $scope;
                    },
                    message1: function () {
                        return 'Unable to process the request.';
                    },
                    message2: function () {
                        return null;
                    },
                    message3: function () {
                        return null;
                    },
                    date: function () {
                        return $scope.formData.currentDate;
                    }
                }

            });
            //$scope.divIsBusy = false;
            //alert('Unable to process the request');
        })
    }

    $scope.showPlaceOrderButton = function (day) {
        if ($scope.showNewOrderMessage == true || $scope.showLateNewOrderMessage == true || $scope.lateUpdateOrderMessage == true) {
            return false;
        }

        if ($scope.canEdit) {
            return true;
        }

        return false;
    }

    $scope.placeOrder = function () {
        if ($scope.$parent.hasAcceptedCircular == false) {
            if (angular.isUndefined($scope.$parent) == false && $scope.$parent != null && angular.isUndefined($scope.$parent.checkCirculars) == false && $scope.$parent.checkCirculars != null) {
                $scope.$parent.checkCirculars();
                return;
            }
        }

        $scope.data = [];
        $scope.hasErrors = false;
        angular.forEach($scope.lstDays, function (day, index) {
            angular.forEach(day.lstProducts, function (product, productIndex) {
                angular.forEach(product.lstShiftData, function (shiftData, shiftDataIndex) {
                    if (shiftData.NoOfLoad != null && shiftData.NoOfLoad < 5) {
                        $scope.data.push({ ShiftId: shiftData.ShiftId, NoOfLoad: shiftData.NoOfLoad, ProductId: product.ProductId });
                    }
                    else {
                        $scope.hasErrors = true;
                    }
                });
            });
        });

        if ($scope.hasErrors == true) {
            $scope.hasErrors = false;
            alert('Please provide valid data');
        }
        else {
            $scope.saveOrderDetails();
        }

    }

    $scope.saveOrderDetails = function () {
        $scope.showBusyDiv(true);
        //$scope.divIsBusy = true;
        $http.post(baseUrl + 'Ordering/SaveNewOrder', { orders: $scope.data, date: $scope.formData.currentDate, hasAgreed: $scope.formData.hasAgreed })
        .success(function (response) {
            $timeout(function () {
                $scope.showBusyDiv(false);
                //$scope.divIsBusy = false;
                if (angular.isUndefined(response.Item1) == false && response.Item1 != null && response.Item1 == true) {
                    if ($scope.hasNotOrdered == true) {
                        //alert('Order Placed Successfully');
                        $scope.modalInstance = $modal.open({
                            templateUrl: baseUrl + 'Ordering/ConfirmSubmit',
                            size: 'sm',
                            keyboard: false,
                            backdrop: 'static',
                            controller: confirmModalController,
                            resolve: {
                                parentScope: function () {
                                    return $scope;
                                },
                                message1: function () {
                                    return "Dear Customer, your New Order is successfully submitted and will be delivered within its requested shifts.";
                                },
                                message2: function () {
                                    return null;
                                },
                                message3: function () {
                                    return null;
                                },
                                date: function () {
                                    return $scope.formData.currentDate;
                                }
                            }
                        });

                        //$scope.modalInstance = $modal.open({
                        //    templateUrl: baseUrl + 'Ordering/OrderPlaced',
                        //    size: 'sm',
                        //    controller: customModalController,
                        //    resolve: {
                        //        message: function () {
                        //            return "Dear Customer, your Order is submitted!!!";
                        //        }
                        //    }

                        //});

                        //$timeout(function () {
                        //    $scope.modalInstance.dismiss('cancel');
                        //}, 1000);

                    }
                    else {
                        //alert('Order Updated Successfully');
                        $scope.modalInstance = $modal.open({
                            templateUrl: baseUrl + 'Ordering/OrderPlaced',
                            size: 'sm',
                            controller: customModalController,
                            resolve: {
                                message: function () {
                                    return "Dear Customer, your Order is updated!!!";
                                }
                            }
                        });

                        $timeout(function () {
                            $scope.modalInstance.dismiss('cancel');
                        }, 1000);

                    }

                    $state.go('homemanage');

                }
                else if (angular.isUndefined(response.Item1) == false && response.Item1 != null && response.Item1 == false) {
                    $scope.modalInstance = $modal.open({
                        templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                        size: 'sm',
                        keyboard: false,
                        backdrop: 'static',
                        controller: confirmModalController,
                        resolve: {
                            parentScope: function () {
                                return $scope;
                            },
                            message1: function () {
                                return "Dear Customer, your Order cannot be submitted as you have exceeded your ";
                                //return "Dear Customer, unable to process your request at the moment.";
                            },
                            message2: function () {
                                return "Credit Limit";
                                //return null;
                            },
                            message3: function () {
                                return null;
                            },
                            date: function () {
                                return $scope.formData.currentDate;
                            }
                        }

                    });
                    //alert('Unable to process the request');
                }
                else {
                    $scope.modalInstance = $modal.open({
                        templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                        size: 'sm',
                        keyboard: false,
                        backdrop: 'static',
                        controller: confirmModalController,
                        resolve: {
                            parentScope: function () {
                                return $scope;
                            },
                            message1: function () {
                                return 'Unable to process the request.';
                            },
                            message2: function () {
                                return null;
                            },
                            message3: function () {
                                return null;
                            },
                            date: function () {
                                return $scope.formData.currentDate;
                            }
                        }

                    });
                }
            }, 500);
        })
        .error(function (data, status, header, config) {
            $scope.showBusyDiv(false);
            //$scope.divIsBusy = false;
            $scope.modalInstance = $modal.open({
                templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                size: 'sm',
                keyboard: false,
                backdrop: 'static',
                controller: confirmModalController,
                resolve: {
                    parentScope: function () {
                        return $scope;
                    },
                    message1: function () {
                        return 'Unable to process the request.';
                    },
                    message2: function () {
                        return null;
                    },
                    message3: function () {
                        return null;
                    },
                    date: function () {
                        return $scope.formData.currentDate;
                    }
                }

            });
            //alert('Unable to process the request');
        })
    }

    $scope.cancel = function () {
        $state.go('homemanage');
    }

    $scope.getDateStringNew = function (mydt) {
        var dt = new Date(parseInt(mydt.substr(6)));
        return dt;
    }

    $scope.dateWrapper = function (date) {
        if (angular.isUndefined(date) == false && date != null && date != '') {
            return $scope.getDateStringNew(date.toString());
        }
        return '';
    }

}]);

app.controller('changeOrderController', ['$scope', '$http', '$filter', '$timeout', '$interval', '$modal', '$state', '$stateParams', 'IsBlank', 'baseUrl', function ($scope, $http, $filter, $timeout, $interval, $modal, $state, $stateParams, IsBlank, baseUrl) {

    $scope.onInit = function () {

        if (angular.isUndefined($scope.$parent) == false && $scope.$parent != null && angular.isUndefined($scope.$parent.checkCirculars) == false && $scope.$parent.checkCirculars != null) {
            $scope.$parent.checkCirculars();
        }

        //var modalInstance = $modal.open({
        //    templateUrl: baseUrl + 'Ordering/OrderPlaced',
        //    size: 'sm'
        //});
        $scope.header = "Change Order";
        $scope.data = { progress: 0 };
        $scope.maxDate = new Date();
        $scope.maxDate.setDate($scope.maxDate.getDate() + 60)
        $scope.hasErrors = false;
        $scope.resetValidationLabels();
        $scope.formData = {};
        $scope.formData.hasAgreed = false;
        //$scope.formData.currentDate = new Date();
        if (angular.isUndefined($stateParams.mydate) == false && $stateParams.mydate != null) {
            $scope.formData.currentDate = angular.copy($stateParams.mydate);
            $stateParams.mydate = null;

            $scope.fetchOrderDetails();
        }
        else {
            $scope.fetchInitialOrderDetails();
        }
    }

    $scope.showDummyValues = function () {
        if ($scope.isInitial == true) {
            return true
        }
        else if ($scope.hidePlaceOrder == true) {
            return true;
        }

        return false;
    }

    $scope.showBusyDiv = function (value) {
        if (value == true) {
            $scope.divIsBusy = value;
            $scope.interval = $interval(function () {
                try {
                    if ($scope.data.progress < 100) {
                        $scope.data.progress += 5;
                    }
                    else {
                        $scope.data.progress = 10;
                    }

                } catch (e) {
                }
            }, 100);

        }
        else {
            $scope.data = { progress: 0 };
            $scope.divIsBusy = false;
            $interval.cancel($scope.interval);
        }

    }

    $scope.resetValidationLabels = function () {
        $scope.canEditShiftData = true;
        $scope.formData.hasAgreed = false;
        $scope.showNewOrderMessage = false;
        $scope.hasNotOrdered = false;
        $scope.canEdit = false;
        $scope.showLateNewOrderMessage = false;
        $scope.lateUpdateOrderMessage = false;
    }

    $scope.getCaptionForShift = function (shiftData) {
        if (angular.isUndefined(shiftData.Quantity) == true || shiftData.Quantity == null) {
            return '-';
        }
        else if (shiftData.Quantity == 0) {
            return 'Not Required (0)';
        }
        else {
            return $filter("number")(shiftData.Quantity);
        }
    }

    $scope.getCaptionForLoad = function (shiftData) {
        return (angular.isUndefined(shiftData.NoOfLoad) == true || shiftData.NoOfLoad == null || shiftData.NoOfLoad == '') ? '' : '(' + shiftData.NoOfLoad + ')';
    }

    $scope.refreshData = function () {
        $scope.fetchOrderDetails();
    }

    $scope.fetchInitialOrderDetails = function () {
        $scope.resetValidationLabels();
        $scope.showBusyDiv(true);
        //$scope.divIsBusy = true;
        $scope.isInitial = true;
        $scope.tempCurrentDate = new Date();
        $scope.tempCurrentDate.setHours(0, 0, 0, 0);
        $http.post(baseUrl + 'Ordering/GetDataForNewOrder', { date: $scope.tempCurrentDate })
        .success(function (response) {
            $timeout(function () {
                $scope.showBusyDiv(false);
                //$scope.divIsBusy = false;
                $scope.lstDays = response.Item1;
                $scope.lstShifts = response.Item2;
                $scope.SiteName = response.Item3;
            }, 500);
        })
        .error(function (data, status, header, config) {
            $scope.showBusyDiv(false);
            //$scope.divIsBusy = false;
            $scope.modalInstance = $modal.open({
                templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                size: 'sm',
                keyboard: false,
                backdrop: 'static',
                controller: confirmModalController,
                resolve: {
                    parentScope: function () {
                        return $scope;
                    },
                    message1: function () {
                        return 'Unable to process the request.';
                    },
                    message2: function () {
                        return null;
                    },
                    message3: function () {
                        return null;
                    },
                    date: function () {
                        return $scope.formData.currentDate;
                    }
                }

            });
            //alert('Unable to process the request');
        })
    }

    $scope.fetchOrderDetails = function () {
        $scope.isInitial = false;
        $scope.resetValidationLabels();
        $scope.showBusyDiv(true);
        //$scope.divIsBusy = true;
        $http.post(baseUrl + 'Ordering/GetDataForNewOrder', { date: $scope.formData.currentDate })
        .success(function (response) {
            $timeout(function () {
                $scope.showBusyDiv(false);
                //$scope.divIsBusy = false;
                $scope.lstDays = response.Item1;
                angular.forEach($scope.lstDays, function (day, index) {
                    angular.forEach(day.lstProducts, function (product, productIndex) {
                        angular.forEach(product.lstShiftData, function (shiftData, shiftDataIndex) {
                            if (shiftData.Quantity == null) {
                                $scope.hasNotOrdered = true;
                            }
                            if (shiftData.CanEdit == true) {
                                $scope.canEdit = true;

                            }
                            else {
                                if ($scope.canEditShiftData != false) {
                                    $scope.canEditShiftData = false;
                                }
                            }

                        });
                    });
                });

                $scope.lstShifts = response.Item2;
                $scope.SiteName = response.Item3;

                $scope.selectedDate = angular.copy($scope.formData.currentDate);
                $scope.selectedDate.setHours(0, 0, 0, 0);

                $scope.currentDateTime = new Date();
                $scope.currentDateTime.setTime($scope.currentDateTime.getTime() + (14 * 60 * 60 * 1000));

                $scope.todaysDate = new Date();
                $scope.todaysDate.setHours(0, 0, 0, 0);

                if ($scope.hasNotOrdered == true && $scope.todaysDate >= $scope.selectedDate) {
                    $scope.hidePlaceOrder = true;
                    $scope.showNewOrderMessage = true;

                    $scope.modalInstance = $modal.open({
                        templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                        size: 'sm',
                        keyboard: false,
                        backdrop: 'static',
                        controller: confirmModalController,
                        resolve: {
                            parentScope: function () {
                                return $scope;
                            },
                            message1: function () {
                                return "Dear Customer, there was no order for";
                            },
                            message2: function () {
                                return $filter("date")($scope.formData.currentDate, 'EEEE MMM dd, yyyy');
                            },
                            message3: function () {
                                return 'New Order can be only entered one day in advance and before 10:00 a.m';
                            },
                            date: function () {
                                return $scope.formData.currentDate;
                            }
                        }

                    });

                    //alert('Cannot place order for this date');
                }
                else if ($scope.currentDateTime > $scope.selectedDate && $scope.hasNotOrdered == true) {
                    $scope.hidePlaceOrder = true;
                    $scope.showLateNewOrderMessage = true;
                    $scope.modalInstance = $modal.open({
                        templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                        size: 'sm',
                        keyboard: false,
                        backdrop: 'static',
                        controller: confirmModalController,
                        resolve: {
                            parentScope: function () {
                                return $scope;
                            },
                            message1: function () {
                                return 'Dear Customer, a New Order can be only entered one day in advance and before 10:00 a.m';
                            },
                            message2: function () {
                                return null;
                            },
                            message3: function () {
                                return null;
                            },
                            date: function () {
                                return $scope.formData.currentDate;
                            }
                        }

                    });
                }
                else if ($scope.canEdit == false) {
                    $scope.hidePlaceOrder = true;
                    $scope.lateUpdateOrderMessage = true;
                    $scope.modalInstance = $modal.open({
                        templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                        size: 'sm',
                        keyboard: false,
                        backdrop: 'static',
                        controller: confirmModalController,
                        resolve: {
                            parentScope: function () {
                                return $scope;
                            },
                            message1: function () {
                                return 'Order updates only allowed "2 hours" before the start of the shift.';
                            },
                            message2: function () {
                                return null;
                            },
                            message3: function () {
                                return null;
                            },
                            date: function () {
                                return $scope.formData.currentDate;
                            }
                        }

                    });
                }
                else if ($scope.hasNotOrdered == true) {
                    $scope.modalInstance = $modal.open({
                        templateUrl: baseUrl + 'Ordering/Confirm',
                        size: 'sm',
                        keyboard: false,
                        backdrop: 'static',
                        controller: confirmModalRedirectController,
                        resolve: {
                            parentScope: function () {
                                return $scope;
                            },
                            message1: function () {
                                return "No Order was placed for ";
                            },
                            message2: function () {
                                return $filter("date")($scope.formData.currentDate, 'EEEE MMM dd, yyyy');
                            },
                            message3: function () {
                                return "Would you like to place order??";
                            },
                            date: function () {
                                return $scope.formData.currentDate;
                            }
                        }

                    });
                }
                else {
                    $scope.hidePlaceOrder = false;
                }

            }, 500);
        })
        .error(function (data, status, header, config) {
            $scope.modalInstance = $modal.open({
                templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                size: 'sm',
                keyboard: false,
                backdrop: 'static',
                controller: confirmModalController,
                resolve: {
                    parentScope: function () {
                        return $scope;
                    },
                    message1: function () {
                        return "Unable to process the request";
                    },
                    message2: function () {
                        return null;
                    },
                    message3: function () {
                        return null;
                    },
                    date: function () {
                        return null;
                    }
                }

            });
            $scope.showBusyDiv(false);
            //$scope.divIsBusy = false;
            //alert('Unable to process the request');
        })
    }

    $scope.showPlaceOrderButton = function (day) {
        if ($scope.showNewOrderMessage == true || $scope.showLateNewOrderMessage == true || $scope.lateUpdateOrderMessage == true) {
            return false;
        }

        if ($scope.canEdit) {
            return true;
        }

        return false;
    }

    $scope.placeOrder = function () {
        if ($scope.$parent.hasAcceptedCircular == false) {
            if (angular.isUndefined($scope.$parent) == false && $scope.$parent != null && angular.isUndefined($scope.$parent.checkCirculars) == false && $scope.$parent.checkCirculars != null) {
                $scope.$parent.checkCirculars();
                return;
            }
        }
        $scope.data = [];
        $scope.hasErrors = false;
        angular.forEach($scope.lstDays, function (day, index) {
            angular.forEach(day.lstProducts, function (product, productIndex) {
                angular.forEach(product.lstShiftData, function (shiftData, shiftDataIndex) {
                    if (shiftData.NoOfLoad != null && shiftData.NoOfLoad < 5) {
                        $scope.data.push({ ShiftId: shiftData.ShiftId, NoOfLoad: shiftData.NoOfLoad, ProductId: product.ProductId });
                    }
                    else {
                        $scope.hasErrors = true;
                    }
                });
            });
        });

        if ($scope.hasErrors == true) {
            $scope.hasErrors = false;
            $scope.modalInstance = $modal.open({
                templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                size: 'sm',
                keyboard: false,
                backdrop: 'static',
                controller: confirmModalController,
                resolve: {
                    parentScope: function () {
                        return $scope;
                    },
                    message1: function () {
                        return "Please provide valid data";
                    },
                    message2: function () {
                        return null;
                    },
                    message3: function () {
                        return null;
                    },
                    date: function () {
                        return null;
                    }
                }

            });
            //alert('Please provide valid data');
        }
        else {
            $scope.saveOrderDetails();
        }

    }

    $scope.saveOrderDetails = function () {
        $scope.showBusyDiv(true);
        //$scope.divIsBusy = true;
        $http.post(baseUrl + 'Ordering/SaveNewOrder', { orders: $scope.data, date: $scope.formData.currentDate, hasAgreed: $scope.formData.hasAgreed })
        .success(function (response) {
            $timeout(function () {
                $scope.showBusyDiv(false);
                //$scope.divIsBusy = false;
                if (angular.isUndefined(response.Item1) == false && response.Item1 != null && response.Item1 == true) {
                    if ($scope.hasNotOrdered == true) {
                        //alert('Order Placed Successfully');
                        $scope.modalInstance = $modal.open({
                            templateUrl: baseUrl + 'Ordering/ConfirmSubmit',
                            size: 'sm',
                            keyboard: false,
                            backdrop: 'static',
                            controller: confirmModalController,
                            resolve: {
                                parentScope: function () {
                                    return $scope;
                                },
                                message1: function () {
                                    return "Dear Customer, your New Order is successfully submitted and will be delivered within its requested shifts.";
                                },
                                message2: function () {
                                    return null;
                                },
                                message3: function () {
                                    return null;
                                },
                                date: function () {
                                    return $scope.formData.currentDate;
                                }
                            }
                        });
                        //$scope.modalInstance = $modal.open({
                        //    templateUrl: baseUrl + 'Ordering/OrderPlaced',
                        //    size: 'sm',
                        //    controller: customModalController,
                        //    resolve: {
                        //        message: function () {
                        //            return "Order Placed!!!";
                        //        }
                        //    }

                        //});

                        //$timeout(function () {
                        //    $scope.modalInstance.dismiss('cancel');
                        //}, 1000);

                    }
                    else {
                        //alert('Order Updated Successfully');
                        $scope.modalInstance = $modal.open({
                            templateUrl: baseUrl + 'Ordering/ConfirmSubmit',
                            size: 'sm',
                            keyboard: false,
                            backdrop: 'static',
                            controller: confirmModalController,
                            resolve: {
                                parentScope: function () {
                                    return $scope;
                                },
                                message1: function () {
                                    return "Dear Customer, your Order is successfully changed and will be delivered within its requested shifts.";
                                },
                                message2: function () {
                                    return null;
                                },
                                message3: function () {
                                    return null;
                                },
                                date: function () {
                                    return $scope.formData.currentDate;
                                }
                            }
                        });
                        //$scope.modalInstance = $modal.open({
                        //    templateUrl: baseUrl + 'Ordering/OrderPlaced',
                        //    size: 'sm',
                        //    controller: customModalController,
                        //    resolve: {
                        //        message: function () {
                        //            return "Order Updated!!!";
                        //        }
                        //    }
                        //});

                        //$timeout(function () {
                        //    $scope.modalInstance.dismiss('cancel');
                        //}, 1000);

                    }

                    $state.go('homemanage');

                }
                else if (angular.isUndefined(response.Item1) == false && response.Item1 != null && response.Item1 == false) {
                    $scope.modalInstance = $modal.open({
                        templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                        size: 'sm',
                        keyboard: false,
                        backdrop: 'static',
                        controller: confirmModalController,
                        resolve: {
                            parentScope: function () {
                                return $scope;
                            },
                            message1: function () {
                                return "Dear Customer, your Order cannot be submitted as you have exceeded your ";
                                //return "Dear Customer, unable to process your request at the moment.";
                            },
                            message2: function () {
                                return "Credit Limit";
                                //return null;
                            },
                            message3: function () {
                                return null;
                            },
                            date: function () {
                                return $scope.formData.currentDate;
                            }
                        }

                    });
                    //alert('Unable to process the request');
                }
                else {
                    $scope.modalInstance = $modal.open({
                        templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                        size: 'sm',
                        keyboard: false,
                        backdrop: 'static',
                        controller: confirmModalController,
                        resolve: {
                            parentScope: function () {
                                return $scope;
                            },
                            message1: function () {
                                return "Unable to process the request";
                            },
                            message2: function () {
                                return null;
                            },
                            message3: function () {
                                return null;
                            },
                            date: function () {
                                return null;
                            }
                        }

                    });
                }
            }, 500);
        })
        .error(function (data, status, header, config) {
            $scope.showBusyDiv(false);
            //$scope.divIsBusy = false;
            $scope.modalInstance = $modal.open({
                templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                size: 'sm',
                keyboard: false,
                backdrop: 'static',
                controller: confirmModalController,
                resolve: {
                    parentScope: function () {
                        return $scope;
                    },
                    message1: function () {
                        return "Unable to process the request";
                    },
                    message2: function () {
                        return null;
                    },
                    message3: function () {
                        return null;
                    },
                    date: function () {
                        return null;
                    }
                }

            });
            //alert('Unable to process the request');
        })
    }

    $scope.cancel = function () {
        $state.go('homemanage');
    }

    $scope.getDateStringNew = function (mydt) {
        var dt = new Date(parseInt(mydt.substr(6)));
        return dt;
    }

    $scope.dateWrapper = function (date) {
        if (angular.isUndefined(date) == false && date != null && date != '') {
            return $scope.getDateStringNew(date.toString());
        }
        return '';
    }

}]);

app.controller('orderingctrl', ['$scope', '$http', '$filter', '$timeout', '$interval', '$state', 'IsBlank', 'baseUrl', function ($scope, $http, $filter, $timeout, $interval, $state, IsBlank, baseUrl) {

    $scope.onInit = function () {
        if (angular.isUndefined($scope.$parent) == false && $scope.$parent != null && angular.isUndefined($scope.$parent.checkCirculars) == false && $scope.$parent.checkCirculars != null) {
            $scope.$parent.checkCirculars();
        }

        $scope.formData = {};
        $scope.formData.showDashboard = false;
        $scope.data = { progress: 0 };
        $scope.malestat = 50;
        //$scope.divIsBusy = true;
        $scope.todaysDate = new Date();
        $scope.todaysDate.setHours(0, 0, 0, 0);
        $scope.refreshOrders();

        $scope.getBasicInformation();

        //$scope.showBusyDiv(true);

        $scope.requiredTime = new Date();
        $scope.requiredTime.setHours(10, 0, 0, 0);

        //$scope.refreshCreditLimit();

    }

    $scope.showBusyDiv = function (value) {
        if (value == true) {
            $scope.divIsBusy = value;
            $scope.interval = $interval(function () {
                try {
                    if ($scope.data.progress < 100) {
                        $scope.data.progress += 5;
                    }
                    else {
                        $scope.data.progress = 10;
                    }

                } catch (e) {
                }
            }, 100);

        }
        else {
            $scope.data = { progress: 0 };
            $scope.divIsBusy = false;
            $interval.cancel($scope.interval);
        }

    }

    $scope.increaseProgress = function () {
        if ($scope.data.progress < 100) {
            $timeout(function () {
                $scope.data.progress += 5;
                $scope.increaseProgress();
            }, 100);
        }
    }

    $scope.getDateStringNew = function (mydt) {
        var dt = new Date(parseInt(mydt.substr(6)));
        return dt;
    }

    $scope.dateWrapper = function (date) {
        if (angular.isUndefined(date) == false && date != null && date != '') {
            return $scope.getDateStringNew(date.toString());
        }
        return '';
    }

    $scope.showOrderNewButton = function (day) {
        $scope.currentDateTime = new Date();
        $scope.currentDateTime.setTime($scope.currentDateTime.getTime() + (14 * 60 * 60 * 1000));

        if ($scope.currentDateTime > day.selectedDate && day.hasNotOrdered == true) {
            //console.log($scope.currentDateTime + '----' + day.selectedDate);
            return false;
        }
        else if ($scope.todaysDate < day.selectedDate && day.hasNotOrdered == true) {
            return true;
        }

        return false;
    }

    $scope.showChangeOrderButton = function (day) {
        if (day.hasNotOrdered == false && day.canEdit == true) {
            return true;
        }
        return false;
    }

    $scope.refreshCreditLimit = function () {
        $scope.divIsCreditLimitBusy = true;
        $http.get(baseUrl + 'Ordering/GetCreditLimit')
        .success(function (response) {
            $timeout(function () {
                $scope.divIsCreditLimitBusy = false;
                $scope.creditLimitInfo = response.Item1;
            }, 400);
        })
        .error(function (data, status, header, config) {
            $scope.divIsCreditLimitBusy = false;
            //$scope.divIsBusy = false;
            $scope.modalInstance = $modal.open({
                templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                size: 'sm',
                keyboard: false,
                backdrop: 'static',
                controller: confirmModalController,
                resolve: {
                    parentScope: function () {
                        return $scope;
                    },
                    message1: function () {
                        return 'Unable to process the request.';
                    },
                    message2: function () {
                        return null;
                    },
                    message3: function () {
                        return null;
                    },
                    date: function () {
                        return $scope.formData.currentDate;
                    }
                }

            });
            //alert('Unable to process the request');
        })
    }

    $scope.refreshOrders = function () {
        $scope.showBusyDiv(true);

        //$scope.divIsBusy = true;
        $http.get(baseUrl + 'Ordering/GetSiteOrderList')
        .success(function (response) {
            $timeout(function () {
                $scope.showBusyDiv(false);
                //$scope.divIsBusy = false;
                $scope.lstDays = response.Item1;

                angular.forEach($scope.lstDays, function (day, index) {
                    day.selectedDate = $scope.dateWrapper(day.ActualDate);
                    day.selectedDate.setHours(0, 0, 0, 0);
                    day.hasNotOrdered = false;
                    day.canEdit = false;
                    angular.forEach(day.lstProducts, function (product, productIndex) {
                        angular.forEach(product.lstShiftData, function (shiftData, shiftDataIndex) {
                            if (shiftData.Quantity == null) {
                                day.hasNotOrdered = true;
                            }

                            if (shiftData.CanEdit == true) {
                                //alert(shiftData.CanEdit);
                                day.canEdit = true;
                            }

                        });
                    });

                    if ($scope.hasNotOrdered == false) {

                    }

                });
                $scope.lstShifts = response.Item2;
                $scope.SiteName = response.Item3;
            }, 500);
        })
        .error(function (data, status, header, config) {
            $scope.showBusyDiv(false);
            //$scope.divIsBusy = false;
            $scope.modalInstance = $modal.open({
                templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                size: 'sm',
                keyboard: false,
                backdrop: 'static',
                controller: confirmModalController,
                resolve: {
                    parentScope: function () {
                        return $scope;
                    },
                    message1: function () {
                        return 'Unable to process the request.';
                    },
                    message2: function () {
                        return null;
                    },
                    message3: function () {
                        return null;
                    },
                    date: function () {
                        return $scope.formData.currentDate;
                    }
                }

            });
            //alert('Unable to process the request');
        })
    }

    $scope.getBasicInformation = function () {
        $scope.showBusyDiv(true);

        $http.get(baseUrl + 'Ordering/GetSiteBasicInformation')
        .success(function (response) {
            $timeout(function () {
                $scope.showBusyDiv(false);
                //$scope.divIsBusy = false;
                $scope.userInfo = response.Item1;
                $scope.userInfo.SiteName = 'Welcome - ' + $scope.userInfo.SiteName;
            }, 500);
        })
        .error(function (data, status, header, config) {
            $scope.showBusyDiv(false);
            //$scope.divIsBusy = false;
            $scope.modalInstance = $modal.open({
                templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
                size: 'sm',
                keyboard: false,
                backdrop: 'static',
                controller: confirmModalController,
                resolve: {
                    parentScope: function () {
                        return $scope;
                    },
                    message1: function () {
                        return 'Unable to process the request.';
                    },
                    message2: function () {
                        return null;
                    },
                    message3: function () {
                        return null;
                    },
                    date: function () {
                        return null;
                    }
                }

            });
            //alert('Unable to process the request');
        })
    }

    $scope.getCaptionForShift = function (shiftData) {
        if (angular.isUndefined(shiftData.Quantity) == true || shiftData.Quantity == null) {
            return '-';
        }
        else if (shiftData.Quantity == 0) {
            return 'Not Required (0)';
        }
        else {
            return $filter("number")(shiftData.Quantity);
        }
    }

    $scope.getCaptionForLoad = function (shiftData) {
        return (angular.isUndefined(shiftData.NoOfLoad) == true || shiftData.NoOfLoad == null || shiftData.NoOfLoad == '') ? '' : '(' + shiftData.NoOfLoad + ' x ' + $filter("number")(shiftData.Quantity / shiftData.NoOfLoad) + ')';
    }

    $scope.newOrder = function (day) {
        $state.go('order', { mydate: $scope.dateWrapper(day.ActualDate) });
    }

    $scope.updateOrder = function (day) {
        $state.go('changeorder', { mydate: $scope.dateWrapper(day.ActualDate) });
    }

}]);

app.controller('olordercontroller', ['$scope', '$http', '$state', '$stateParams', 'IsBlank', function ($scope, $http, $state, $stateParams, IsBlank) {
    $scope.onInit = function () {
        $("#hdnsiteId").val($stateParams.id);
        loadcalendar();
        //$scope.hiddensiteid = $stateParams.id;
        //SweetAlert.swal($stateParams.id, "warning");
    }
}]);

app.filter('countDown', ['$filter', function () {
    return function (endTime) {
        if (endTime == null || endTime == "") {
            return;
        }

        var parsedDate = new Date(endTime);
        parsedDate.setMinutes(parsedDate.getMinutes() + (parsedDate.getTimezoneOffset() * -1));
        var xtime = new Date(parsedDate);
        var timeInMillisecond = xtime.getTime();
        return timeInMillisecond;
    };
}]);

app.directive("clickToClose", [function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            $(document).on("mouseup touchstart", function (e) {
                var container = $(elem);

                if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0) // ... nor a descendant of the container
                {
                    scope.hideNotification = true;
                }
            });
        }
    }
}]);

app.controller('CountDownWatchCtrl', ['$scope', '$http', '$timeout', '$state', 'baseUrl', function CountDownWatchCtrl($scope, $http, $timeout, $state, baseUrl) {

    var totalcountDown = 60;


    var countDowWatch = function () {

        if (totalcountDown < 0) {

            totalcountDown = 0;

            window.location.href = baseUrl + "Login/Logout";

            return;

        }

        else {

            $scope.countDown_tick = totalcountDown;

            totalcountDown--;

            $timeout(countDowWatch, 1000);

        }

    };


    $scope.countDown_tick = totalcountDown;

    countDowWatch()

    $scope.redirect = function () {
        history.go(-1);
    }

}]);

app.controller('notificationdetailcontroller', ['$scope', '$http', '$state', '$modal', '$stateParams', 'IsBlank', 'Idle', 'baseUrl', function ($scope, $http, $state, $modal, $stateParams, IsBlank, Idle, baseUrl) {
    $scope.onInit = function () {
        if (angular.isUndefined($stateParams.notification) == false && $stateParams.notification != null) {
            $scope.Circular = $stateParams.notification;
        }
        else {
            $state.go('homemanage');
        }
    }

    $scope.showErrorMessage = function () {
        $scope.modalInstance = $modal.open({
            templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
            size: 'sm',
            keyboard: false,
            backdrop: 'static',
            controller: errorModalController,
            resolve: {
                parentScope: function () {
                    return $scope;
                },
                message1: function () {
                    return 'Unable to process the request.';
                },
                message2: function () {
                    return null;
                },
                message3: function () {
                    return null;
                },
                date: function () {
                    return null;
                }
            }

        });
    }

}]);

app.controller('allnotificationscontroller', ['$scope', '$http', '$state', '$modal', '$interval', 'IsBlank', 'Idle', 'baseUrl', function ($scope, $http, $state, $modal, $interval, IsBlank, Idle, baseUrl) {
    $scope.onInit = function () {
        $scope.data = { progress: 0 };
        $scope.formData = {};
        $scope.showCategories = false;
        $scope.getAllNotifications();
        $scope.getAllCategories();
    }

    $scope.getAllCategories = function () {
        $scope.showCategories = false;
        $http.post(baseUrl + 'Ordering/GetPortalNotificationCategory')
       .success(function (response) {
           $scope.showCategories = true;
           if (angular.isUndefined(response) == false && response != null) {
               $scope.lstCategories = response;
               if (angular.isUndefined($scope.lstCategories) == false && $scope.lstCategories != null && $scope.lstCategories.length > 0) {
                   $scope.formData.Category = $scope.lstCategories[0];
               }
           }
           else {
               $scope.showErrorMessage();
           }
       })
       .error(function (data, status, header, config) {
           $scope.showCategories = true;
           $scope.showErrorMessage();
       });
    }

    $scope.getAllNotifications = function () {

        var categoryId = 0;
        if (angular.isUndefined($scope.formData.Category) == false && $scope.formData.Category != null) {
            categoryId = $scope.formData.Category.Id;
        }
        $scope.showBusyDiv(true);
        $http.post(baseUrl + 'Ordering/GetAllAcceptedNotifications', { categoryId: categoryId })
        .success(function (response) {
            $scope.showBusyDiv(false);
            if (angular.isUndefined(response) == false && response != null) {
                $scope.lstAllNotifications = response;
            }
            else {
                $scope.showErrorMessage();
            }
        })
        .error(function (data, status, header, config) {
            $scope.showBusyDiv(false);
            $scope.showErrorMessage();
        });
    }

    $scope.getNotifications = function () {
        //alert ('abc');
    }

    $scope.showBusyDiv = function (value) {
        if (value == true) {
            $scope.downloadingNotifications = value;
            $scope.interval = $interval(function () {
                try {
                    if ($scope.data.progress < 100) {
                        $scope.data.progress += 5;
                    }
                    else {
                        $scope.data.progress = 10;
                    }

                } catch (e) {
                }
            }, 100);

        }
        else {
            $scope.data = { progress: 0 };
            $scope.downloadingNotifications = false;
            $interval.cancel($scope.interval);
        }

    }

    $scope.showErrorMessage = function () {
        $scope.modalInstance = $modal.open({
            templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
            size: 'sm',
            keyboard: false,
            backdrop: 'static',
            controller: errorModalController,
            resolve: {
                parentScope: function () {
                    return $scope;
                },
                message1: function () {
                    return 'Unable to process the request.';
                },
                message2: function () {
                    return null;
                },
                message3: function () {
                    return null;
                },
                date: function () {
                    return null;
                }
            }

        });
    }

    $scope.showNotification = function (notification) {

        $state.go('viewnotification', { notification: notification });
    }

}]);


app.controller('maincontroller', ['$scope', '$http', '$state', '$modal', 'IsBlank', 'Idle', 'baseUrl', function ($scope, $http, $state, $modal, IsBlank, Idle, baseUrl) {

    Idle.watch();

    $scope.logout = function () {
        window.location.href = baseUrl + "Login/Logout";
    }

    $scope.accepted = function () {
        window.location.href = baseUrl + "Home/UserProfile";
    }

    $scope.checkCirculars = function () {
        if ($scope.hasAcceptedCircular == false) {
            $scope.showPendingCircular();
        }
    }

    $scope.showNotification = function (notification) {
        $scope.hideNotification = true;
        $state.go('viewnotification', { notification: notification });
    }

    $scope.viewAllNotifications = function () {
        $scope.hideNotification = true;
        $state.go('allnotifications');
    }

    $scope.base64ArrayBuffer = function (arrayBuffer) {
        var base64 = ''
        var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

        var bytes = new Uint8Array(arrayBuffer)
        var byteLength = bytes.byteLength
        var byteRemainder = byteLength % 3
        var mainLength = byteLength - byteRemainder

        var a, b, c, d
        var chunk

        // Main loop deals with bytes in chunks of 3
        for (var i = 0; i < mainLength; i = i + 3) {
            // Combine the three bytes into a single integer
            chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

            // Use bitmasks to extract 6-bit segments from the triplet
            a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
            b = (chunk & 258048) >> 12 // 258048   = (2^6 - 1) << 12
            c = (chunk & 4032) >> 6 // 4032     = (2^6 - 1) << 6
            d = chunk & 63               // 63       = 2^6 - 1

            // Convert the raw binary segments to the appropriate ASCII encoding
            base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
        }

        // Deal with the remaining bytes and padding
        if (byteRemainder == 1) {
            chunk = bytes[mainLength]

            a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

            // Set the 4 least significant bits to zero
            b = (chunk & 3) << 4 // 3   = 2^2 - 1

            base64 += encodings[a] + encodings[b] + '=='
        } else if (byteRemainder == 2) {
            chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

            a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
            b = (chunk & 1008) >> 4 // 1008  = (2^6 - 1) << 4

            // Set the 2 least significant bits to zero
            c = (chunk & 15) << 2 // 15    = 2^4 - 1

            base64 += encodings[a] + encodings[b] + encodings[c] + '='
        }

        return base64
    }

    $scope.onInit = function (lstSites, lstShifts, hasAcceptedCircular) {
        $scope.hideNotification = true;
        $scope.getAcceptedNotifications();
        $scope.hasAcceptedCircular = hasAcceptedCircular;
        $scope.sessionDate = new Date();
        $scope.sessionDate.setMinutes($scope.sessionDate.getMinutes() + 20);
        $scope.formData = {};
        $scope.formData.Quantity = '30,000';
        $scope.lstSites = lstSites;
        $scope.lstShifts = lstShifts;
        $scope.minDate = new Date();
        $scope.customMessage = '';
        $scope.dateError = false;
        $scope.newOrder = true;
    }

    $scope.getAcceptedNotifications = function () {
        $scope.downloadingNotifications = true;
        $http.post(baseUrl + 'Ordering/GetAcceptedNotifications')
        .success(function (response) {
            //alert(response);
            $scope.downloadingNotifications = false;
            if (angular.isUndefined(response) == false && response != null) {
                $scope.lstNotifications = response.Item1;
                $scope.showViewAll = response.Item2;

                //var ua = window.navigator.userAgent;
                //var msie = ua.indexOf("MSIE ");

                //if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                //    console.log('1');
                //    if (!Modernizr.objectfit) {
                //        console.log('2');
                //        console.log($('.site-header'));
                //        $('.site-header').each(function () {
                //            console.log('3');
                //            var $container = $(this),
                //                imgUrl = $container.find('img').prop('src');
                //            if (imgUrl) {
                //                console.log('found');
                //                $container
                //                    .css('backgroundImage', 'url(' + imgUrl + '4e535250-dce0-4e83-8c78-bddc7ac56274' + ')')
                //                    .addClass('compat-object-fit');
                //            }
                //        });
                //    }
                //}
                //return false;
                //if ('objectFit' in document.documentElement.style === false) {
                //    // assign HTMLCollection with parents of images with objectFit to variable
                //    var container = document.getElementsByClassName('js-box');
                //    // Loop through HTMLCollection
                //    for (var i = 0; i < container.length; i++) {
                //        // Asign image source to variable
                //        var imageSource = container[i].querySelector('img').src;
                //        // Hide image
                //        container[i].querySelector('img').style.display = 'none';
                //        // Add background-size: cover
                //        container[i].style.backgroundSize = 'cover';
                //        // Add background-image: and put image source here
                //        container[i].style.backgroundImage = 'url(' + imageSource + ')';
                //        // Add background-position: center center
                //        container[i].style.backgroundPosition = 'center center';
                //    }
                //}
            }
            else {
                $scope.showErrorMessage();
            }
        })
        .error(function (data, status, header, config) {
            $scope.downloadingNotifications = false;
            $scope.showErrorMessage();
        });
    }

    $scope.showErrorMessage = function () {
        $scope.modalInstance = $modal.open({
            templateUrl: baseUrl + 'Ordering/ConfirmDismiss',
            size: 'sm',
            keyboard: false,
            backdrop: 'static',
            controller: errorModalController,
            resolve: {
                parentScope: function () {
                    return $scope;
                },
                message1: function () {
                    return 'Unable to process the request.';
                },
                message2: function () {
                    return null;
                },
                message3: function () {
                    return null;
                },
                date: function () {
                    return null;
                }
            }

        });
    }

    $scope.showPendingCircular = function () {

        $scope.modalInstance = $modal.open({
            templateUrl: baseUrl + 'Ordering/Circular',
            size: 'lg',
            keyboard: false,
            backdrop: 'static',
            controller: circularModalController,
            resolve: {
                parentScope: function () {
                    return $scope;
                }
            }

        });


    }

    $scope.$on('IdleStart', function () {
        $state.go('stayconnected');
    });

    // function you want to fire when the user becomes active again
    $scope.$on('IdleEnd', function () {

    });

    $scope.resetFormData = function () {
        $scope.formData.Site = null;
        $scope.formData.Product = null;
        $scope.formData.Shift = null;
        $scope.formData.LPO = '';
        $scope.formData.RequiredOn = null;
    }

    $scope.refreshProducts = function (siteNum) {
        $scope.customMessage = 'Please Wait...';
        if (!IsBlank.isBlank(siteNum)) {
            $scope.myPromise = $http.post('GetProductsBySiteNumber', { siteNumber: siteNum })
            .success(function (response) {
                $scope.lstProducts = response;
            })
            .error(function (data, status, header, config) {
                $scope.customMessage = '';
                alert('Unable to process the request');
            })
        }
        else {
            $scope.lstProducts = null;
        }

    }

    $scope.placeOrder = function () {
        $scope.customMessage = 'Placing Order...';
        $scope.info = { SiteId: $scope.formData.Site.Id, ProductId: $scope.formData.Product.Id, OrderedQty: 30000, RequestedOn: $scope.formData.RequiredOn, ShiftId: $scope.formData.Shift.Id, LPO: $scope.formData.LPO };
        if ($scope.formData.RequiredOn < new Date().setHours(0, 0, 0, 0)) {
            $scope.dateError = true;
        }
        else {
            $scope.dateError = false;
            $scope.myPromise = $http.post('PlaceOrder', { info: $scope.info })
            .success(function (response) {
                $scope.customMessage = '';
                if (response != 'false') {
                    $scope.newOrder = false;
                }
                else {
                    alert('Unable to process the request');
                }
            })
            .error(function (data, status, header, config) {
                $scope.customMessage = '';
                alert('Unable to process the request');
            })
        }


    }

}]);

app.controller('zplaceordercontroller', ['$scope', '$http', '$state', 'IsBlank', 'Idle', function ($scope, $http, $state, IsBlank, Idle, timer) {

    $scope.onInit = function (lstSites, lstShifts) {
        $scope.formData = {};
        $scope.formData.Quantity = '30,000';
        $scope.lstSites = lstSites;
        $scope.lstShifts = lstShifts;
        $scope.minDate = new Date();
        $scope.customMessage = '';
        $scope.dateError = false;
        $scope.newOrder = true;
    }

    $scope.resetFormData = function () {
        $scope.formData.Site = null;
        $scope.formData.Product = null;
        $scope.formData.Shift = null;
        $scope.formData.LPO = '';
        $scope.formData.RequiredOn = null;
    }

    $scope.refreshProducts = function (siteNum) {
        $scope.customMessage = 'Please Wait...';
        if (!IsBlank.isBlank(siteNum)) {
            $scope.myPromise = $http.post('GetProductsBySiteNumber', { siteNumber: siteNum })
            .success(function (response) {
                $scope.lstProducts = response;
            })
            .error(function (data, status, header, config) {
                $scope.customMessage = '';
                alert('Unable to process the request');
            })
        }
        else {
            $scope.lstProducts = null;
        }

    }

    $scope.placeOrder = function () {
        $scope.customMessage = 'Placing Order...';
        $scope.info = { SiteId: $scope.formData.Site.Id, ProductId: $scope.formData.Product.Id, OrderedQty: 30000, RequestedOn: $scope.formData.RequiredOn, ShiftId: $scope.formData.Shift.Id, LPO: $scope.formData.LPO };
        if ($scope.formData.RequiredOn < new Date().setHours(0, 0, 0, 0)) {
            $scope.dateError = true;
        }
        else {
            $scope.dateError = false;
            $scope.myPromise = $http.post('PlaceOrder', { info: $scope.info })
            .success(function (response) {
                $scope.customMessage = '';
                if (response != 'false') {
                    $scope.newOrder = false;
                }
                else {
                    alert('Unable to process the request');
                }
            })
            .error(function (data, status, header, config) {
                $scope.customMessage = '';
                alert('Unable to process the request');
            })
        }


    }

}]);

/*_________________________________New Online Ordering Code :(Sherin Maliakkal) -16-8-2016________________________________________*/

app.controller("ModalInstanceCtrl", function ($scope, $modalInstance) {

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


});

app.controller("viewallordercalendarcontroller", function ($scope, $http, $state, $stateParams, $modal, $timeout) {



    $scope.onInit = function () {

    };

    $scope.newOrder = function (date) {
        $state.go('order', { mydate: date });
    }
    $scope.updateOrder = function (date) {
        $state.go('changeorder', { mydate: date });
    };

    $scope.showChangeOrderButton = function (day) {
        if (day.hasNotOrdered == false && day.canEdit == true) {
            return true;
        }
        return false;
    }

    $scope.getlistoflicencetypelst = function () {
        $http({
            method: 'GET',
            url: '../OnlineOrder/GetPopupdata'
        }).success(function (data) {
            $('#mbody').html(data.Item1);
            console.log(data);

            //$scope.getlicencetypelist = data;
            //$scope.divIsBusy = false;
        }).error(function (data, status, header, config) {
            SweetAlert.swal("Unable to process your request", "Please contact your administrator", "warning");
            $scope.divIsBusy = false;
        });
    };





});


