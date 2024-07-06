const { types } = require("joi");

module.exports = {
  tableName: "product_sizes",
  attributes: {
    product_id: {
      type: "number",
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
