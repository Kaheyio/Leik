// TEST PROTECTED ROUTE
const router = require('express').Router();

const Users = require('../db_model/Users');
// to protect this route, use middleware
const verify = require('./verifyToken');

router.get('/', verify, async (req, res) => {
    // await res.send(req.user);

    // find user by its id stored in token
    const foundUser = await Users.findById({ _id: req.user._id});
    res.send({protected_route_data: foundUser});
});


module.exports = router;