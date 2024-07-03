const jwt = require('jsonwebtoken');

generateToken = (userId) =>{
   return jwt.sign({id: userId}, process.env.JWT_SECRET);
}

module.exports = {
    generateToken
}