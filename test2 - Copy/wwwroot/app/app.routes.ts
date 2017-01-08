import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './index/index.component';
import { AboutComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { AccessComponent } from './login/access.component';
import { OrderComponent } from './order/order.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        //canActivate: [AuthGuard],
    },
    {
        path: 'access',
        component: AccessComponent
    },
    {
        path: 'order',
        component: OrderComponent,
    },
    {
        path: 'about',
        component: AboutComponent,
    }//,
    ,{
        path: '',
        component: LoginComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
    },

    // otherwise redirect to home
    //{ path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes);