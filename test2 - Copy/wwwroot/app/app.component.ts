import { Component, OnInit, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Component({
    selector: 'app',
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {
    pageTitle: string = 'Angular 2';

    constructor(private router: Router) {
        //this.router.navigate(['/about']);
    }

    ngOnInit() {
        //alert('abc');
    }


    ngOnDestroy() {

    }
}
