import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';

@Component({
    selector: 'my-home-component',
    templateUrl: 'Login/LoginContent',
    providers: [LoginService]
})
export class LoginComponent implements OnInit, OnDestroy {

    error1: string; error2: string; error3: string;
    emailId: string; password: string; confirmpassword: string;
    isProcessing: boolean; forgotPassword: boolean;
    processingMessage: string; authResponse: boolean; emailSent: boolean;

    constructor(private _loginService: LoginService, private router: Router) {
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
        this.processingMessage = 'Authenticating';
    }

    ngOnInit() {
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
        this.isProcessing = true;
        this._loginService.authenticateUser(this.emailId, this.password).subscribe(
            data => this.authResponse = data,
            error => {
                setTimeout(() => {
                    this.isProcessing = false;
                    this.error1 = '*Unable to process request at this moment';
                }, 500);
            },
            () => {
                //alert(this.authResponse);
                if (this.authResponse == true) {
                    this.processingMessage = 'Redirecting...';
                    this.removeErrors();
                    this.router.navigate(['/order'])
                }
                else {
                    this.isProcessing = false;
                    this.error1 = "*Email Id and Password does not match";
                    this.error2 = "*Please provide valid credentials";
                }

                console.log("Job Done Post !")
            }
        );
    }

    resetUserPassword() {
        this._loginService.resetPassword(this.emailId).subscribe(
            data => this.authResponse = data,
            error => {
                setTimeout(() => {
                    this.isProcessing = false;
                    this.error3 = '*Unable to process request';
                }, 500);
            },
            () => {

                if (this.authResponse != false) {
                    this.removeErrors();
                    this.emailSent = true;
                }
                else {
                    this.error3 = '*Email Address Not Found';
                }

                setTimeout(() => {
                    this.isProcessing = false;
                    this.error3 = '*Unable to process request';
                }, 500);
                console.log("Job Done Post !")
            }
        );
    }

    login() {
        this.isProcessing = true;
        this.processingMessage = 'Authenticating...';
        this.removeErrors();
        var canLogin = true;

        if (this.isBlank(this.emailId)) {
            canLogin = false;
            this.error1 = "*Please Enter Valid Email Address";
        }

        if (this.isBlank(this.password)) {
            canLogin = false;
            this.error2 = "*Please Enter Valid Password";
        }

        if (canLogin) {
            this.autheticateUser();

        }

    }

    resetPassword = function () {
        this.removeErrors();
        this.isProcessing = true;
        if (this.isBlank(this.emailId)) {
            alert('Please fill blank fields');
            return;
        }
        else {
            this.resetUserPassword();
        }

    }



    ngOnDestroy() {

    }


}