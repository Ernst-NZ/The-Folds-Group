import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Globals } from './globals';

import { UserService } from './_shared/user.service';
import { AuthenticationService } from './_auth/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/_helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/_helpers/error.interceptor';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.intercepter';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    FooterComponent,
    MenuComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
  ],
  providers: [
    UserService,
    AuthGuard,
    Globals,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
