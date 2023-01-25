const jwt = require('jsonwebtoken');
const dot = require('dotenv');

const secretKEY = dot.config().parsed.KEY;

const parseAuthorization = (authorization) => {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
}

const auth = (req,res,next)=>{
    let headerAuth = req.headers['authorization'];
    if (!headerAuth) {
        throw new Error("Not authentificated / Unauthorized")
    }
    // parse the token
    const token = parseAuthorization(headerAuth);
    // initialize decoded token
    let decodedToken;
    try {
        // verify the token
        decodedToken = jwt.verify(token , secretKEY);
        if (!decodedToken) {
            throw new Error("No authorization / Unauthorized")
        }
        console.log(decodedToken);
        req.isLoggedIn = true;
        req.user = decodedToken;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = { auth }