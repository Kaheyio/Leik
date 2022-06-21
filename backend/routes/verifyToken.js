const jwt = require('jsonwebtoken');

// Middleware function to add to the routes that we want to protect
function authRoute (req, res, next){

    // when we send a request, check if we have the auth-token (if user is logged in)
    const token = req.header('auth-token');

    // if no token, access denied to the route
    if(!token){
        return res.status(401).send('Access denied');
    }

    try{
        // verify token (can't mess around with token)
       const verified = jwt.verify(token, process.env.TOKEN_SECRET);
       // if user is verified successfully
       req.user = verified;
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}