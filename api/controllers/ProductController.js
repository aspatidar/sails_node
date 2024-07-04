const createProduct = async (req, res) => {
  const { name, description, quantity, price } = req.body;
  if (!name || !description || !quantity || !price) {
    res.send(401).json({ msg: "all fields are required ..." });
  }
  const payload = {
    name: name,
    description: description,
    quantity: quantity,
    price: price,
    user_id: req.user.id,
  };
  const product = await sails.models.products.create(payload).fetch();
  res
    .status(200)
    .json({ msg: "Product is created successfully", product: product });
};

const getAllProducts = async (req, res) => {
  const products = await sails.models.products.find({
    where: {
      user_id: req.user.id,
    },
  });
  res
    .status(200)
    .json({ msg: "Products successfully fetched", products: products });
};

const getProductById = async (req, res) => {
  const id = +req.params.id;
  if (!id) {
    return res.status(401).json({ msg: "Product id is not valid" });
  }
  sails.log.info('Get product for this id', id);
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

const updateProduct = async (req, res) => {
  const id = +req.params.id;
  if (!id) {
    sails.log.error('Wrong id used');
    return res.status(401).json({ msg: "Product id is not valid" });
  }
  sails.log.info('Update product for this id', id);
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

const deleteProduct = async (req, res) => {
  const id = +req.params.id;
  if (!id) {
    return res.status(401).json({ msg: "Product id is not valid" });
  }
  sails.log.info('Delete product for this id', id);
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
