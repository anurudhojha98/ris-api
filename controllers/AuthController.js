const authService = require('../services/AuthService');
const logger = require('../logger');
const httpStatus = require('http-status-codes');
const msg = require('../common/messages');
module.exports = {
    login(req, res) {
        try {
            const { email, password } = req.body;
            authService.userSignIn(email, password).then((user) => {
                if (user) {
                    return res.status(httpStatus.OK).json(
                        {
                            success: true,
                            message: msg.LOGIN_SUCCESS,
                            data: user
                        }
                    )
                }
            }).catch((err) => {
                logger.error(err.message);
                return res.status(httpStatus.OK).json({
                    success: false,
                    message: msg.ERR_IN_FETCH_DETAILS
                })
            });
        } catch (err) {
            logger.error(err.message);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: msg.INTERNAL_SERVER_ERR
            })
        }

    }
}