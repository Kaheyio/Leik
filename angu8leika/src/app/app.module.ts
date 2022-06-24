import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LoggedComponent } from './components/logged/logged.component';
import { TransferComponent } from './components/logged/transfer/transfer.component';
import { AccountsComponent } from './components/logged/accounts/accounts.component';
import { ContactComponent } from './components/logged/contact/contact.component';
import { TransactionsComponent } from './components/logged/accounts/transactions/transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoggedComponent,
    TransferComponent,
    AccountsComponent,
    ContactComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
