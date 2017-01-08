System.register(['@angular/core', '@angular/router', './login.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, login_service_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(_loginService, router) {
                    this._loginService = _loginService;
                    this.router = router;
                    this.resetPassword = function () {
                        this.removeErrors();
                        this.isProcessing = true;
                        if (this.isBlank(this.emailId)) {
                            alert('Please fill blank fields');
                            return;
                        }
                        else {
                            this.resetUserPassword();
                        }
                    };
                    this.initializeObjectValues();
                }
                LoginComponent.prototype.initializeObjectValues = function () {
                    this.error1 = '';
                    this.error2 = '';
                    this.error3 = '';
                    this.emailId = '';
                    this.password = '';
                    this.confirmpassword = '';
                    this.isProcessing = false;
                    this.forgotPassword = false;
                    this.emailSent = false;
                    this.processingMessage = 'Authenticating';
                };
                LoginComponent.prototype.ngOnInit = function () {
                    this.initializeObjectValues();
                };
                LoginComponent.prototype.isBlank = function (obj) {
                    if (obj == undefined || obj == null || obj.toString().trim() == '') {
                        return true;
                    }
                    return false;
                };
                LoginComponent.prototype.removeErrors = function () {
                    this.error1 = '';
                    this.error2 = '';
                    this.error3 = '';
                };
                LoginComponent.prototype.forgotPasswordClick = function () {
                    if (this.isProcessing == false) {
                        this.forgotPassword = true;
                    }
                };
                LoginComponent.prototype.autheticateUser = function () {
                    var _this = this;
                    this.isProcessing = true;
                    this._loginService.authenticateUser(this.emailId, this.password).subscribe(function (data) { return _this.authResponse = data; }, function (error) {
                        setTimeout(function () {
                            _this.isProcessing = false;
                            _this.error1 = '*Unable to process request at this moment';
                        }, 500);
                    }, function () {
                        //alert(this.authResponse);
                        if (_this.authResponse == true) {
                            _this.processingMessage = 'Redirecting...';
                            _this.removeErrors();
                            _this.router.navigate(['/order']);
                        }
                        else {
                            _this.isProcessing = false;
                            _this.error1 = "*Email Id and Password does not match";
                            _this.error2 = "*Please provide valid credentials";
                        }
                        console.log("Job Done Post !");
                    });
                };
                LoginComponent.prototype.resetUserPassword = function () {
                    var _this = this;
                    this._loginService.resetPassword(this.emailId).subscribe(function (data) { return _this.authResponse = data; }, function (error) {
                        setTimeout(function () {
                            _this.isProcessing = false;
                            _this.error3 = '*Unable to process request';
                        }, 500);
                    }, function () {
                        if (_this.authResponse != false) {
                            _this.removeErrors();
                            _this.emailSent = true;
                        }
                        else {
                            _this.error3 = '*Email Address Not Found';
                        }
                        setTimeout(function () {
                            _this.isProcessing = false;
                            _this.error3 = '*Unable to process request';
                        }, 500);
                        console.log("Job Done Post !");
                    });
                };
                LoginComponent.prototype.login = function () {
                    this.isProcessing = true;
                    this.processingMessage = 'Authenticating...';
                    this.removeErrors();
                    var canLogin = true;
                    if (this.isBlank(this.emailId)) {
                        canLogin = false;
                        this.error1 = "*Please Enter Valid Email Address";
                    }
                    if (this.isBlank(this.password)) {
                        canLogin = false;
                        this.error2 = "*Please Enter Valid Password";
                    }
                    if (canLogin) {
                        this.autheticateUser();
                    }
                };
                LoginComponent.prototype.ngOnDestroy = function () {
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'my-home-component',
                        templateUrl: 'Login/LoginContent',
                        providers: [login_service_1.LoginService]
                    }), 
                    __metadata('design:paramtypes', [login_service_1.LoginService, router_1.Router])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map