const jwt = require('jsonwebtoken');
module.exports = async(req,res,proceed) =>{
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    if (token === null) {
      return res.status(400).send("Token not available");
    }
  
    // Verify Token
    try {
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await sails.models.signup.findOne({
        where: {
          id: verifiedToken.id,
        },
      });
      if (user.token === token) {
        req.user = verifiedToken;
        proceed();
      }else{
        return res.status(403).send("Token invalid");
      }
    } catch (err) {
      res.status(403).send("Token invalid");
    }
}