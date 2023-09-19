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

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'  , title:"Dashboard"},
  {path: 'dashboard', component: DashboardComponent ,canActivate: [adminGuardGuard] , title:"Dashboard"},
  {
    path: 'products',
    loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule)
    ,canActivate: [adminGuardGuard ], title:"Products"
  },
  {path: 'statistics', component: StatisticsComponent ,canActivate: [adminGuardGuard] , title:"Statistics"},
  {
    path: 'coupens',
    loadChildren: () => import('./components/coupens/coupens.module').then(m => m.CoupensModule)
    ,canActivate: [adminGuardGuard ] , title:"Coupens"
  },
  {path: 'pages', component: PagesComponent ,canActivate: [adminGuardGuard] , title:"Pages"},
  {path: 'media', component: MediaComponent ,canActivate: [adminGuardGuard] , title:"Media"},
  {path: 'settings', component: SettingsComponent ,canActivate: [adminGuardGuard] , title:"Settings"},
  {path: 'orders', component:OrdersComponent,canActivate: [adminGuardGuard] , title:"Orders"},
  {path: 'order-details/:id', component: OrderDetailsComponent ,canActivate: [adminGuardGuard] , title:"Order Details"},
  {path: 'login', component: LogInComponent , title:"Login"}

];SettingsComponent

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
