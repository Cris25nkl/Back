const jwt = require('jsonwebtoken');
const config = require('../Config');
const secret = config.jwt.secret;

function tokens(){
    return jwt.sign(data, secret)
}

module.exports = {
    tokens
}