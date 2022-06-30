
"OPERATION TEMPLATE"
transactiontitle = ""
emissiondate = ""
type = "card or prelevement or newmove"
targetaccount = ""
target = "cardnumber or prelevref or newmovenote"
amount = "+ or -"
status = "pending or incoming or history or rejected" //luluhistory = validated

"PENDING"
leikodevalidationstatus = "pending refused confirmed"; //action de l'utilisateur
bankvalidationstatus = "true or false" //nous on check le montant

"REJECTED"
rejectionmotif = "leikoderefused bankrefused" //ce qu'on affiche danse

"INCOMING" //seulement prelevref et newmoveid
estimateddate = "date"

"HISTORY"
// C'est bon on a tout frate
