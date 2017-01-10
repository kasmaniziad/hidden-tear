import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

    private _loginUrl = 'Login/Authenticate';
    private _resetUrl = 'Login/ResetPassword';
    private _activateUrl = 'Login/SaveUser';
    private _logoutUrl = 'Login/Logout';

    constructor(private http: Http) {
    }

    logout() {
        let body = '';
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        let options = new RequestOptions({ headers: headers, method: "post" });

        return this.http.post(this._logoutUrl, body, options)
            .map(this.extracSingletData)
            .catch(this.handleError);
    }

    authenticateUser(emailId: string, password: string) {
        let body = JSON.stringify({ "emailId": emailId, "password": password });
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        let options = new RequestOptions({ headers: headers, method: "post" });

        return this.http.post(this._loginUrl, body, options)
            .map(this.extracSingletData)
            .catch(this.handleError);
    }

    resetPassword(emailId: string) {
        let body = JSON.stringify({ "emailId": emailId });
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        let options = new RequestOptions({ headers: headers, method: "post" });

        return this.http.post(this._resetUrl, body, options)
            .map(this.extracSingletData)
            .catch(this.handleError);
    }

    activateUser(password: string, confirmpassword: string) {
        let body = JSON.stringify({ "password": password, "confirmPassword": confirmpassword });
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        let options = new RequestOptions({ headers: headers, method: "post" });

        return this.http.post(this._activateUrl, body, options)
            .map(this.extracSingletData)
            .catch(this.handleError);
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private extracSingletData(res: Response) {
        return res.json();
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}