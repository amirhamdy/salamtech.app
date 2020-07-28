const config = require('config');
const jwt = require('jsonwebtoken');
const JWT = config.get('JWT');
const defaultResponse = require("../helper/default-response");

module.exports = {
  auth: (req, res, next) => {
    const token = req.headers.authorization || req.get('token') || req.body.token || req.query.token;

    let result;
    if (token) {
      try {
        const {user} = jwt.verify(token, JWT.secret);
        req.user = user;
        next();
      } catch (e) {
        console.log(e)
        result = {token: `Authentication error. Invalid Token.`};

        return defaultResponse.failure(res, 'Authentication error. Invalid Token.', result)
      }
    } else {
      result = {token: `Authentication error. Token required.`};

      return defaultResponse.failure(res, 'Authentication error. Token required.', result)
    }
  }
};
