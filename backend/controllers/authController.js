/***** REGISTRATION AND LOGIN *****/

const User = require('../models/User');
// to hash the password
const bcrypt = require('bcryptjs');

// to generate token
const jwt = require('jsonwebtoken');


/****** REGISTER METHOD FOR BACKEND TEST ******/

// TODO: THIS REGISTER METHOD IS FOR TEST ENV TO CREATE USERS, USER ALREADY HAS USERNAME EMAIL PASSWORD AND LEIKODE, GENERATE NEW LEIKODE ON EACH LOGIN
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


/****** LOG IN METHOD ******/
// check email on login + compare password
module.exports.login_post = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // find user by email
    const user = await User.findOne({
        email
    });

    // check email
    if (!user) {
        // TODO: change message to Email and/or password incorrect
        return res.status(400).send('This email is not registered');
    };

    // check password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        // TODO: change message to Email and/or password incorrect
        return res.status(400).send('Invalid password');
    };

    // generate new leikode and update user
     const generateLK = require('../models/User').generateLeikode();

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

     console.log('new leikode: ' + leikode + ' hashed LK: ' + hashedLeikode);


     // CREATE AND ASSIGN TOKEN (token contains user id)
    /* token should also have an expiration date, because stored in cookie that expires if session ends
    token's maxAge = 30 min */
    const maxAge = 30 * 60;
    const token = jwt.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    });


    // TOKEN IN COOKIE 
    // cookie's maxAge = 1 hour 
    // TODO: httponly for dev, and add secure for prod with https
    res.cookie('authToken', token, {
        httpOnly: true,
        maxAge: maxAge * 2 * 1000,
        secure: process.env.NODE_ENV === "production"
    });

    // send user data + leikode if credentials are correct
    res.status(201).send({
        user: user,
        generated_leikode: leikode
    });;
   
};


/****** PROTECT ROUTE METHOD ******/
module.exports.protectedRoute_get = async (req, res) => {
    res.json({ user: 'protected'});
}

/****** LOG OUT METHOD ******/
module.exports.logout_get = async (req, res) => {
    res.clearCookie('authToken').status(200).json({ message: 'User logged out successfully'});
};

    // token identifier
    // TOKEN IN HEADER (put it manually in headers to validate posts route)
    // res.header('auth_token', token).send({
    //     welcome: user.username,
    //     user_logged_in: token,
    //     generated_leikode: leikode
    // });

    // });
