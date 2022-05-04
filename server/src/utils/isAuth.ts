import "dotenv/config";
const jwt = require("jsonwebtoken");

const getToken = (payload) => {
  const token = jwt.sign(payload.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 604800,
  });
  return token;
};

const getPayload = (req, res, next) => {
  console.log("Being used");
  const token = req.get("Authorization");
  console.log("isAuth 13" + token);
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
  console.log("isAuth 30" + req.isAuth);
  console.log(decodedToken);
  req.isAuth = true;
  req.userId = decodedToken._id;
  next();
};

export { getToken, getPayload };
