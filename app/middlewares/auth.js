const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
    try {
      const token = req.headers.authorization;
      const decoded = jwt.verify(token, "secretkey");
      console.log(decoded)
      next();
    } catch (ex) {
      res.send(401);
    }
}

module.exports = verifyToken