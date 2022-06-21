const router = require('express').Router();
const Users = require('../db_model/Users');
// to hash the password
const bcrypt = require('bcryptjs');
// to generate token
const jwt = require('jsonwebtoken');

// NB: full route is localhost:PORT/api/user/
// get all users
router.get('/', async (req, res) => {
    const users = await Users.find();
    res.send(users);
});

// delete one user
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deleteUser = await Users.deleteOne({
            _id: id
        });
        res.json(deleteUser);
    } catch (err) {
        res.status(400).send(err);
    }

});


// NB full route is localhost:PORT/api/user/register
// REGISTER
router.post('/register', async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // check if user already exists in the db
    const emailExists = await Users.findOne({
        email
    });

    if (emailExists) {
        return res.status(400).send('This email already exists');
    }

    // HASH THE PASSWORD (create a salt and hash the pw, pw = salt + hash with the salt, that only bcrypt can decrypt)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = new Users({
        username,
        email,
        password: hashedPassword
    });

    try {
        // save user
        const savedUser = await user.save();
        // if saved, only display new user's id instead of whole object
        res.send({
            created_user: user.id
        });
    } catch (err) {
        // catch error
        res.status(400).send(err);
    }
});


// LOGIN
router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // check if user exists in the db
    const user = await Users.findOne({
        email
    });

    if (!user) {
        return res.status(400).send('Email and/or password incorrect');
    }

    // check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid password');
    }

    // CREATE AND ASSIGN TOKEN (token contains id)
    const token = jwt.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET);

    // token identifier
    res.header('auth-token', token).send({ user_logged_in: token});

});

module.exports = router;