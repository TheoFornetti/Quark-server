'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let languages = [
      {name: 'Inglés'},
      {name: 'Español'},
      {name: 'Portugues'},
      {name: 'Francés'},
      {name: 'Italiano'},
    ]
    await queryInterface.bulkInsert('languages', languages, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
