const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const header = req.headers.authorization;
  console.log(req.headers.authorization);
  //const header = req.headers['Authorization'];

  const bearer = header.split(' ');
  const token = bearer[1];

  if(bearer.length == 1)
  {
      const token = header;

      if (!token) return res.status(401).json({ message: "Auth Error" });

      try {
        const decoded = jwt.verify(token, "ILikeTurtles");
        req.user = decoded.user;
        console.log("token did it good");
        next();
      } catch (e) {
        console.error(e);
        //If the decoded token isnt an actual token, return an error
        res.status(500).send({ message: "Invalid Token" });
      }
  }

  else
  {
    console.log(token);
    //If the token header is empty return and error
    if (!token) return res.status(401).json({ message: "Auth Error" });
  
    try {
      const decoded = jwt.verify(token, "ILikeTurtles");
      req.user = decoded.user;
      console.log("token did it good");
      next();
    } catch (e) {
      console.error(e);
      //If the decoded token isnt an actual token, return an error
      res.status(500).send({ message: "Invalid Token" });
    }
  }
  
};