import "dotenv/config";
const jwt = require("jsonwebtoken");

const getToken = (payload) => {
  const token = jwt.sign(payload.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 604800,
  });
  return token;
};

const getPayload = (token) => {
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return { loggedIn: true, payload };
  } catch (err) {
    return { loggedIn: false };
  }
};

export { getToken, getPayload };
