import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, terminal: true },
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
