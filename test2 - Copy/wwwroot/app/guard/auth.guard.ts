import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { AuthGuardService } from './auth.guardservice'

@Injectable()
export class AuthGuard implements CanActivate {
    authResponse: boolean;

    constructor(private router: Router, private authGuardService: AuthGuardService) {
        var id = 1;
        //alert('guard invoked');
    }

    getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    isBlank(obj) {
        if (obj == undefined || obj == null || obj.toString().trim() == '') {
            return true;
        }
        return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //alert('guard called');
        let registeringToken: string = this.getParameterByName('ldo', state.url);
        if (!this.isBlank(registeringToken)) {
            this.authGuardService.getEmailByToken(registeringToken).subscribe(
                data => this.authResponse = data,
                error => {
                    this.router.navigate(['/login'])
                },
                () => {
                    //alert(this.authResponse);
                    if (this.authResponse == false) {
                        this.router.navigate(['/login'])
                    }
                    else {
                        let navigationExtras: NavigationExtras = {
                            queryParams: { 'registerlink': this.authResponse }
                        };
                        this.router.navigate(['/access'], navigationExtras);
                    }
                }
            );
        }
        else {
            this.authGuardService.isLoggedIn().subscribe(
                data => this.authResponse = data,
                error => {
                    this.router.navigate(['/login'])
                },
                () => {
                    //alert(this.authResponse);
                    if (this.authResponse == false) {
                        this.router.navigate(['/login'])
                    }
                    else {
                        this.router.navigate(['/order'])
                    }
                }
            );
        }
        return false;
    }
}