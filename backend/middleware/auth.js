const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {

  const header = req.headers.authorization;
  const bearer = header.split(' ');
  const token = bearer[1];

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