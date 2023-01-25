const jwt = require('jsonwebtoken');
const dot = require('dotenv');
const secretKEY = dot.config().parsed.KEY;
const generateToken = (data,e = '1h') => {
    return jwt.sign(
        {
            id: data.id,
            pseudo: data.pseudo
        },
        secretKEY,
        {
            expiresIn : e
        }
    )
}

module.exports = generateToken;