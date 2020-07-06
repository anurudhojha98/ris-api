const models = require('../db/models');
module.exports = {
    async addState(stateName) {
        return await models.states.create({
            stateName: stateName
        })
    },
    async getStateList() {
        return await models.states.findAll({});
    },
    async getStateByStateId(stateId) {
        return await models.states.findOne({ where: { id: stateId } });
    }
}