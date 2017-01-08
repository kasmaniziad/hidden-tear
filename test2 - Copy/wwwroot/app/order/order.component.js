System.register(['@angular/core', '@angular/router', './order.service', '../login/login.service'], function(exports_1, context_1) {
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
    var core_1, router_1, order_service_1, login_service_1;
    var OrderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (order_service_1_1) {
                order_service_1 = order_service_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            }],
        execute: function() {
            OrderComponent = (function () {
                function OrderComponent(_orderService, _loginService, router) {
                    this._orderService = _orderService;
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
                OrderComponent.prototype.initializeObjectValues = function () {
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
                OrderComponent.prototype.ngOnInit = function () {
                    this.initializeObjectValues();
                    var s = document.createElement("script");
                    s.type = "text/javascript";
                    s.src = "_catalogs/masterpage/xPortal/style%20library/common/Plugins/ferroMenu/jquery.ferro.ferroMenu-1.2.3.min.js";
                    document.body.appendChild(s);
                    var woq = document.createElement("script");
                    woq.type = "text/javascript";
                    woq.src = "_catalogs/masterpage/xPortal/style%20library/common/Plugins/Generic/WOQOD.Home.js";
                    document.body.appendChild(woq);
                    //this.elementRef.nativeElement.appendChild(s);
                };
                OrderComponent.prototype.isBlank = function (obj) {
                    if (obj == undefined || obj == null || obj.toString().trim() == '') {
                        return true;
                    }
                    return false;
                };
                OrderComponent.prototype.removeErrors = function () {
                    this.error1 = '';
                    this.error2 = '';
                    this.error3 = '';
                };
                OrderComponent.prototype.forgotPasswordClick = function () {
                    if (this.isProcessing == false) {
                        this.forgotPassword = true;
                    }
                };
                OrderComponent.prototype.logout = function () {
                    var _this = this;
                    this.isProcessing = true;
                    this._loginService.logout().subscribe(function (data) { return _this.authResponse = data; }, function (error) {
                        setTimeout(function () {
                            _this.isProcessing = false;
                            _this.error1 = '*Unable to process request at this moment';
                        }, 500);
                    }, function () {
                        if (_this.authResponse == true) {
                            _this.router.navigate(['/login']);
                        }
                        else {
                            _this.isProcessing = false;
                        }
                    });
                    this.router.navigate(['/login']);
                };
                OrderComponent.prototype.autheticateUser = function () {
                    var _this = this;
                    this._orderService.authenticateUser(this.emailId, this.password).subscribe(function (data) { return _this.authResponse = data; }, function (error) {
                        setTimeout(function () {
                            _this.isProcessing = false;
                            _this.error1 = '*Unable to process request at this moment';
                        }, 500);
                    }, function () {
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
                OrderComponent.prototype.resetUserPassword = function () {
                    var _this = this;
                    this._orderService.resetPassword(this.emailId).subscribe(function (data) { return _this.authResponse = data; }, function (error) {
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
                OrderComponent.prototype.login = function () {
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
                OrderComponent.prototype.ngOnDestroy = function () {
                };
                OrderComponent = __decorate([
                    core_1.Component({
                        selector: 'orderComponent',
                        templateUrl: 'Home/UserProfile',
                        providers: [order_service_1.OrderService]
                    }), 
                    __metadata('design:paramtypes', [order_service_1.OrderService, login_service_1.LoginService, router_1.Router])
                ], OrderComponent);
                return OrderComponent;
            }());
            exports_1("OrderComponent", OrderComponent);
        }
    }
});
//# sourceMappingURL=order.component.js.map