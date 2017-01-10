import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
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
        component: LoginComponent,
        pathMatch: 'full',
        //canActivate: [AuthGuard],
    },

    // otherwise redirect to home
    //{ path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes);