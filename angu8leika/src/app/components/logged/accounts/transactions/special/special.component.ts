import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.scss']
})
export class SpecialComponent implements OnInit {

  pendingtransaction = true;
  // rejected transactions are highlighted, until user clicks on it → onclick launch transaction detail AND change transaction status: "checked" (how does that fit in the universal transaction model?)
  rejectednotchecked = 3;
  // here is the actual rejected transactions history
  rejectedchecked = {}

  constructor() { }

  ngOnInit(): void {
  }

}
