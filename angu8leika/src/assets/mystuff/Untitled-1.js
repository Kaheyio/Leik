// accomodate : 
// 		card : validated, leikode pending, leikode validated, leikode refused (manual or too long), rejected (motifs?), cancelled
// 		sepa prelevement : validated, rejected, incoming, cancelled
// 		sepa don: from particulier, from entreprise
// 		manual transfer : validated, ordonné, 

// user cancels a pending transaction?
// user cancels a validated transaction?

// cardissuingnetwork?


confirmationprocess(){
    createobjectinpendingDB() = {
        // do we add status = pending?
        // something sends transaction request, il aura set 
        setemissionTimestamp = date,
        settype = "card or sepa or manual",
        settarget = "card number or acount number",
        setamount = "+ or -",
    }

    //TODO what is checked first? affection or type? 

    // user only ever sees it once you receive it
    if (affection = "+") {
        await(checksusipcion())
    }

    // user is on a merchant site
    if (affection = "-") {
        if (type = "card") {
            if (online = true) {
                // user buys something online
                await(validateonlinesiteforsending())
                if (onlinesitevalidated) {
                    if (amount > 100) {
                        await(leikodecheck())
                        if (leikodevalidated) {
                            await(askbank())
                            if (bankvalidated) {
                                return ("transaction validated by both leikode and askbank, added to incoming")
                            }
                            else {
                                return ("validated by leikode, denied by bank")
                            }
                        }
                        else {
                            return ("denied by leikode")
                        }
                    }
                    await(askbank())
                    if (bankvalidated) {
                        return ("transaction validated by askbank, no leikodecheck required, added to incoming")
                    }
                    else {
                        return ("no leikode required, but denied by bank")
                    }
                }
                else {
                    return ("failed to approve online site")
                }
            }
            else if (online = false) {
                // user buys something irl with credit card
            }
        }
        if (type = "sepa") {
            // sepa prelevement
            checkorganism()
            checkmandat()
        }
        if (type = "manual") {
            // user makes a manual virement
        }
    }
    else {
        deleteobjectfrompendingDB()
        return ("error during confirmation process")
    }
}


checksusipcion(){
    if (bankerokays) {
        setsuspicionvalidationtimestamp
        addobjecttoIncomingDB()
        deleteobjectfrompendingDB()
        return ("suspicionvalidated")
    }
    else (){
        setrejectiontimestamp
        setrejectedmotif = suspicious
        // no rejectedcheck because user ain't gonna see it
        addobjecttorejectedDB() // so user actually sees it?
        deleteobjectfrompendingDB()
        return ("refused")
    }
}


leikodecheck(){
    setleikodestatus = pendinguser;
    await(userconfirmation());
    if (userconfirmed) {
        setleikodeuservalidationtimestamp; //serves as leikodevalidated = true
        leikodestatus = pendingbank;
    }
    else {
        leikodestatus = deniedbyuser;
        deleteobjectfrompendingDB();
        return ("refused");
        // doesn't get to rejected DB because user already sees rejection on merchant site
    }
};


askbank(){
    checkThreshold(){
        if (valid) {
            checkSolde(){
                if (valid) {
                    setbankvalidationtimestamp //serves as bankvalidated = true
                    addobjecttoIncomingDB()
                    deleteobjectfrompendingDB()
                    return ("bankvalidated")
                }
                else {
                    setrejectiontimestamp //serves as rejected = true (and rejected is always bank rejected, otherwise it doesn't make it to the app)
                    setrejectionmotif = insufficientfunds
                    setrejectedcheck = false
                    addobjecttorejectedDB()
                    deleteobjectfrompendingDB()
                    return ("refused")
                }
            }
        }
        else {
            setrejectiontimestamp //serves as rejected = true (and rejected is always bank rejected, otherwise it doesn't make it to the app)
            setrejectedmotif = threshold
            setrejectedcheck = false
            addobjecttorejectedDB()
            deleteobjectfrompendingDB()
            return ("refused")
        }
    }
}