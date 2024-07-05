const Joi = require("joi");

// Action: Validating the request 
const validateRequest = async (payload, req, res) => {
  const schema = Joi.object({
    product_id: Joi.number().required(),
    width: Joi.number().required(),
    height: Joi.number().required(),
  });
  const {error, value} = await schema.validate(payload);
  if (error) {
    return res.status(400)
      .json({
        msg: "Some fields are not valid please check",
        error: error,
      });
  }
};

// Action : Creating sizes 
const createSizes = async (req, res) => {
  const { product_id, width, height } = req.body;
  const payload = {
    product_id: product_id,
    width: width,
    height: height,
  };

  validateRequest(payload, req, res);
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
  res.status(200)
    .json({
      msg: "Size successfully created for the product",
      product_size: sizes,
    });
};

module.exports = {
  createSizes,
};
