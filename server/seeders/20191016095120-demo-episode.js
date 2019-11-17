"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "episodes",
      [
        {
          title: "Ep. 1",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR5sK4cg0JhuM4fzOarlgW3ARBfjlcEO3UuYKxw8_miS_dOUYJU",
          toon_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Ep. 2",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3ukBmO9Z1g64LGJj0C9B8l3ZsAWLOv8Hh6AgHTxZLSz3QDss8",
          toon_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Ep. 3",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxh0xCF3ee9_2oAjRHBCe7iUuKzl1_9q_tEvTvmE4oeryr4W6V",
          toon_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Ep. 4",
          image:
            "https://obs.line-scdn.net/0ha_9ToI_DPnAELRInfmNBJz57PR83QS1zYBtvblRDYER5H3ggPkt5FnMtNEF-SnkuakN2HyIqJUEvGisubEp5/w580",
          toon_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Ep. 5",
          image:
            "https://obs.line-scdn.net/0hvBekcqDxKW1YEgP6wmtWOmJEKgJrfjpuPCR4cwh8d1kndW8zYncyXHsTIgl1IW4zNiZmDnsTMlwlITxoMHQy/w580",
          toon_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Ep. 1",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQO-xfvgbfWL-SP5Ysry8x764xgDxdIIY1nlHTaKmQCowCpHmwQ",
          toon_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Ep. 2",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ5W53HRsbUPhIVLEqMRvoxfq4-8vCZ3A-u0lUYiTusuDySIeAB",
          toon_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Ep. 3",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0n1cl_9U9mdG8s7m5mu2gfWG677zDFx87OqJPBPIos5YR9kL6",
          toon_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Ep. 1",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR-11QkHQapHc-JH761ZoAlUHjVsGjjT0xunbrvC0htgluAcRR8",
          toon_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Ep. 2",
          image:
            "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1384488330l/18806194.jpg",
          toon_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Ep. 1",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRGYcw5ch0FO7iAGcKvpjhzmU1NF5Dbs1wZguI1ignxr42Q7qlr",
          toon_id: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Ep. 2",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTwMtqZFVvg46VNq9-TCkuFricur217S6KtbeI_totqYc3sInfd",
          toon_id: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Ep. 1",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRzo06p_z24HrF9NieDrP2e6o2zjZeZokSNEn0XDxxQIYU5mwyW",
          toon_id: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Ep. 2",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSUHujJzgIjUqXrdOcE_IoR_HY27Uzm-Rq45Ripf2l8N7sRGDra",
          toon_id: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Ep. 1",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR8Nx2E4HZbD9vQq9wOYfSbeGCOZTmVcCQCzNwNPvaEJu-5gOXy",
          toon_id: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Ep. 2",
          image:
            "https://www.nautiljon.com/images/manga/00/75/untouchable_7157.jpg",
          toon_id: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("episodes", null, {});
  }
};
