
const jwt = require('jsonwebtoken');
const constants = require('../common/constants');
const msg = require('../common/messages');
var httpStatus = require('http-status-codes');
const config = require('../config/config');
module.exports = {
    isAuthenticated(req, res, next) {
        if (typeof req.headers.authorization !== constants.UNDEFINED) {
            let token = req.headers[constants.X_ACCESS_TOKEN] || req.headers[constants.AUTHORIZATION];
            if (token.startsWith(constants.BEARER)) {
                token = token.slice(7, token.length);
            }
            if (token) {
                jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
                    if (err) {
                        return res.status(httpStatus.UNAUTHORIZED).json({
                            success: false,
                            message: msg.INVALID_TOKEN
                        });
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                });
            } else {
                return res.status(httpStatus.UNAUTHORIZED).json({
                    success: false,
                    message: msg.TOKEN_NOT_SUPPLIED
                });
            }
        } else {
            return res.status(httpStatus.UNAUTHORIZED).json(
                {
                    success: false,
                    message: msg.UNAUTHORIZED_USER
                }
            );
        }
    }
}