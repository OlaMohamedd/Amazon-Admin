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
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { NgModule } from '@angular/core';
import { ControlSellerComponent } from './components/control-seller/control-seller.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {
    path: 'products',component:ProductsComponent
    // canActivate: [adminGuardGuard]
  },
  {path: 'statistics', component: StatisticsComponent ,canActivate: [adminGuardGuard]},
  {
    path: 'coupens',
    loadChildren: () => import('./components/coupens/coupens.module').then(m => m.CoupensModule)
    ,canActivate: [adminGuardGuard]
  },
  {path: 'sellers', component: ControlSellerComponent},
  {path: 'media', component: MediaComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'orders', component:OrdersComponent,canActivate: [adminGuardGuard] },
  {path: 'order-details/:id', component: OrderDetailsComponent},
    {path: 'login', component: LogInComponent}

];SettingsComponent

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
