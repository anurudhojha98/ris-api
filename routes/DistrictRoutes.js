var districtController = require('../controllers/DistrictController');
const path = require('../common/path');
const { isAuthenticated } = require('../middlewares/middleware')
module.exports = (app, router) => {
    router.post(path.POST_DISTRICT, isAuthenticated, districtController.addDistrict);
    router.get(path.GET_DISTRICT_BY_STATE_ID, isAuthenticated, districtController.getDistrictByStateId);
    app.use(path.API_URL, router)
}