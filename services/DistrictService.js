const models = require('../db/models');
module.exports = {
    async addDistrict(districtObj) {
        return await models.districts.create({
            districtName: districtObj.districtName,
            state_id: districtObj.stateId
        })
    },
    async getDistrictList(stateId) {
        return await models.districts.findAll({ where: { state_id: stateId } });
    }
}