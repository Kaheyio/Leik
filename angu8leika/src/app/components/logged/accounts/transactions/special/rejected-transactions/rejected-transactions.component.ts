import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rejected-transactions',
  templateUrl: './rejected-transactions.component.html',
  styleUrls: ['./rejected-transactions.component.scss']
})
export class RejectedTransactionsComponent implements OnInit {

  uncheckedrejectedtransactions = true; // transform into object that from transactionservice gets all transactions with status rejected AND property checked false

  constructor() { }

  ngOnInit(): void {
  }

  //through databaseCRUDservice, change transaction "checked" property to true
  checkedrejected(){}

}
