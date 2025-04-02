'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('books', 'userId', {
      type: Sequelize.STRING(26),
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'SET NULL',
    });

    await queryInterface.sequelize.query(
      'UPDATE books SET "userId" = :dummyUserId WHERE "userId" IS NULL',
      {
        replacements: { dummyUserId: '01JJ9RCE7C9SXGDSBCVZAH3VFC' },
      }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('books', 'userId');
  },
};
