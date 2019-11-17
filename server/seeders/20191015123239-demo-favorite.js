"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "favorites",
      [
        {
          id_toon: 1,
          id_user: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id_toon: 2,
          id_user: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id_toon: 3,
          id_user: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id_toon: 4,
          id_user: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id_toon: 2,
          id_user: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id_toon: 5,
          id_user: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id_toon: 1,
          id_user: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("favorites", null, {});
  }
};
