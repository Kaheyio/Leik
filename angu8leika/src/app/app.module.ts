import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { LoggedComponent } from './components/logged/logged.component';
import { TransferComponent } from './components/logged/transfer/transfer.component';
import { AccountsComponent } from './components/logged/accounts/accounts.component';
import { ContactComponent } from './components/logged/contact/contact.component';
import { TransactionsComponent } from './components/logged/accounts/transactions/transactions.component';
import { SpecialComponent } from './components/logged/accounts/transactions/special/special.component';
import { HistoryComponent } from './components/logged/accounts/transactions/history/history.component';
import { AccountpickerComponent } from './components/logged/accounts/accountpicker/accountpicker.component';
import { CardsComponent } from './components/logged/accounts/cards/cards.component';
import { StatsComponent } from './components/logged/accounts/stats/stats.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TransactionInfoComponent } from './components/logged/accounts/transactions/transaction-info/transaction-info.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoggedComponent,
    TransferComponent,
    AccountsComponent,
    ContactComponent,
    TransactionsComponent,
    SpecialComponent,
    HistoryComponent,
    AccountpickerComponent,
    CardsComponent,
    StatsComponent,
    NotFoundComponent,
    TransactionInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
