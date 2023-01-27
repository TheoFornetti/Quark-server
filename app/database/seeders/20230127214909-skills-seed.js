'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let skills = [
      {name:'C++', career: 1},
      {name:'Matemáticas', career: 1},
      {name:'Unreal Engine 5', career: 1},
      {name:'GIT', career: 2},
      {name:'Programación orientada a objetos', career: 2},
      {name:'C#', career: 0},
      {name:'Patrones GOF', career: 0},
      {name:'Pricipios SOLID', career: 0},
    ]
    await queryInterface.bulkInsert('skills', skills, {});
    /**
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
