'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
    await queryInterface.addColumn('Bars', 'fooId', {type: Sequelize.INTEGER})
    await queryInterface.addConstraint('Bars', {
      fields: ['fooId'],
      name: 'fk_foo',
      type: 'foreign key',
      references: {
        table: 'Foos',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bars');
  }
};