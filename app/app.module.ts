import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing } from "./routes";
import { HomeComponent } from "./components/home/home.component";

import { StocksService } from "./components/services/stocks.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        routing
    ],
    providers: [
        StocksService
    ],     
    declarations: [
        AppComponent,
        HomeComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
