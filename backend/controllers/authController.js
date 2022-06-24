/***** REGISTRATION AND LOGIN *****/

const User = require('../models/User');
// to hash the password
const bcrypt = require('bcryptjs');

// to generate token
const jwt = require('jsonwebtoken');

// TODO: THIS REGISTER METHOD IS FOR TEST ENV TO CREATE USERS, USER ALREADY HAS USERNAME EMAIL PASSWORD AND LEIKODE OR CREATE LEIKODE WITH FIRST CONNECTION
module.exports.register_post = async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;

    // CUSTOM VALIDATION BEFORE CREATION
    // all fields given ?
    if (!username || !email || !password) {
        res.send('User was not created, one or several fields missing');
        return;
    }

    // email is valid ?
    // Email validation pattern
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = emailRegex.test(email);

    if (!validEmail) {
        return res.status(400).send('Please enter a valid email');
        
    }

    // user already exists in the db ?
    const emailExists = await User.findOne({
        email
    });

    if (emailExists) {
        return res.status(400).send('This user is already registered');
    };


    // password is at least 8 ?
    if (password.length < 8) {
        return res.status(400).send('Password should be at least 8 characters');
    };

    // END VALIDATION


    // HASH THE PASSWORD (create a salt and hash the pw, pw = salt + hash with the salt, that only bcrypt can decrypt)
    const saltPW = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltPW);

    // create new user
    const user = new User({
        username,
        email,
        password: hashedPassword,
    });

    // save user
    await user.save();

    // TODO: DO NOT DISPLAY ANYTHING
    res.status(201).send({
        created_user: user.id
    });

};




// TODO: LOGIN + CHECK IF USER DOESN'T HAVE A LEIKODE (1st login), GENERATE ONE AND NOTIFY
module.exports.login_post = async (req, res) => {
   // TODO: transfer form validation to front
    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        return res.status(400).send('Please enter email and password');
    }

    // TODO: pass get user method in apiservice
    // check if user exists in the db
    const user = await User.findOne({
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

    // GENERATE LK ON EACH LOGIN AND TODO: DISPLAY IN LEIKODE PAGE

    // to generate leikode
    const generateLK = require('../models/User').generateLeikode();

    // GENERATE NEW LEIKODE
    let generatedCodes = await generateLK;
    let generatedCodesArr = Object.values(generatedCodes);
    const leikode = generatedCodesArr[0];
    const hashedLeikode = generatedCodesArr[1];

    const userLK = await User.findOneAndUpdate({
        email: user.email
    }, {
        leikode: hashedLeikode
    });
    await userLK.save();


    // CREATE AND ASSIGN TOKEN (token contains user id)
    // TODO: should also have an expiration date, because stored in cookie that expires if session ends
    // expiration date = 30 min
    const maxAge = 30 * 60;
    const token = jwt.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET, { expiresIn: maxAge });

    // token identifier
    // TOKEN IN HEADER (put it manually in headers to validate posts route)
    // res.header('auth_token', token).send({
    //     welcome: user.username,
    //     user_logged_in: token,
    //     generated_leikode: leikode
    // });

    // TOKEN IN COOKIE ?
    // TODO: cookie expires if session ends ? or set maxAge to 1 hour ?
    // TODO: httponly for dev, and add secure for prod with https
    res.cookie('auth_token', token, { httpOnly: true, maxAge: maxAge * 2 * 1000});
    // TODO: do not send token
    res.status(201).send({
            welcome: user.username,
            user_logged_in: token,
            generated_leikode: leikode
        });
};