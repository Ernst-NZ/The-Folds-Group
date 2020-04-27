import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AuthComponent } from './auth/auth.component';
import { OrderListComponent } from './order-list/order-list.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { path: 'login', component: SignInComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'auth', component: AuthComponent},
  { path: 'list', component: OrderListComponent},
  { path: '', pathMatch: 'full', redirectTo: '/menu'},
  { path: '**', pathMatch: 'full', redirectTo: '/menu'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
