import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';

@Component({
    selector: 'my-home-component',
    templateUrl: 'Login/Access',
    providers: [LoginService]
})
export class AccessComponent implements OnInit, OnDestroy {

    error1: string; error2: string; error3: string;
    emailId: string; password: string; confirmpassword: string;
    isProcessing: boolean; forgotPassword: boolean;
    processingMessage: string; authResponse: boolean; emailSent: boolean;
    registerLink: any;

    constructor(private _loginService: LoginService, private route: ActivatedRoute) {
        this.initializeObjectValues();
    }

    initializeObjectValues() {
        this.error1 = '';
        this.error2 = '';
        this.error3 = '';

        this.emailId = '';
        this.password = '';
        this.confirmpassword = '';
        this.isProcessing = false;
        this.forgotPassword = false;
        this.emailSent = false;
    }

    ngOnInit() {
        alert('abc');
        this.registerLink = this.route
            .queryParams
            .map(params => params['registerlink'] || 'None');
        alert(this.registerLink);
        this.initializeObjectValues();
    }

    isBlank(obj) {
        if (obj == undefined || obj == null || obj.toString().trim() == '') {
            return true;
        }
        return false;
    }

    removeErrors() {
        this.error1 = '';
        this.error2 = '';
        this.error3 = '';
    }

    forgotPasswordClick() {
        if (this.isProcessing == false) {
            this.forgotPassword = true;
        }
    }

    autheticateUser() {
        this._loginService.activateUser(this.password, this.confirmpassword).subscribe(
            data => this.authResponse = data,
            error => {
                setTimeout(() => {
                    this.isProcessing = false;
                    this.error1 = '*Unable to process request';
                }, 500);
            },
            () => {
                if (this.authResponse != false) {
                    this.emailId = this.emailId.replace(/"/g, '');
                    //window.location.href = encodeURI(baseUrl + 'Login/Default?ldo=' + this.emailId);
                }
                else {
                    this.error1 = '*Login link has expired';
                }

                setTimeout(() => {
                    this.isProcessing = false;
                }, 500);

                console.log("Job Done Post !");
            }
        );
    }

    login() {
        this.isProcessing = true;
        this.removeErrors();
        if (this.isBlank(this.password) || this.isBlank(this.confirmpassword)) {
            this.error1 = '*Please provide password';
            return;
        }
        else {
            if (!(this.password === this.confirmpassword)) {
                setTimeout(() => {
                    this.isProcessing = false;
                    this.error1 = '*Passwords do not match';
                }, 400);
            }
            else if (this.password.length < 8 || this.confirmpassword.length < 8) {
                setTimeout(() => {
                    this.isProcessing = false;
                    this.error1 = '*Password should be 8 characters long';
                }, 400);
            }
            else {
                this.autheticateUser();
            }
        }

    }
    
    ngOnDestroy() {

    }


}