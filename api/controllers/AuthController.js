const { generateToken } = require("../services");
const bcrypt = require("bcrypt");
const Joi = require("joi");

// Action: Validating the request
const validateRegisterRequest = (payload) => {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().required(),
  });
  const validate = schema.validate(payload);
  // console.log('coming here', validate);
  return validate;
};

// Action: Validate Login request
const validateLoginRequest = (payload) => {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().required(),
  });
  const validate = schema.validate(payload);
  return validate;
};

const registerUSer = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const payload = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
  };
  sails.log.info("Process initiated to create user");
  const { error, value } = validateRegisterRequest(payload);
  if (error) {
    sails.log.warn("Validation failed for user creation");
    return res.status(400).json({
      msg: "Some fields are not valid please check",
      error: error,
    });
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
  sails.log.inf("User created with id ->", result.id);
  res.status(200).json({ msg: "User Register successfully", user: result });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const {error, value} = validateLoginRequest(req.body);
  if (error) {
    sails.log.warn("Validation failed for login user email ->", email);
    return res.status(400).json({
      msg: "Some fields are not valid please check",
      error: error,
    });
  }
  const user = await sails.models.signup.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    sails.log.info("Wrong user attempt to login with this email id -> ", email);
    return res.status(404).json({ msg: "User not found" });
  }
  // password validation
  validatePassword = await bcrypt.compare(password, user.password);
  if (!validatePassword) {
    return res
      .status(400)
      .json({ msg: "Incorrect password and email combination" });
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
