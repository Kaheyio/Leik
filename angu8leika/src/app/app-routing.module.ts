import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent}
  // CAREFUL, the not found ** redirect is a wildcard and should always be put last 
  // otherwise the routes that come after it will not be set up and ** will intercept and redirect to not found 
  // because it has no clue nor patience to see if there are any other retardataire routes after it
  {path: 'not-found', component: NotFoundComponent,},
  {path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
