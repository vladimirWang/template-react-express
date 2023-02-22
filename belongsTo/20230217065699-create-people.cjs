'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('People', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // hobby_id: {
      //   type: Sequelize.INTEGER,
      // },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addColumn('People', 'hobby_id', Sequelize.INTEGER)
    await queryInterface.addConstraint('People', {
      fields: ['hobby_id'],
      type: 'foreign key',
      name: 'fk1_hobby',
      references: { //Required field
        table: 'Hobbies',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('People');
  }
};