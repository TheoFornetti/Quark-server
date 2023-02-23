const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
    try {
      const cookie = req.headers.quarksession;
      console.log("la cookie: ", cookie)
      const decoded = jwt.verify(cookie, "secretkey");
      console.log(decoded)
      next();
    } catch (ex) {
      res.sendStatus(401);
    }
}

module.exports = verifyToken