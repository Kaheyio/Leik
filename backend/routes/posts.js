// TODO: create controller linked to this route

// TEST PROTECTED ROUTE
const router = require('express').Router();

const Users = require('../models/Users');
// to protect this route, use middleware
const verify = require('../middlewares/verifyToken');

const leikodeController = require('../controllers/leikodeController');


// TEST PROTECTED ROUTE WITH TOKEN IN HEADER
router.get('/', verify, async (req, res) => {
    // await res.send(req.user);

    // find user by its id stored in token
    const foundUser = await Users.findById({ _id: req.user._id});
    res.send({protected_route_data: foundUser});
});

// VALIDATE TRANSACTIONS WITH LEIKODE IN PROTECTED ROUTE
router.post('/', verify, leikodeController.leikode_post);


module.exports = router;