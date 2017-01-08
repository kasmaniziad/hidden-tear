System.register(['@angular/router', './index/index.component', './login/login.component', './login/access.component', './order/order.component', './guard/auth.guard'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, index_component_1, login_component_1, access_component_1, order_component_1, auth_guard_1;
    var routes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (index_component_1_1) {
                index_component_1 = index_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (access_component_1_1) {
                access_component_1 = access_component_1_1;
            },
            function (order_component_1_1) {
                order_component_1 = order_component_1_1;
            },
            function (auth_guard_1_1) {
                auth_guard_1 = auth_guard_1_1;
            }],
        execute: function() {
            routes = [
                {
                    path: 'login',
                    component: login_component_1.LoginComponent,
                },
                {
                    path: 'access',
                    component: access_component_1.AccessComponent
                },
                {
                    path: 'order',
                    component: order_component_1.OrderComponent,
                },
                {
                    path: 'about',
                    component: index_component_1.AboutComponent,
                } //,
                ,
                {
                    path: '',
                    component: login_component_1.LoginComponent,
                    pathMatch: 'full',
                    canActivate: [auth_guard_1.AuthGuard],
                },
            ];
            exports_1("routing", routing = router_1.RouterModule.forRoot(routes));
        }
    }
});
//# sourceMappingURL=app.routes.js.map