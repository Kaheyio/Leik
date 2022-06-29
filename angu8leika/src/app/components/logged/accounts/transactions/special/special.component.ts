import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.scss']
})
export class SpecialComponent implements OnInit {

  thereareincomingorpendingtransactions = true;

  // check if there are pending leikode transactions
  pendingleikodetransactions = true;

  // check if there are incoming transactions
  incomingtransaction = true;

  // check if there are rejected transactions
  rejectedtransactions = true;

  // check how many have status unchecked // hope this will actualize if we modifiy the service data through its child
  uncheckedrejectedtransactionscounter = 3; 

  constructor() { }

  ngOnInit(): void {
  }

}
