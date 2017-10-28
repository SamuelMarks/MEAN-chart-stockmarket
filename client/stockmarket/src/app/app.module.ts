import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { StockService } from './stock/stock.service';
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, HttpModule, JsonpModule,
    RouterModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
