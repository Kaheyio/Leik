import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionInfoComponent } from './components/logged/accounts/transactions/transaction-info/transaction-info.component';
import { LoggedComponent } from './components/logged/logged.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  // TODO understand routing. 
  // Like, routing to transaction-info doesn't work unless you're at "localhost:4200" (i.e. can't go to it from localhost:4200/login)
  {path: '', component: LoggedComponent}, // LULU made this to land on his space when reloading page
  { path: 'login', component: LoginComponent},
  { path: 'transaction-info', component: TransactionInfoComponent},
  // CAREFUL, the following not found ** redirect is a wildcard and should always be put last
  // otherwise the routes that come after it will not be set up and ** will intercept and redirect to not found 
  // because it has no clue nor patience to see if there are any other retardataire routes after it
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
