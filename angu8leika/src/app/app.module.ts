import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthModule } from './modules/auth/auth.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { LoginComponent } from './components/login/login.component';
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
import { InterceptorServiceService } from './services/interceptor-service.service';


@NgModule({
  declarations: [
    AppComponent,
    // already declared and exported in auth module
    // LoginComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule
  ],
  // TODO: TEST ROUTE PROTECTION WITH INTERCEPTOR SERVICE ?
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorServiceService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
