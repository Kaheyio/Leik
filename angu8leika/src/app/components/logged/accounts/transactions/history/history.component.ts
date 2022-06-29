import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  // UNIVERSAL TRANSACTION TEMPLATE (put in transactions component?)
  // (So you got emission date validation date and user date (userdate = validation date is the binding you change through transaction detail))

  // If preference showrejectedinhistory = true then 
    // rejectedtransactionschecked {}

  constructor() { }

  ngOnInit(): void {
  }

}
