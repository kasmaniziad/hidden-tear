"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./login/login.component');
var routes = [
    //{
    //    path: 'login',
    //    component: LoginComponent,
    //    //canActivate: [AuthGuard],
    //},
    //{
    //    path: 'access',
    //    component: AccessComponent
    //},
    //{
    //    path: 'order',
    //    component: OrderComponent,
    //},
    //{
    //    path: 'about',
    //    component: AboutComponent,
    //}//,
    //,
    {
        path: '',
        component: login_component_1.LoginComponent,
        pathMatch: 'full',
    },
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map