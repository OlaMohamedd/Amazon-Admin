import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoupensComponent } from './components/coupens/coupens.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { PagesComponent } from './components/pages/pages.component';
import { MediaComponent } from './components/media/media.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { adminGuardGuard } from './Guards/admin-guard.guard';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {
    path: 'products',
    loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule)
    ,canActivate: [adminGuardGuard]
  },
  {path: 'statistics', component: StatisticsComponent ,canActivate: [adminGuardGuard]},
  {
    path: 'coupens',
    loadChildren: () => import('./components/coupens/coupens.module').then(m => m.CoupensModule)
    ,canActivate: [adminGuardGuard]
  },
  {path: 'pages', component: PagesComponent},
  {path: 'media', component: MediaComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'orders', component:OrdersComponent },
    {path: 'login', component: LogInComponent}

];SettingsComponent

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
