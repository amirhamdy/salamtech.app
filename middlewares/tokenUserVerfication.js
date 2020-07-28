const Token = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const defaultResponse = require("../helper/default-response");

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (token) {
        req.token = token;
        Token.verify( token, "secretkey",(err, authData)=>{
            if (authData) {
                req.user = authData.user
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

/*
module.exports = {
    validateToken: (req, res, next) => {
        const authorizationHeader = req.headers.authorization;
        let result;
        if (authorizationHeader) {
            const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
            try {
                result = jwt.verify(token, process.env.JWT_SECRET);
                req.decoded = result;
                next();
            } catch (err) {
                throw new Error(err);
            }
        } else {
            result = {
                error: `Authentication error. Token required.`,
                status: 401
            };
            res.status(401).send(result);
        }
    }
};
*/
