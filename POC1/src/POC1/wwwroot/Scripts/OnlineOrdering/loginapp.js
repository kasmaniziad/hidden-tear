var loginapp = angular.module('woqodlogin', [])

loginapp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
}])
/*Local*/
//loginapp.constant('baseUrl', 'http://localhost:59870/');
/*test*/
loginapp.constant('baseUrl', 'http://woqv-webdev.woqod.com/Fuel/');
/*Production*/
//loginapp.constant('baseUrl', 'https://www.woqod.com/Fuel/');

loginapp.controller("accesscontroller", ['$scope', '$http', 'baseUrl', '$timeout', function ($scope, $http, baseUrl, $timeout) {

    $scope.onInit = function (emailId) {
        $scope.emailId = emailId;
        $scope.password = '';
        $scope.confirmpassword = '';
        $scope.removeErrors();
        $scope.isProcessing = false;
    }

    $scope.removeErrors = function () {
        $scope.error1 = '';
        $scope.error2 = '';
        $scope.error3 = '';
    }

    $scope.isBlank = function (obj) {
        if (angular.isUndefined(obj) || obj == null || obj.toString().trim() == '') {
            return true;
        }
        return false;
    }

    $scope.login = function () {
        $scope.isProcessing = true;
        $scope.removeErrors();
        if ($scope.isBlank($scope.password) || $scope.isBlank($scope.confirmpassword)) {
            $scope.error1 = '*Please provide password';
            return;
        }
        else {
            if (!($scope.password === $scope.confirmpassword)) {
                $timeout(function () {
                    $scope.isProcessing = false;
                    $scope.error1 = '*Passwords do not match';
                }, 400);
            }
            else if ($scope.password.length < 8 || $scope.confirmpassword.length < 8) {
                $timeout(function () {
                    $scope.isProcessing = false;
                    $scope.error1 = '*Password should be 8 characters long';
                }, 400);
            }
            else {
                // Login
                $http.post(baseUrl + "Login/SaveUser", { password: $scope.password, confirmPassword: $scope.confirmpassword })
                .success(function (response) {
                    if (response != 'false') {
                        $scope.emailId = response;
                        $scope.emailId = $scope.emailId.replace(/"/g, '');
                        window.location.href = encodeURI(baseUrl + 'Login/Default?ldo=' + $scope.emailId);
                    }
                    else {
                        $scope.error1 = '*Login link has expired';
                    }

                    $timeout(function () {
                        $scope.isProcessing = false;
                    }, 500);
                })
               .error(function (data, status, header, config) {
                   $timeout(function () {
                       $scope.isProcessing = false;
                       $scope.error1 = '*Unable to process request';
                   }, 500);
               });
            }
        }

    }

}]);

loginapp.controller("logincontroller", ['$scope', '$http', 'baseUrl', '$timeout', function ($scope, $http, baseUrl, $timeout) {

    $scope.onInit = function (emailId) {
        $scope.emailId = emailId;
        $scope.password = '';
        $scope.forgotPassword = false;
        $scope.removeErrors();
        $scope.isProcessing = false;
        $scope.emailSent = false;
    }

    $scope.removeErrors = function () {
        $scope.error1 = '';
        $scope.error2 = '';
        $scope.error3 = '';
    }

    $scope.forgotPasswordClick = function () {
        if ($scope.isProcessing == false) {
            $scope.forgotPassword = true;
        }
    }

    $scope.isBlank = function (obj) {
        if (angular.isUndefined(obj) || obj == null || obj.toString().trim() == '') {
            return true;
        }
        return false;
    }

    $scope.login = function () {
        $scope.isProcessing = true;
        $scope.processingMessage = 'Authenticating...';
        $scope.removeErrors();
        var canLogin = true;

        if ($scope.isBlank($scope.emailId)) {
            canLogin = false;
            $scope.error1 = "*Please Enter Valid Email Address";
        }

        if ($scope.isBlank($scope.password)) {
            canLogin = false;
            $scope.error2 = "*Please Enter Valid Password";
        }

        if (canLogin) {
            // Login
            $http.post(baseUrl + "Login/Authenticate", { emailId: $scope.emailId, password: $scope.password })
            .success(function (response) {
                if (response != 'false') {
                    $scope.processingMessage = 'Redirecting...';
                    $scope.result = response;
                    $scope.removeErrors();
                    window.location.href = encodeURI(baseUrl + 'Home/UserProfile');
                }
                else {
                    $scope.isProcessing = false;
                    $scope.error1 = "*Email Id and Password does not match";
                    $scope.error2 = "*Please provide valid credentials";
                }

                $scope.processingMessage = 'Redirecting...';
                //$timeout(function () {
                //    $scope.isProcessing = false;
                //}, 500);
            })
           .error(function (data, status, header, config) {
               $timeout(function () {
                   $scope.isProcessing = false;
                   $scope.error1 = '*Unable to process request at this moment';
               }, 500);
           });
        }

    }

    $scope.resetPassword = function () {
        $scope.removeErrors();
        $scope.isProcessing = true;
        if ($scope.isBlank($scope.emailId)) {
            alert('Please fill blank fields');
            return;
        }
        else {
            // Login
            $http.post(baseUrl + "Login/ResetPassword", { emailId: $scope.emailId })
            .success(function (response) {
                if (response != 'false') {
                    $scope.result = response;
                    $scope.removeErrors();
                    $scope.emailSent = true;
                }
                else {
                    $scope.error3 = '*Email Address Not Found';
                }
                $timeout(function () {
                    $scope.isProcessing = false;
                }, 500);
            })
           .error(function (data, status, header, config) {
               $timeout(function () {
                   $scope.isProcessing = false;
                   $scope.error3 = '*Unable to process request';
               }, 500);

           });
        }

    }

}]);