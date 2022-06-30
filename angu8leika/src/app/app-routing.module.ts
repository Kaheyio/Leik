import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedComponent } from './components/logged/logged.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'main', component: MainComponent},
  // { path: 'login', component: LoginComponent},
  // { path: 'logged', canActivate: [AuthGuardService], component: LoggedComponent},
  // CAREFUL, the following not found ** redirect is a wildcard and should always be put last otherwise the routes that come after it will not be set up 
  // and ** will intercept and redirect to not found because it has no clue nor patience to see if there are any other retardataire routes after it
  // Redirect to login instead of not-found
  {path: '**', redirectTo: '/main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
