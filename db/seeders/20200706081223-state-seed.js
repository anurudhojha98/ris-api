'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('states', [{
      id: 1,
      state_name: 'Andra Pradesh'
    },
    {
      id: 2,
      state_name: 'Arunachal Pradesh'
    },
    {
      id: 3,
      state_name: 'Assam'
    },
    {
      id: 4,
      state_name: 'Bihar'
    },
    {
      id: 5,
      state_name: 'Maharashtra'
    },
    {
      id: 6,
      state_name: 'New Delhi'
    },
    {
      id: 7,
      state_name: 'Uttar Pradesh'
    }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('states', null, {});
  }
};
