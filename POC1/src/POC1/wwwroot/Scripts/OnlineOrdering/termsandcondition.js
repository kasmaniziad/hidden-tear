
var app = angular.module('termsandconditions', ['ui.bootstrap', 'cgBusy', 'ui.router', 'oc.lazyLoad', 'ngIdle'])

/*Local*/
//app.constant('baseUrl', 'http://localhost:59870/');
/*test*/
app.constant('baseUrl', 'http://woqv-webdev.woqod.com/Fuel/');
/*Production*/
//app.constant('baseUrl', 'https://www.woqod.com/Fuel/');

function modalController($scope, message, status, $modalInstance) {
    $scope.message = message;
    $scope.status = status;
}


app.controller('maincontroller', ['$scope', '$http', '$state', '$interval', '$modal', '$timeout', 'baseUrl', function ($scope, $http, $state, $interval, $modal, $timeout, baseUrl) {

    $scope.onInit = function () {
        $scope.data = { progress: 0 };
        //$scope.divIsBusy = true;
        //alert('Terms And Conditions');

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

    $scope.accept = function () {
        $scope.showBusyDiv(true);
        $http.post(baseUrl + 'Ordering/UpdateUserAgreementStatus')
        .success(function (response) {
            if (response == 'true') {
                $timeout(function () {
                    //$scope.showBusyDiv(false);
                    window.location.href = baseUrl + 'Home/UserProfile';
                }, 2000);
                
            }
            else {
                $scope.logout();
            }
            
        })
        .error(function (data, status, header, config) {
            $scope.logout();
        });
    }

    $scope.logout = function () {
        $scope.showBusyDiv(false);
        $scope.modalInstance = $modal.open({
            templateUrl: baseUrl + 'Login/CustomModal',
            size: 'sm',
            controller: modalController,
            resolve: {
                message: function () {
                    return "Unable to process request !!!";
                },
                status: function () {
                    return 2;
                }

            }
        });

        $timeout(function () {
            $scope.modalInstance.dismiss('cancel');
            window.location.href = baseUrl + "Login/Logout";
        }, 1000);
    }

    $scope.cancel = function () {
        window.location.href = baseUrl + "Login/Logout";
    }
}]);