var childController = require('../controllers/childController');
const path = require('../common/path');
const { isAuthenticated } = require('../middlewares/middleware')
module.exports = (app, router) => {
    router.post(path.POST_CHILD, isAuthenticated, childController.addChild);
    router.get(path.GET_CHILD_LIST, isAuthenticated, childController.getChildList);
    router.get(path.GET_CHILD_BY_ID, isAuthenticated, childController.getChildById);
    app.use(path.API_URL, router)
}