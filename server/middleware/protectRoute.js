const jwt = require("jsonwebtoken");
const secretKey = "computer12345";

const protectRoute = (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      throw new Error("Wrong User");
    }

    const verifyUser = jwt.verify(token, secretKey);

    req.user = verifyUser;
    next();


  } catch (err) {
    res.status(401).json({
      message: err.message || err,
      success: false,
      errror: true,
    });
  }
};

module.exports = protectRoute;
