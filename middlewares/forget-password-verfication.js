var Token = require('jsonwebtoken');
const defaultResponse = require("../helper/default-response");

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token) {
        req.token = token;
        Token.verify(token, "forgetPassword", (err, authData) => {
            if (err) {
                return defaultResponse.forbidden(res, 'token expired', ['token expired'])
            }
            if (authData) {
                next();
            } else {
                return defaultResponse.forbidden(res, 'Token Not Correct', ['Token Not Correct'])
            }
        });

    } else {
        return defaultResponse.forbidden(res, 'Make Sure Of Token In Header', ['Make Sure Of Token In Header'])

    }
}
module.exports = verifyToken;