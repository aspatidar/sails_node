const jwt = require("jsonwebtoken");
const axios = require('axios');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const getDummyUsers = async () =>{
    const users = await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log(users)
    return users.data;
} 

module.exports = {
  generateToken,
  getDummyUsers
};
