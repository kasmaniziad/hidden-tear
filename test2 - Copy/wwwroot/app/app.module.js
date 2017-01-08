System.register(['@angular/core', '@angular/platform-browser', '@angular/forms', '@angular/http', './app.routes', './app.component', './index/index.component', './login/login.component', './login/access.component', './guard/auth.guardservice', './guard/auth.guard', './order/order.component', './order/order.service', './login/login.service'], function(exports_1, context_1) {
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
    var core_1, platform_browser_1, forms_1, http_1, app_routes_1, app_component_1, index_component_1, index_component_2, login_component_1, access_component_1, auth_guardservice_1, auth_guard_1, order_component_1, order_service_1, login_service_1;
    var AppModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_routes_1_1) {
                app_routes_1 = app_routes_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (index_component_1_1) {
                index_component_1 = index_component_1_1;
                index_component_2 = index_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (access_component_1_1) {
                access_component_1 = access_component_1_1;
            },
            function (auth_guardservice_1_1) {
                auth_guardservice_1 = auth_guardservice_1_1;
            },
            function (auth_guard_1_1) {
                auth_guard_1 = auth_guard_1_1;
            },
            function (order_component_1_1) {
                order_component_1 = order_component_1_1;
            },
            function (order_service_1_1) {
                order_service_1 = order_service_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            }],
        execute: function() {
            AppModule = (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    core_1.NgModule({
                        imports: [platform_browser_1.BrowserModule, app_routes_1.routing, forms_1.FormsModule, http_1.HttpModule, http_1.JsonpModule],
                        declarations: [app_component_1.AppComponent, login_component_1.LoginComponent, index_component_1.HomeComponent, index_component_2.AboutComponent, access_component_1.AccessComponent, order_component_1.OrderComponent],
                        bootstrap: [app_component_1.AppComponent],
                        providers: [auth_guard_1.AuthGuard, auth_guardservice_1.AuthGuardService, order_service_1.OrderService, login_service_1.LoginService]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppModule);
                return AppModule;
            }());
            exports_1("AppModule", AppModule);
        }
    }
});
//# sourceMappingURL=app.module.js.map