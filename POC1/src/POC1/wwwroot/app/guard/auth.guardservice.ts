import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuardService {

    private _isLoggedIn = 'Login/IsLoggedIn';
    private _emailToken = 'Login/GetTokenEmail';

    constructor(private http: Http) {
    }

    isLoggedIn() {
        let body = null;
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        let options = new RequestOptions({ headers: headers, method: "post" });

        return this.http.post(this._isLoggedIn, body, options)
            .map(this.extracSingletData)
            .catch(this.handleError);
    }

    getEmailByToken(token) {
        let body = JSON.stringify({ "ldo": token });
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        let options = new RequestOptions({ headers: headers, method: "post" });

        return this.http.post(this._emailToken, body, options)
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