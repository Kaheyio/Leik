import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-leikode-transactions',
  templateUrl: './pending-leikode-transactions.component.html',
  styleUrls: ['./pending-leikode-transactions.component.scss']
})
export class PendingLeikodeTransactionsComponent implements OnInit {

  pendingleikodetransactions = {}; // object that from transactionservice gets all transactions with status pending

  constructor() { }

  ngOnInit(): void {
  }

}
