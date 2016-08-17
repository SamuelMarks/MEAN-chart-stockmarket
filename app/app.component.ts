import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    directives: [ROUTER_DIRECTIVES],
    selector: 'my-app',
    styles: [`h1 {
	color: white;
	background: darkgray;
	padding: 20px;
}
`],
    template: `
<router-outlet></router-outlet>

<a [routerLink]="['/']">Home</a> | <a [routerLink]="['/about']">About</a> | <a [routerLink]="['/test']">TEST</a>`,
})
export class AppComponent {
    name: string = "Angular 2 on Express";

    constructor() {}
}
