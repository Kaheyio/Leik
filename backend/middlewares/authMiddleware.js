// Middleware function to add to the routes that we want to protect
const jwt = require('jsonwebtoken');



// TODO: TEST
const requireAuth = (req, res, next) => {

    // grab the token from the cookie named authToken (we can do this thanks to cookie-parser)
    const token = req.cookies.authToken;

    // check if token exists and is valid
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.send({message: 'Access denied'})
                // TODO: redirect in client
                return;
            } else {
                console.log(decodedToken);
                res.send({message: 'Access authorized'})
                next();
            }
        })
    }
    else {
        res.send({message: 'Access denied'})
        // TODO: redirect in client
        return;
    }

}

module.exports = { requireAuth };








// TODO: END TEST
// module.exports = function (req, res, next) {

//     // TOKEN IN HEADER
//     // when we send a request, check if we have the auth-token (if user is logged in)
//     const token = req.header('auth_token');

//     // TODO: TOKEN IN COOKIE ?



//     // if no token, access denied to the route
//     if (!token) {
//         return res.status(401).send('Access denied');
//     }

//     try {
//         // TODO: decode token to check if it's linked to the current user ?
//         // verify token (can't mess around with token)
//         // TODO: also checks if token has expired ?

//         const verified = jwt.verify(token, process.env.TOKEN_SECRET);

//         // if user is verified successfully
//         req.user = verified;

//         /* if successful, continue processing any remaining middleware after this one is done (otherwise no other routes will be processed at all) */
//         next();
//     } catch (err) {
//         res.status(400).send('Invalid Token');
//     }

// }