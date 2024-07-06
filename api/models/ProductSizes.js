const { types } = require("joi");

module.exports = {
  tableName: "product_sizes",
  attributes: {
    product_id: {
      model: 'products',
      unique: true
    },
    width: {
      type: "number",
    },
    height: {
      type: "number",
    },
    deleted: {
      type:"boolean"
    }
  },
};
