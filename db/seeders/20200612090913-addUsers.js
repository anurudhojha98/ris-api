'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      first_name: 'dev',
      last_name: 'dev',
      email: 'dev@ris.co.in',
      password: '$2a$10$lOeLBfrxOsRDO3pXKJy/Zeg3jrkl/3o6UvXNm0OtMuM/LpMraRAua'
    }, {
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
