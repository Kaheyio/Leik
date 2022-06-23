const Users = require('../models/Users');
// to decrypt leikode
const bcrypt = require('bcryptjs');

// CHECK USER'S LEIKODE TO VALIDATE TRANSACTIONS
module.exports.leikode_post = async (req, res) => {
    const user = await Users.findById({ _id: req.user._id});

    const leikode = req.body.leikode;
    const validLeikode = await bcrypt.compare(leikode, user.leikode)
    if (!validLeikode) {
        return res.status(400).send('Invalid Leikode');
    }
    res.send('Your transaction has been validated');
};


// TODO: GENERATE LEIKODE ON FIRST CONNECTION (EDIT LEIKODE OR ASK FOR LEIKODE GENERATION IN CONTACT FORM)