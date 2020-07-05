var stateConroller = require('../controllers/StateController');
const path = require('../common/path');
const { isAuthenticated } = require('../middlewares/middleware')
module.exports = (app, router) => {
    router.post(path.POST_STATE, isAuthenticated, stateConroller.addState);
    router.get(path.GET_STATE_LIST, isAuthenticated, stateConroller.getStateList);
    app.use(path.API_URL, router)
}