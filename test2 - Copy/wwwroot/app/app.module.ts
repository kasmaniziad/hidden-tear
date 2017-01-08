import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { routing } from './app.routes'; // ROUTING HERE!

import { AppComponent }  from './app.component';
import { HomeComponent } from './index/index.component';
import { AboutComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { AccessComponent } from './login/access.component';
import { AuthGuardService } from './guard/auth.guardservice';
import { AuthGuard } from './guard/auth.guard';
import { OrderComponent } from './order/order.component';
import { OrderService } from './order/order.service';
import { LoginService } from './login/login.service';

@NgModule({
    imports: [BrowserModule, routing, FormsModule, HttpModule, JsonpModule],
    declarations: [AppComponent, LoginComponent, HomeComponent, AboutComponent, AccessComponent, OrderComponent],
    bootstrap: [AppComponent],
    providers: [AuthGuard, AuthGuardService, OrderService, LoginService]
})
export class AppModule { }