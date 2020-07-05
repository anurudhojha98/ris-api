const models = require('../db/models');
module.exports = {
    async saveChildDatail(userId, childDetail) {
        return await models.child_details.create({
            name: childDetail.name, sex: childDetail.sex, dob: childDetail.dob, fatherName: childDetail.fatherName,
            motherName: childDetail.motherName, district_id: childDetail.districtId, photo: childDetail.photo, user_id: userId
        })
    },

    async getChildList(userId) {
        return await models.child_details.findAll({ where: { user_id: userId } });
    },

    async getChildById(userId, childId) {
        return await models.child_details.findOne({ where: { id: childId, user_id: userId } });
    }
}