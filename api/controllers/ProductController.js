const Joi = require("joi");
const axios = require('axios');

// Action: Validating the request
const validateRequest = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    user_id: Joi.number().required(),
  });
  const validate = schema.validate(payload);
  return validate;
};

// Action: Create product 
const createProduct = async (req, res) => {
  const { name, description, quantity, price } = req.body;
  const payload = {
    name: name,
    description: description,
    quantity: quantity,
    price: price,
    user_id: req.user.id,
  };

  const { error, value } = validateRequest(payload);
  if (error) {
    return res.status(400).json({
      msg: sails.__('FieldsValidationError'),
      error: error,
    });
  }
  const product = await sails.models.products.create(payload).fetch();
  res
    .status(200)
    .json({ msg: "Product is created successfully", product: product });
};

// Action: Get all products 
const getAllProducts = async (req, res) => {
  const products = await sails.models.products.find({
    where: {
      user_id: req.user.id,
    },
  });
  users = await axios.get('https://jsonplaceholder.typicode.com/users');
  res.status(200).json({ msg: "Products successfully fetched", products: products, users: users.data });
};

// Action: Find product by id 
const getProductById = async (req, res) => {
  const id = +req.params.id;
  if (!id) {
    return res.status(400).json({ msg: sails.__('IdNotValid') });
  }
  sails.log.info("Get product for this id", id);
  const product = await sails.models.products.findOne({
    where: {
      user_id: req.user.id,
      id: id,
    },
  });
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }
  res
    .status(200)
    .json({ msg: "Product successfully fetched", product: product });
};

// Action: Update product 
const updateProduct = async (req, res) => {
  const id = +req.params.id;
  if (!id) {
    sails.log.error("Wrong id used");
    return res.status(400).json({ msg: sails.__('IdNotValid') });
  }
  sails.log.info("Update product for this id", id);
  const product = await sails.models.products
    .update({
      where: {
        user_id: req.user.id,
        id: id,
      },
    })
    .set(req.body)
    .fetch();
  if (!product.length) {
    return res.status(404).json({ msg: "Product not found" });
  }
  res
    .status(200)
    .json({ msg: "Product successfully updated", product: product });
};

// Action: Delete product 
const deleteProduct = async (req, res) => {
  const id = +req.params.id;
  if (!id) {
    return res.status(400).json({ msg: sails.__('IdNotValid') });
  }
  sails.log.info("Delete product for this id", id);
  const product = await sails.models.products
    .destroy({
      where: {
        user_id: req.user.id,
        id: id,
      },
    })
    .fetch();
  if (!product.length) {
    return res.status(404).json({ msg: "Product not found" });
  }
  res.status(200).json({ msg: "Product successfully deleted" });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
