const jwt = require('jsonwebtoken');
const createProduct = async(req, res) =>{
    const {name, description, quantity, price } = req.body;
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    if(!token){
        res.send(401).json({msg:'Token not available'});
    }
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if(!name || !description|| !quantity|| !price){
        res.send(401).json({msg:'all fields are required ...'});
    }
    const payload = {
        name: name,
        description: description,
        quantity: quantity,
        price:price,
        user_id: verifiedToken.id
    }
    const product = await sails.models.products.create(payload).fetch();
    res.status(200).json({msg:'Product is created successfully', product: product});
}

getAllProducts = async(req,res) =>{

}

module.exports = {
    createProduct
}