import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.scss']
})
export class SpecialComponent implements OnInit {

  // check if there are pending leikode transactions
  pendingleikodetransactionscounter = 1;

  // check if there are incoming transactions
  incomingtransactionscounter = 2;

  // check how many have status unchecked // hope this will actualize if we modifiy the service data through its child
  uncheckedrejectedtransactionscounter = 4; 

  constructor() { }

  ngOnInit(): void {
  }

}
