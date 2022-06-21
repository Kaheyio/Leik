const jwt = require('jsonwebtoken');

// Middleware function to add to the routes that we want to protect
module.exports = function (req, res, next){

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
       /* if successful, continue processing any remaining middleware after this one is done (otherwise no other routes will be processed at all) */
       next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}