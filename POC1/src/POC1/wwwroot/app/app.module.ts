import { routing } from './app.routes'; // ROUTING HERE!
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent }   from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [BrowserModule, routing, FormsModule, HttpModule, JsonpModule],
    declarations: [AppComponent, LoginComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }