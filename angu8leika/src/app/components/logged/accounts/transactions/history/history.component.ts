import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  // UNIVERSAL TRANSACTION TEMPLATE (put in transactions component?)
  // (So you got emission date validation date and user date (userdate = validation date is the binding you change through transaction detail))

  //display the checkedrejectedtransactions user told to show when checking them
    // checkedrejectedshowinhistory {} = all transactions with checkedrejectedshowinhistory value

  constructor() { }

  ngOnInit(): void {
  }

}
