"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "toons",
      [
        {
          title: "Tahilalats",
          genre: 3,
          image:
            "https://cdn.sribu.com/assets/media/cover/sudrajattommy5/Tahilalats.jpg",
          created_by: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Girls of the Wild's",
          genre: 1,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIdL5Y2TviA_fW6EXIb5FjhomKmElqamG6hlK17HsIe86ZATQJ",
          created_by: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Orange Marmalade",
          genre: 1,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxPBGeEmu0-lzYBosvc-4VtmamomcTLNZfc9x1Rl_tlwFD0kjc",
          created_by: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Si Juki",
          genre: 3,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSiD3wQ32oNtuk0obkks9NTAJ6218lANRtgbhL0XHSy-AkWh9Wa",
          created_by: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Lookism ",
          genre: 2,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTiTWWSogFXPC-d8vfjkQcVJ14RInXz5JQsw8oq9Yz553VP7X4E",
          created_by: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Untouchable",
          genre: 1,
          image:
            "https://i.pinimg.com/originals/d7/2d/c9/d72dc914ff54797b0c273996bafd6102.jpg",
          created_by: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("toons", null, {});
  }
};
