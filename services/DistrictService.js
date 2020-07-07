const models = require('../db/models');
const stateService = require('./StateService');
module.exports = {
    async addDistrict(districtObj) {
        let obj = {};
        let savedDistrict = await models.districts.create({
            districtName: districtObj.district,
            state_id: districtObj.state
        });
        if (savedDistrict) {
            let stateDetail = await stateService.getStateByStateId(savedDistrict.state_id);
            obj.id = savedDistrict.id;
            obj.districtName = savedDistrict.districtName;
            obj.stateId = savedDistrict.state_id;
            obj.stateName = stateDetail?.stateName;
        }
        return obj;
    },
    async getDistrictList(stateId) {
        return await models.districts.findAll({ where: { state_id: stateId } });
    },
    async getDistrictWithState() {
        let districtDetail = await models.districts.findAll({ include: [{ model: models.states, as: 'state' }] });
        let returnedArr = [];
        if (districtDetail.length > 0) {
            for (let districtData of districtDetail) {
                let district = districtData.dataValues;
                let obj = {};
                obj.id = district.id;
                obj.districtName = district.districtName;
                obj.stateName = district.state?.stateName;
                obj.stateId = district.state?.id;
                returnedArr.push(obj);
            }
        }
        return returnedArr;
    }
}