const Joi = require("joi");

// Action: Validating the request
const validateRequest = (payload) => {
  const schema = Joi.object({
    product_id: Joi.number().required(),
    width: Joi.number().required(),
    height: Joi.number().required(),
  });
  const validate = schema.validate(payload);
  return validate;
};

// Action : Creating sizes
const createProductSizes = async (req, res) => {
  const { product_id, width, height } = req.body;
  const payload = {
    product_id: product_id,
    width: width,
    height: height,
  };

  const { error, value } = validateRequest(payload);
  if (error) {
    return res.status(400).json({
      msg: sails.__('FieldsValidationError'),
      error: error,
    });
  }
  if (error) {
  }
  const productSize = await sails.models.productsizes.find({
    where: {
      product_id: product_id,
    },
  });
  if (productSize.length) {
    return res.status(400).send("Product size already available");
  }
  sails.log.info("Size creation initiated for this product id ->", product_id);
  const sizes = await sails.models.productsizes.create(payload).fetch();
  res.status(200).json({
    msg: "Size successfully created for the product",
    product_size: sizes,
  });
};

// Action: Get all products sizes 
const getAllProductSizes = async (req, res) => {
  const products = await sails.models.productsizes.find();
  res
    .status(200)
    .json({ msg: "Product sizes successfully fetched", products: products });
};

// Action: Update product 
const updateProductSize = async(req,res) =>{
  const id = +req.params.id;
  if (!id) {
    sails.log.error("Wrong id used");
    return res.status(400).json({ msg: sails.__('IdNotValid')});
  }
  sails.log.info("Update size for this product id", id);
  const product = await sails.models.productsizes
    .update({
      where: {
        product_id: id,
      },
    })
    .set(req.body)
    .fetch();
  if (!product.length) {
    return res.status(404).json({ msg: "Product size not found" });
  }
  res
    .status(200)
    .json({ msg: "Product size successfully updated", product: product });
}

// Action: Delete product 
const deleteProductSize = async (req, res) => {
  const id = +req.params.id;
  if (!id) {
    return res.status(400).json({ msg: sails.__('IdNotValid') });
  }
  sails.log.info("Delete product for this id", id);
  const product = await sails.models.productsizes
    .update({
      where: {
        product_id: id,
      },
    }).set({'deleted': true})
    .fetch();
  if (!product.length) {
    return res.status(404).json({ msg: "Product size not found" });
  }
  res.status(200).json({ msg: "Product size successfully deleted" });
};

module.exports = {
  createProductSizes,
  getAllProductSizes,
  updateProductSize,
  deleteProductSize
};
