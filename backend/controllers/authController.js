// REGISTRATION AND LOGIN

const Users = require('../models/Users');
// to hash the password
const bcrypt = require('bcryptjs');

// to generate token
const jwt = require('jsonwebtoken');

// REGISTER
module.exports.register_post = async (req, res) => {
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
    const saltPW = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltPW);

    // to generate leikode
    const generateLK = require('../models/Users').generateLeikode();

    // GENERATE LEIKODE
    let generatedCodes = await generateLK;
    let generatedCodesArr = Object.values(generatedCodes);
    const leikode = generatedCodesArr[0];
    const hashedLeikode = generatedCodesArr[1];

    // create new user
    const user = new Users({
        username,
        email,
        password: hashedPassword,
        leikode: hashedLeikode
    });

    try {
        // save user
        const savedUser = await user.save();

        // TODO: DO NOT DISPLAY ANYTHING
        // if saved, only display new user's id instead of whole object
        res.send({
            created_user: user.id,
            original_leikode: leikode
        });
        // generatedCodeArr
    } catch (err) {
        // catch error
        res.status(400).send(err);
    }
};


// LOGIN
module.exports.login_post = async (req, res) => {
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
    // TOKEN IN HEADER (put it manually in headers to validate posts route)
    res.header('auth_token', token).send({
        user_logged_in: token
    });

    // TODO: TOKEN IN COOKIE ? 
    // res.json({
    //     auth_token: token
    // });
};