"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "genres",
      [
        {
          name: "Romance",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Fighting",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Comedy",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Horror",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Trailer",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("genres", null, {});
  }
};
