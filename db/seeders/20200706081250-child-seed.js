'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('child_details', [{
      id: 1,
      name: 'John Doe',
      sex: 1,
      dob: '05/10/1949 8:30:52 AM',
      father_name: 'John Peeter',
      mother_name: 'Helena Willium',
      photo: '',
      district_id: 1,
      user_id: 1,
    }, {
      id: 2,
      name: 'Joseph Blanchard',
      sex: 1,
      dob: '06-07-1990 22:07:14',
      father_name: 'Justin Blanchard',
      mother_name: 'Helena Blanchard',
      photo: '',
      district_id: 2,
      user_id: 1,
    }, {
      id: 3,
      name: 'Helena Willium',
      sex: 2,
      dob: '08/08/1990 8:30:52 AM',
      father_name: 'Joseph Blenchard',
      mother_name: 'Helena Willium',
      photo: '',
      district_id: 3,
      user_id: 2,
    }, {
      id: 4,
      name: 'Rajesh Kumar',
      sex: 1,
      dob: '10/10/1995 8:30:52 AM',
      father_name: 'Rajesh Prashad',
      mother_name: 'Asha Devi',
      photo: '',
      district_id: 3,
      user_id: 2,
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('child_details', null, {});
  }
};
