'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'user',
          key:'id'
        },
        allowNull:false
      },
      role:{
          type:Sequelize.ENUM('assistant', 'user'),
          defaultValue:"user",
      },
      content:{
        type:Sequelize.TEXT,
        allowNull:false
      },
      conversation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'conversations',
            key: 'id'
        },
        onDelete: 'CASCADE'
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('messages');
  }
};