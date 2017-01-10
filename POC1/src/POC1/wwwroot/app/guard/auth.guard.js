"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var auth_guardservice_1 = require('./auth.guardservice');
var AuthGuard = (function () {
    function AuthGuard(router, authGuardService) {
        this.router = router;
        this.authGuardService = authGuardService;
        var id = 1;
        //alert('guard invoked');
    }
    AuthGuard.prototype.getParameterByName = function (name, url) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };
    AuthGuard.prototype.isBlank = function (obj) {
        if (obj == undefined || obj == null || obj.toString().trim() == '') {
            return true;
        }
        return false;
    };
    AuthGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        //alert('guard called');
        var registeringToken = this.getParameterByName('ldo', state.url);
        if (!this.isBlank(registeringToken)) {
            this.authGuardService.getEmailByToken(registeringToken).subscribe(function (data) { return _this.authResponse = data; }, function (error) {
                _this.router.navigate(['/login']);
            }, function () {
                //alert(this.authResponse);
                if (_this.authResponse == false) {
                    _this.router.navigate(['/login']);
                }
                else {
                    var navigationExtras = {
                        queryParams: { 'registerlink': _this.authResponse }
                    };
                    _this.router.navigate(['/access'], navigationExtras);
                }
            });
        }
        else {
            this.authGuardService.isLoggedIn().subscribe(function (data) { return _this.authResponse = data; }, function (error) {
                _this.router.navigate(['/login']);
            }, function () {
                //alert(this.authResponse);
                if (_this.authResponse == false) {
                    _this.router.navigate(['/login']);
                }
                else {
                    _this.router.navigate(['/order']);
                }
            });
        }
        return false;
    };
    AuthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, auth_guardservice_1.AuthGuardService])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map