const commonFunction = require('../common/commonFunctions');
const msg = require('../common/messages');
const models = require('../db/models');
const logger = require('../logger');
module.exports = {
    async userSignIn(email, password) {
        logger.debug(`userSignIn() start : email: ${email}, password :  ${password}`);
        let returnedUser = {};
        let user = await models.Users.findOne({ where: { email: email } });
        if (!user) {
            logger.error(msg.INVALID_EMAIL_PASSWORD);
            throw new Error(msg.INVALID_EMAIL_PASSWORD);
        }
        if (await !commonFunction.isPasswordMatch(password, user.password)) {
            logger.error(msg.INVALID_PASSWORD);
            throw new Error(msg.INVALID_PASSWORD);
        }
        let token = await commonFunction.generateToken(user);
        logger.info('Token generated.')
        returnedUser.token = token;
        returnedUser.user = user.dataValues;
        logger.debug(`userSignIn() end response: ${JSON.stringify(returnedUser)}`);
        return returnedUser;
    },
}