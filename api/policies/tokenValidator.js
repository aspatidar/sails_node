const jwt = require("jsonwebtoken");

module.exports = async (req, res, proceed) => {
  const authHeader = req.headers["authorization"];
  let token = authHeader.split(" ")[1];
  if (token === null) {
    return res.status(404).send("Token not found");
  }
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  if (!verifiedToken) {
    return res.status(403).send("Token invalid");
  }
  req.user = verifiedToken;
  proceed();
};
