const {generateToken} = require('../services');
const bcrypt = require('bcrypt');

const registerUSer = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const payload = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
  };

  if(!first_name || !last_name || !email || !password){
    return res.status(401).json({ msg: "all fields are required ..." });
  }
  // verify user
    const user = await sails.models.signup.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      return res
        .status(400)
        .json({ msg: "Email is already associated with an account :)" });
    }

    const result = await sails.models.signup.create(payload).fetch();
    console.log(result, "result");
    res.status(200).json({ msg: "User Register successfully", user: result });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password){
    return res.status(401).json({ msg: "all fields are required ..." });
  }
  const user = await sails.models.signup.findOne({
    where: {
      email: email,
    },
  });
   
  if (!user) {
    sails.log("User not found");
    return res.status(404).json({ msg: "User not found" });
  }
  // password validation 
  validatePassword = await bcrypt.compare(password, user.password);
  if(!validatePassword){
    return res.status(400).json({ msg: "Incorrect password and email combination" });
  }
  // Generate token 
  const token = generateToken(user.id);
  user.accessToken = token;
  res.status(200).json({ msg: "User login successfully", user: user });
};

module.exports = {
  registerUSer,
  loginUser,
};
