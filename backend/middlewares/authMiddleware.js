// Middleware function to add to the routes that we want to protect
const jwt = require('jsonwebtoken');



// ROUTE PROTECTION MIDDLEWARE
const requireAuth = (req, res, next) => {

    // grab the token from the cookie named authToken (we can do this thanks to cookie-parser)
    const token = req.cookies.authToken;

    // check if token exists and is valid
    // console.log(token);
    if(!token) {
        return res.status(401).send({route_status: 'Access denied'});
    }
       
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(verified);
        req.user = verified;
       /* if successful, continue processing any remaining middleware after this one is done (otherwise no other routes will be processed at all) */
        next();
    } catch (error) {
        res.status(400).send({route_status: 'Invalid credentials'});
    }
  
}

module.exports = {
    requireAuth
};