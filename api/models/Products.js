module.exports = {
  attributes: {
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    quantity: {
      type: "number",
    },
    price: {
      type: "number",
    },
    user_id: {
      type: "number",
    },
    sizes: {
      collection: 'productsizes',
      via: 'product_id'
    }
  },
};
