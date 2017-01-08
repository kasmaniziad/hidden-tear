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
    var AccessComponent;
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
            AccessComponent = (function () {
                function AccessComponent(_loginService, route) {
                    this._loginService = _loginService;
                    this.route = route;
                    this.initializeObjectValues();
                }
                AccessComponent.prototype.initializeObjectValues = function () {
                    this.error1 = '';
                    this.error2 = '';
                    this.error3 = '';
                    this.emailId = '';
                    this.password = '';
                    this.confirmpassword = '';
                    this.isProcessing = false;
                    this.forgotPassword = false;
                    this.emailSent = false;
                };
                AccessComponent.prototype.ngOnInit = function () {
                    alert('abc');
                    this.registerLink = this.route
                        .queryParams
                        .map(function (params) { return params['registerlink'] || 'None'; });
                    alert(this.registerLink);
                    this.initializeObjectValues();
                };
                AccessComponent.prototype.isBlank = function (obj) {
                    if (obj == undefined || obj == null || obj.toString().trim() == '') {
                        return true;
                    }
                    return false;
                };
                AccessComponent.prototype.removeErrors = function () {
                    this.error1 = '';
                    this.error2 = '';
                    this.error3 = '';
                };
                AccessComponent.prototype.forgotPasswordClick = function () {
                    if (this.isProcessing == false) {
                        this.forgotPassword = true;
                    }
                };
                AccessComponent.prototype.autheticateUser = function () {
                    var _this = this;
                    this._loginService.activateUser(this.password, this.confirmpassword).subscribe(function (data) { return _this.authResponse = data; }, function (error) {
                        setTimeout(function () {
                            _this.isProcessing = false;
                            _this.error1 = '*Unable to process request';
                        }, 500);
                    }, function () {
                        if (_this.authResponse != false) {
                            _this.emailId = _this.emailId.replace(/"/g, '');
                        }
                        else {
                            _this.error1 = '*Login link has expired';
                        }
                        setTimeout(function () {
                            _this.isProcessing = false;
                        }, 500);
                        console.log("Job Done Post !");
                    });
                };
                AccessComponent.prototype.login = function () {
                    var _this = this;
                    this.isProcessing = true;
                    this.removeErrors();
                    if (this.isBlank(this.password) || this.isBlank(this.confirmpassword)) {
                        this.error1 = '*Please provide password';
                        return;
                    }
                    else {
                        if (!(this.password === this.confirmpassword)) {
                            setTimeout(function () {
                                _this.isProcessing = false;
                                _this.error1 = '*Passwords do not match';
                            }, 400);
                        }
                        else if (this.password.length < 8 || this.confirmpassword.length < 8) {
                            setTimeout(function () {
                                _this.isProcessing = false;
                                _this.error1 = '*Password should be 8 characters long';
                            }, 400);
                        }
                        else {
                            this.autheticateUser();
                        }
                    }
                };
                AccessComponent.prototype.ngOnDestroy = function () {
                };
                AccessComponent = __decorate([
                    core_1.Component({
                        selector: 'my-home-component',
                        templateUrl: 'Login/Access',
                        providers: [login_service_1.LoginService]
                    }), 
                    __metadata('design:paramtypes', [login_service_1.LoginService, router_1.ActivatedRoute])
                ], AccessComponent);
                return AccessComponent;
            }());
            exports_1("AccessComponent", AccessComponent);
        }
    }
});
//# sourceMappingURL=access.component.js.map