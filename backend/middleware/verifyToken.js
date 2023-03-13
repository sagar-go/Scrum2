const jwt = require("jsonwebtoken");

function verifyToken2(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(404).send({ success: false, message: "ACCESS Denied" });
  }
  console.log(token, "token");
  const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  console.log(verified, "verifiedasdasdada", token);
  if (verified) {
    req.tokenDetails = verified;
    next();
  } else {
    return res.status(400).send({ success: false, message: "Invalid Token" });
  }
}

module.exports = { verifyToken2 };
