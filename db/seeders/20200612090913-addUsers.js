'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: 1,
      first_name: 'dev',
      last_name: 'dev',
      email: 'dev@ris.co.in',
      password: '$2a$10$lOeLBfrxOsRDO3pXKJy/Zeg3jrkl/3o6UvXNm0OtMuM/LpMraRAua'
    }, {
      id: 2,
      first_name: 'admin',
      last_name: 'admin',
      email: 'admin@ris.co.in',
      password: '$2a$10$lOeLBfrxOsRDO3pXKJy/Zeg3jrkl/3o6UvXNm0OtMuM/LpMraRAua'
    }], {})

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});

  }
};
