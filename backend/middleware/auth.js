const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.headers.authorization;
  //If the token header is empty return and error
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, "ILikeTurtles");
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    //If the decoded token isnt an actual token, return an error
    res.status(500).send({ message: "Invalid Token" });
  }
};