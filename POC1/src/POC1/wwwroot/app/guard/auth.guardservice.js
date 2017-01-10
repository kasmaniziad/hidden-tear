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
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
var AuthGuardService = (function () {
    function AuthGuardService(http) {
        this.http = http;
        this._isLoggedIn = 'Login/IsLoggedIn';
        this._emailToken = 'Login/GetTokenEmail';
    }
    AuthGuardService.prototype.isLoggedIn = function () {
        var body = null;
        var headers = new http_2.Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        var options = new http_2.RequestOptions({ headers: headers, method: "post" });
        return this.http.post(this._isLoggedIn, body, options)
            .map(this.extracSingletData)
            .catch(this.handleError);
    };
    AuthGuardService.prototype.getEmailByToken = function (token) {
        var body = JSON.stringify({ "ldo": token });
        var headers = new http_2.Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        var options = new http_2.RequestOptions({ headers: headers, method: "post" });
        return this.http.post(this._emailToken, body, options)
            .map(this.extracSingletData)
            .catch(this.handleError);
    };
    AuthGuardService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    AuthGuardService.prototype.extracSingletData = function (res) {
        return res.json();
    };
    AuthGuardService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Rx_1.Observable.throw(errMsg);
    };
    AuthGuardService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthGuardService);
    return AuthGuardService;
}());
exports.AuthGuardService = AuthGuardService;
//# sourceMappingURL=auth.guardservice.js.map