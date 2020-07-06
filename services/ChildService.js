const models = require('../db/models');
const commonFunctions = require('../common/commonFunctions');
module.exports = {
    async saveChildDatail(userId, childDetail) {
        return await models.child_details.create({
            name: childDetail.name, sex: childDetail.sex, dob: childDetail.dob, fatherName: childDetail.fatherName,
            motherName: childDetail.motherName, district_id: childDetail.districtId, photo: childDetail.photo, user_id: userId
        })
    },

    async getChildList(userId, query) {
        let { offset, limit } = commonFunctions.pagination(query);
        let childList = await models.child_details.findAll({
            limit,
            offset,
            where: { user_id: userId },
            include: [{ model: models.districts, as: 'district', include: [{ model: models.states, as: 'state' }] }]
        });
        let returnedArr = [];
        for (let child of childList) {
            let childDetail = child.dataValues;
            returnedArr.push(this.prepareChildData(childDetail));
        }
        return returnedArr;
    },

    async getChildById(userId, childId) {
        let childDetail = await models.child_details.findOne({
            where: { id: childId, user_id: userId },
            include: [{ model: models.districts, as: 'district', include: [{ model: models.states, as: 'state' }] }]
        });
        return this.prepareChildData(childDetail);
    },
    prepareChildData(childDetail) {
        let newObj = {};
        newObj.id = childDetail.id;
        newObj.name = childDetail.name;
        newObj.sex = commonFunctions.getSexDetail(childDetail.sex);
        newObj.dob = commonFunctions.prepareDateFormat(childDetail.dob);
        newObj.fatherName = childDetail.fatherName;
        newObj.motherName = childDetail.motherName;
        newObj.district = childDetail.district?.districtName;
        newObj.state = childDetail.district?.state?.stateName;
        return newObj;
    }
}