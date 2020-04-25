import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent},
  { path: 'auth', component: AuthComponent},
  { path: '', pathMatch: 'full', redirectTo: '/menu'},
  { path: '**', pathMatch: 'full', redirectTo: '/menu'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
