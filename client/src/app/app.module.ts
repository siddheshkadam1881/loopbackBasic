import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SocialLoginModule } from 'angularx-social-login';
import { UserService } from './services/user.service';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider  } from 'angularx-social-login';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { Http ,HttpModule} from '@angular/http';



export function getAuthHttp(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerName: 'x-auth-token',
    noTokenScheme: true,
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('id_token')),
  }), http);
}

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('209419629801960')
  }
]);


  export function provideConfig() {
  return config;
}


const routes: Routes = [
 { path: '', redirectTo: 'login', pathMatch: 'full' },
 { path: 'login', component: LoginComponent },
//   // { path: 'note', component: NoteComponentComponent,canActivate :  [LoggedInAuthGuard] } ,
//   { path: 'signup', component: SignupComponent },
//   {path:'AdminDashboard',component: AdmindashboardComponent,canActivate: [ AuthGuard ]},
//   { path: 'home', component: HomeComponent,
//    canActivate: [ AuthGuard ],
//    children: [
//
//        { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
//        { path: 'Dashboard', component: DashboardComponent },
//        { path: 'Trash', component: TrashComponent },
//        { path: 'Archieve', component: ArchieveComponent },
//        { path: 'Label/:id', component: LabeldashboardComponent }
//     ],
// },
//   { path: 'forgetpass/:token', component: ForgetpasswordComponent },
//   //{ path: 'forgetpass', component: ForgetpasswordComponent },
//   { path: 'forget', component: ForgetComponent },
//   { path: '**', component: PagenotfoundComponent }

];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
  HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    SocialLoginModule.initialize(config)

  ],
  providers: [
    UserService, { provide: AuthHttp, useFactory: getAuthHttp, deps: [Http] }


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
