import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incoming-transactions',
  templateUrl: './incoming-transactions.component.html',
  styleUrls: ['./incoming-transactions.component.scss']
})
export class IncomingTransactionsComponent implements OnInit {

  incomingtransactions = {}; // object that from transactionservice gets all transactions with status incoming

  constructor() { }

  ngOnInit(): void {
  }

}
