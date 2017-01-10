import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'my-home-component',
    template: `<h2>Index</h2>`
})
export class HomeComponent implements OnInit, OnDestroy {
    ngOnInit() {
        
    }

    ngOnDestroy() {
        
    }
}

@Component({
    template: `<h2>About</h2>`
})
export class AboutComponent { }