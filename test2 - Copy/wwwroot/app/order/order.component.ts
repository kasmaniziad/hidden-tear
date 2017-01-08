import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from './order.service';
import { LoginService} from '../login/login.service';

@Component({
    selector: 'orderComponent',
    templateUrl: 'Home/UserProfile',
    providers: [OrderService]
})
export class OrderComponent implements OnInit, OnDestroy {

    error1: string; error2: string; error3: string;
    emailId: string; password: string; confirmpassword: string;
    isProcessing: boolean; forgotPassword: boolean;
    processingMessage: string; authResponse: boolean; emailSent: boolean;

    constructor(private _orderService: OrderService, private _loginService: LoginService, private router: Router) {
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
        this.initializeObjectValues();

        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "_catalogs/masterpage/xPortal/style%20library/common/Plugins/ferroMenu/jquery.ferro.ferroMenu-1.2.3.min.js";
        document.body.appendChild(s);

        var woq = document.createElement("script");
        woq.type = "text/javascript";
        woq.src = "_catalogs/masterpage/xPortal/style%20library/common/Plugins/Generic/WOQOD.Home.js";
        document.body.appendChild(woq);


        //this.elementRef.nativeElement.appendChild(s);

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

    logout() {
        this.isProcessing = true;
        this._loginService.logout().subscribe(
            data => this.authResponse = data,
            error => {
                setTimeout(() => {
                    this.isProcessing = false;
                    this.error1 = '*Unable to process request at this moment';
                }, 500);
            },
            () => {
                if (this.authResponse == true) {
                    this.router.navigate(['/login'])
                }
                else {
                    this.isProcessing = false;
                }
            }
        );
        this.router.navigate(['/login'])
    }

    autheticateUser() {
        this._orderService.authenticateUser(this.emailId, this.password).subscribe(
            data => this.authResponse = data,
            error => {
                setTimeout(() => {
                    this.isProcessing = false;
                    this.error1 = '*Unable to process request at this moment';
                }, 500);
            },
            () => {
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
        this._orderService.resetPassword(this.emailId).subscribe(
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