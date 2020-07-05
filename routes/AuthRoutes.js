
var authController = require('../controllers/AuthController');
const path = require('../common/path');
const { loginValidation, validate } = require('../middlewares/validator')
module.exports = (app, router) => {
    router.post(path.LOGIN_URL, loginValidation(), validate, authController.login);
    app.use(path.AUTH_URL, router)
}