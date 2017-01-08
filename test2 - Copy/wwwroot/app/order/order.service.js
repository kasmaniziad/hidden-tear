System.register(['@angular/core', '@angular/http', 'rxjs/Rx', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var core_1, http_1, http_2, Rx_1;
    var OrderService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (_1) {}],
        execute: function() {
            OrderService = (function () {
                function OrderService(http) {
                    this.http = http;
                    this._loginUrl = 'Login/Authenticate';
                    this._resetUrl = 'Login/ResetPassword';
                    this._activateUrl = 'Login/SaveUser';
                }
                OrderService.prototype.authenticateUser = function (emailId, password) {
                    var body = JSON.stringify({ "emailId": emailId, "password": password });
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json;charset=utf-8' });
                    var options = new http_2.RequestOptions({ headers: headers, method: "post" });
                    return this.http.post(this._loginUrl, body, options)
                        .map(this.extracSingletData)
                        .catch(this.handleError);
                };
                OrderService.prototype.resetPassword = function (emailId) {
                    var body = JSON.stringify({ "emailId": emailId });
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json;charset=utf-8' });
                    var options = new http_2.RequestOptions({ headers: headers, method: "post" });
                    return this.http.post(this._resetUrl, body, options)
                        .map(this.extracSingletData)
                        .catch(this.handleError);
                };
                OrderService.prototype.activateUser = function (password, confirmpassword) {
                    var body = JSON.stringify({ "password": password, "confirmPassword": confirmpassword });
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json;charset=utf-8' });
                    var options = new http_2.RequestOptions({ headers: headers, method: "post" });
                    return this.http.post(this._activateUrl, body, options)
                        .map(this.extracSingletData)
                        .catch(this.handleError);
                };
                OrderService.prototype.extractData = function (res) {
                    var body = res.json();
                    return body.data || {};
                };
                OrderService.prototype.extracSingletData = function (res) {
                    return res.json();
                };
                OrderService.prototype.handleError = function (error) {
                    // In a real world app, we might use a remote logging infrastructure
                    // We'd also dig deeper into the error to get a better message
                    var errMsg = (error.message) ? error.message :
                        error.status ? error.status + " - " + error.statusText : 'Server error';
                    console.error(errMsg); // log to console instead
                    return Rx_1.Observable.throw(errMsg);
                };
                OrderService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], OrderService);
                return OrderService;
            }());
            exports_1("OrderService", OrderService);
        }
    }
});
//# sourceMappingURL=order.service.js.map