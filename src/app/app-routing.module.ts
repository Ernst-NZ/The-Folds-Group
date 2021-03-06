import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AuthComponent } from './auth/auth.component';
import { OrderListComponent } from './order-list/order-list.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OrderMenuComponent } from './order-menu/order-menu.component';
import { MyTestComponent } from './my-test/my-test.component';
import { ReportComponent } from './report/report.component';
import { PlayComponent } from './play/play.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent},
  { path: 'list', component: OrderListComponent},
  { path: 'login', component: SignInComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'orderMenu', component: OrderMenuComponent},
  { path: 'play', component: PlayComponent},
  { path: 'report', component: ReportComponent},
  { path: 'signUp', component: SignUpComponent},
  { path: 'test', component: MyTestComponent},
  { path: '', pathMatch: 'full', redirectTo: '/menu'},
  { path: '**', pathMatch: 'full', redirectTo: '/menu'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
