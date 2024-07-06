/**
 * Signup.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require("bcrypt");

module.exports = {
  tableName: "register",
  attributes: {
    first_name: {
      type: "string",
    },
    last_name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },

  beforeCreate: async (valuesToSet, proceed) => {
    // Hash password
    const salt = await bcrypt.genSaltSync(10);
    valuesToSet.password = bcrypt.hashSync(valuesToSet.password, salt);
    console.log("hook working", valuesToSet);
    return proceed();
  },
};
