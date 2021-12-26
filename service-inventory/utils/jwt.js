require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
  sign: (data = {}) => {
    return jwt.sign(
      data,
      process.env.JWT_KEY,
      {
        expiresIn: '4h'
      }
    )
  },
  verify: (token) => {
    try {
      jwt.verify(token, process.env.JWT_KEY);
      return true;
    }
    catch (err) {
      return false;
    }
  }
};
