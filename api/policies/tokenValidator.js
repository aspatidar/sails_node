const jwt = require("jsonwebtoken");

module.exports = async (req, res, proceed) => {
  const authHeader = req.headers["authorization"];
  if(!authHeader){
    return res.status(404).send(sails.__('TokenNotFound'));
  }
  let token = authHeader.split(" ")[1];
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  if (!verifiedToken) {
    return res.status(403).send(sails.__('InvalidToken'));
  }
  req.user = verifiedToken;
  proceed();
};
