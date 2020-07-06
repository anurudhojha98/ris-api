'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('districts', [{
      id: 1,
      state_id: 7,
      district_name: 'Amethi'
    },
    {
      id: 2,
      state_id: 7,
      district_name: 'Pratapgarh'
    }, {
      id: 3,
      state_id: 7,
      district_name: 'Sultanpur'
    }, {
      id: 4,
      state_id: 6,
      district_name: 'North Delhi'
    }, {
      id: 5,
      state_id: 6,
      district_name: 'South Delhi'
    }, {
      id: 6,
      state_id: 6,
      district_name: '	Shahdara'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('districts', null, {});
  }
};
