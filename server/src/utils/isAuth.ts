import "dotenv/config";
const jwt = require("jsonwebtoken");

const getToken = (payload) => {
  const token = jwt.sign(payload.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 604800,
  });
  return token;
};

const getPayload = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken._id;
  next();
};

export { getToken, getPayload };
