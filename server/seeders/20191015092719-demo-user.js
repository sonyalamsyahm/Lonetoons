"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          email: "admin@lonetoon.com",
          password: "Lonetoon",
          name: "Admin",
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: "sony@gmail.com",
          password: "123456789",
          name: "Sony",
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: "rahmasari@gmail.com",
          password: "080898",
          name: "Hasri Rahmasari",
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
