const jwt = require("jsonwebtoken");
require("dotenv").config()

const protectRoute = (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      throw new Error("Wrong User");
    }
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

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
