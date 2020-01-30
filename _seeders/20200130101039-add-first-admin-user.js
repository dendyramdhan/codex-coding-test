'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      fullName: 'Dendy Ramdhan Fauzy',
      email: 'ramdhandendy@gmail.com',
      password: bcrypt.hashSync('codex-telkom', 10),
      telepon: '081289376509',
      level: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
