import { Component } from '@angular/core';
import { Http } from "@angular/http";
//import './rxjs-operators';

@Component({
    selector: 'my-home',
    templateUrl: 'components/home/home.component.html',
    styleUrls: ['components/home/home.component.css']
})
export class HomeComponent {
    name: string = "Home";
    users: {};

    constructor(http: Http) {
        console.log("GETTING USERS!");
        
        http.get("/api/users")
            .map(data => data.json())
            .subscribe((data) => this.users = data);
    }
}