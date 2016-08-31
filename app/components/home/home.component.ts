import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Http } from "@angular/http";

@Component({
    selector: 'my-home',
    templateUrl: 'components/home/home.component.html',
    styleUrls: ['components/home/home.component.css'],
    directives: [FORM_DIRECTIVES]
})
export class HomeComponent implements OnInit {
    stocks: {};
    
    newName: string = '';
    cityToSearch: string = '';
    errorMessage: string;
    bars: any[] = [];
    isLoading: boolean = false;    

    constructor(private http: Http) { }
    
    /**
    * Get the names OnInit
    */
    ngOnInit() {
        console.log("Initializing STOCKS");
    }    
}