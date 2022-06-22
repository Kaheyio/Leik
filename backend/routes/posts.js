// TEST PROTECTED ROUTE
const router = require('express').Router();

const Users = require('../models/Users');
// to protect this route, use middleware
const verify = require('../middlewares/verifyToken');
// to decrypt leikode
const bcrypt = require('bcryptjs');

// TEST PROTECTED ROUTE WITH TOKEN IN HEADER
router.get('/', verify, async (req, res) => {
    // await res.send(req.user);

    // find user by its id stored in token
    const foundUser = await Users.findById({ _id: req.user._id});
    res.send({protected_route_data: foundUser});
});

// VALIDATE TRANSACTIONS WITH LEIKODE IN PROTECTED RPOUTE
router.post('/', verify, async (req, res) => {
    const user = await Users.findById({ _id: req.user._id});

    const leikode = req.body.leikode;
    const validLeikode = await bcrypt.compare(leikode, user.leikode)
    if (!validLeikode) {
        return res.status(400).send('Invalid Leikode');
    }
    res.send('Your transaction has been validated');
});


module.exports = router;