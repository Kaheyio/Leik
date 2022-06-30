import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  //LULUONLY display the checkedrejectedtransactions user told to show when checking them
  // checkedrejectedshowinhistory {} = all transactions with checkedrejectedshowinhistory value

  historytransactions = [
    {
      transactiontitle: "TEEEEEEEEEEEST",
      emissiontimestamp: "1656594361",
      sumbissiontimestamp: "1656594363",
      targetaccount: "AD1200012030200359100100",
      type: "card",
      cardnumber: "379108098493384",
      amount: "-12.99",
      amountnegative: true,
      transactionstatus: "history",
      onlinestatus: true,
      leikodevalidationstatus: "confirmed",
      bankvalidationstatus: "valid",
      category: "none",
      subcategory: "none",
      usernote: "Had to do this one to get something out of someone but turns out i got reinburesed by someone else 100"
    },
    {
      transactiontitle: "Sfr prlv sepa",
      emissiontimestamp: "1656599361",
      sumbissiontimestamp: "1656594361",
      targetaccount: "AD1200012030200359100100",
      type: "prelevement",
      prelevref: "Excès forfait 28/06",
      amount: "-89.99",
      amountnegative: true,
      transactionstatus: "history",
      leikodevalidationstatus: "confirmed",
      bankvalidationstatus: "valid",
      category: "none",
      subcategory: "none"
    },
    {
      transactiontitle: "Gave a buck to a bro",
      emissiontimestamp: "1656994361",
      sumbissiontimestamp: "1656594362",
      targetaccount: "AD1200012030200359100100",
      type: "newmove",
      newmovenote: "Dude needed it.",
      amount: "-1.00",
      amountnegative: true,
      transactionstatus: "history",
      leikodevalidationstatus: "confirmed",
      bankvalidationstatus: "valid",
      category: "none",
      subcategory: "none"
    },
  ]

  sortedhistory = this.historytransactions.sort((x: any, y: any) => {
    return x.sumbissiontimestamp - y.sumbissiontimestamp;
  })

  constructor() { }

  ngOnInit(): void {
    console.log(this.sortedhistory)
  }

}
