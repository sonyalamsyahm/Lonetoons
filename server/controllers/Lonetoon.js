const models = require("../models");
const Toon = models.toon;
const Genre = models.genre;
const User = models.user;
const Episode = models.episode;
const Page = models.page;
const Favorite = models.favorite;

const dataToon = data => {
  const newData = data.map(item => {
    let newItem = {
      id: item.id,
      title: item.title,
      genre: item.toonGenre.name,
      isFavorite: item.isFavorite.length ? true : false,
      image: item.image,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      createdBy: item.createdBy.id
    };
    return newItem;
  });
  return newData;
};

const getMyToon = data => {
  const newData = data.map(item => {
    let newItem = {
      id: item.id,
      title: item.title,
      genre: item.toonGenre.name,
      image: item.image,
      isFavorite: item.isFavorite.length ? true : false,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      createdBy: item.createdBy.id
    };
    return newItem;
  });
  return newData;
};

const isFav = data => {
  const newDataFav = data.filter(item => item.isFavorite.length > 0);
  const newData = newDataFav.map(item => {
    let newDataItem = {
      title: item.title,
      genre: item.toonGenre.name,
      isFavorite: item.isFavorite.length ? true : false,
      image: item.image,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    };
    return newDataItem;
  });
  return newData;
};

const getFavToons = data => {
  const newData = data.map(item => {
    let newDataItem = {
      toon_id: item.id_toon,
      title: item.toonId.title,
      genre: item.toonId.toonGenre.name,
      image: item.toonId.image,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    };
    return newDataItem;
  });
  return newData;
};

const toonByTitle = (data, title) => {
  const input = data.filter(item => {
    return item.title.toLowerCase().includes(title.toLowerCase());
  });
  let newData = input.map(item => {
    let newItem = {
      id: item.id,
      title: item.title,
      genre: item.toonGenre.name,
      isFavorite: item.isFavorite.length ? true : false,
      image: item.image,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    };
    return newItem;
  });
  return newData;
};

responsData = (data, res) => {
  Genre.findOne({
    where: {
      id: data.genre
    },
    attributes: ["name"]
  }).then(item => {
    let newData = {
      id: data.id,
      title: data.title,
      genre: item.name,
      isFavorite: false,
      image: data.image,
      created_by: data.created_by,
      createdAt: data.createAt,
      updatedAt: data.updatedAt
    };
    res.send(newData);
  });
};

responsUpdate = newData => {
  const newDataUpdate = {
    id: newData.id,
    title: newData.title,
    genre: newData.toonGenre.name,
    isFavorite: newData.isFavorite.length ? true : false,
    image: newData.image,
    created_by: newData.created_by,
    createdAt: newData.createAt,
    updatedAt: newData.updatedAt
  };
  return newDataUpdate;
};

responseFavData = newData => {
  let newDataFav = newData.map(item => {
    let dataFav = {
      toon_id: item.id_toon,
      title: item.toonId.title,
      genre: item.toonId.toonGenre.name,
      image: item.toonId.image,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    };
    return dataFav;
  });
  return newDataFav;
};

exports.all_webtoons = (req, res) => {
  const { user_id } = req.params;

  Toon.findAll({
    include: [
      {
        model: Genre,
        as: "toonGenre",
        attributes: ["name"]
      },
      {
        model: User,
        as: "createdBy",
        attributes: ["id"]
      },
      {
        model: User,
        as: "isFavorite",
        through: {
          model: Favorite,
          where: { id_user: user_id }
        }
      }
    ],
    attributes: { exclude: ["genre", "created_by"] }
  }).then(data => {
    let newDataToon;
    const favToon = req.query.is_favorite;
    if (favToon == "true") newDataToon = isFav(data);
    else if (req.query.title) newDataToon = toonByTitle(data, req.query.title);
    else newDataToon = dataToon(data);

    res.send(newDataToon);
  });
};

exports.AllToon = (req, res) => {
  Toon.findAll({
    include: [
      {
        model: Genre,
        as: "toonGenre",
        attributes: ["name"]
      },
      {
        model: User,
        as: "createdBy",
        attributes: ["id"]
      },
      {
        model: User,
        as: "isFavorite"
      }
    ],
    attributes: { exclude: ["genre", "created_by"] }
  }).then(data => {
    let newDataToon;
    const favToon = req.query.is_favorite;
    if (favToon == "true") {
      newDataToon = isFav(data);
    } else if (req.query.title) {
      newDataToon = toonByTitle(data, req.query.title);
    } else {
      newDataToon = dataToon(data);
    }
    res.send(newDataToon);
  });
};

exports.EpisodeToon = (req, res) => {
  const id = req.params.id_webtoon;

  Episode.findAll({
    where: { toon_id: id },
    attributes: { exclude: ["toon_id"] }
  }).then(data => {
    res.send(data);
  });
};

exports.PageEpisode = (req, res) => {
  const id_toons = req.params.id_webtoon;
  const episodeId = req.params.id_episode;

  Page.findAll({
    include: [
      {
        model: Episode,
        as: "episodeID",
        where: { toon_id: id_toons, id: episodeId },
        attributes: {
          exclude: ["id", "title", "image", "toon_id", "createdAt", "updatedAt"]
        }
      }
    ],
    attributes: { exclude: ["id_episode", "id"] }
  }).then(data => {
    res.send(data);
  });
};

exports.showMyToon = (req, res) => {
  Toon.findAll({
    include: [
      {
        model: Genre,
        as: "toonGenre",
        attributes: ["name"]
      },
      {
        model: User,
        as: "createdBy",
        attributes: ["id"]
      },
      {
        model: User,
        as: "isFavorite"
      }
    ],
    where: { created_by: req.params.user_id },
    attributes: { exclude: ["genre", "created_by"] }
  })
    .then(data => {
      const newDataMyToon = getMyToon(data);
      res.send(newDataMyToon);
    })
    .catch(error => {
      res.status(401).json({ message: "Anauthorize" });
    });
};

exports.createMyToon = (req, res) => {
  const userId = req.params.user_id;
  Genre.findOne({ where: { name: req.body.genre } }).then(data => {
    const genre_id = data.id;
    Toon.create({
      title: req.body.title,
      genre: genre_id,
      image: "https://www.forbes.com/sites/joanmacdonald.jpg",
      created_by: userId
    }).then(data => responsData(data, res));
  });
};

exports.updateMyToon = (req, res) => {
  const userId = req.params.user_id;
  const webtoonId = req.params.webtoon_id;

  Genre.findOne({ where: { name: req.body.genre }, attributes: ["id"] }).then(
    data =>
      Toon.update(
        {
          title: req.body.title,
          genres: data.id,
          image: "https://www.forbes.com/sites/joanmacdonald.jpg"
        },
        {
          where: { created_by: userId, id: webtoonId }
        }
      ).then(() => {
        Toon.findOne({
          include: [
            {
              model: Genre,
              as: "toonGenre",
              attributes: ["name"]
            },
            {
              model: User,
              as: "isFavorite"
            }
          ],
          attributes: { exclude: ["created_by", "genre"] },
          where: { created_by: userId, id: webtoonId }
        }).then(newData => res.send(responsUpdate(newData)));
      })
  );
};

exports.getEpisodeUser = (req, res) => {
  const userId = req.params.user_id;
  const webtoonId = req.params.webtoon_id;

  Episode.findAll({
    include: [
      {
        model: Toon,
        as: "toonID",
        where: { created_by: userId, id: webtoonId },
        attributes: {
          exclude: [
            "id",
            "title",
            "genre",
            "image",
            "created_by",
            "createdAt",
            "updatedAt"
          ]
        }
      }
    ],
    attributes: { exclude: ["id", "toon_id"] }
  }).then(data => {
    res.send(data);
  });
};

exports.deleteMyToon = (req, res) => {
  const userId = req.params.user_id;
  const webtoonId = req.params.webtoon_id;

  Toon.destroy({ where: { id: webtoonId, created_by: userId } }).then(data => {
    if (data > 0) {
      res.status(200).json({ data });
    } else {
      res.status(404).json({ message: "no object deleted" });
    }
  });
};

exports.createMyEpisode = (req, res) => {
  const userId = req.params.user_id;
  const webstoonId = req.params.webtoon_id;

  Toon.findAll({
    where: { created_by: userId, id: webstoonId }
  }).then(item => {
    if (item.length > 0 && req.body.webtoonId == webstoonId) {
      Episode.create({
        toon_id: req.body.webtoonId,
        title: req.body.title,
        image: "https://www.forbes.com/sites/joanmacdonald.jpg"
      }).then(data => {
        res.send({ data });
      });
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  });
};

exports.getMyToonImage = (req, res) => {
  const userId = req.params.user_id;
  const webstoonId = req.params.webtoon_id;
  const episodeId = req.params.episode_id;

  Episode.findAll({
    include: [
      {
        model: Toon,
        as: "toonID",
        where: { created_by: userId, id: webstoonId },
        attributes: []
      }
    ],
    where: { id: episodeId },
    attributes: ["image"]
  }).then(data => {
    res.send(data);
  });
};

exports.updateMyEpisode = (req, res) => {
  const userId = req.params.user_id;
  const webstoonId = req.params.webtoon_id;
  const episodeId = req.params.episode_id;

  Episode.findAll({
    include: [
      {
        model: Toon,
        as: "toonID",
        where: { created_by: userId, id: webstoonId },
        attributes: []
      }
    ],
    where: { toon_id: webstoonId, id: episodeId }
  }).then(item => {
    if (item.length > 0 && req.body.webtoonId == webstoonId) {
      console.log(item);
      Episode.update(
        {
          toon_id: req.body.webtoonId,
          title: req.body.title,
          image: "https://www.forbes.com/sites/joanmacdonald.jpg"
        },
        {
          where: { toon_id: webstoonId, id: episodeId }
        }
      ).then(data => {
        Episode.findOne({
          where: { toon_id: webstoonId, id: episodeId }
        }).then(newData => {
          res.send(newData);
        });
      });
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  });
};

exports.deleteMyEpisode = (req, res) => {
  const userId = req.params.user_id;
  const webstoonId = req.params.webtoon_id;
  const episodeId = req.params.episode_id;

  Episode.findAll({
    include: [
      {
        model: Toon,
        as: "toonID",
        where: { created_by: userId, id: webstoonId },
        attributes: []
      }
    ]
  }).then(data => {
    if (data.length > 0) {
      Episode.destroy({
        where: { toon_id: webstoonId, id: episodeId }
      }).then(item => {
        if (item > 0) {
          res.status(200).json({ item });
        } else {
          res.status(404).json({ message: "there is no object to delete" });
        }
      });
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  });
};

exports.createMyPage = (req, res) => {
  const userId = req.params.user_id;
  const webstoonId = req.params.webtoon_id;
  const episodeId = req.params.episode_id;

  Episode.findAll({
    include: [
      {
        model: Toon,
        as: "toonID",
        where: { created_by: userId, id: webstoonId },
        attributes: []
      }
    ],
    where: { toon_id: webstoonId, id: episodeId }
  }).then(data => {
    if (data.length > 0 && req.body.episodeId == episodeId) {
      Page.create({
        id_episode: req.body.episodeId,
        page: req.body.page,
        image: "https://www.forbes.com/sites/joanmacdonald.jpg"
      }).then(newData => {
        res.send(newData);
      });
    } else {
      res.status(400).json({ message: "Bad request!" });
    }
  });
};

exports.deleteMyPage = (req, res) => {
  const userId = req.params.user_id;
  const webstoonId = req.params.webtoon_id;
  const episodeId = req.params.episode_id;
  const pageId = req.params.image_id;

  Page.findAll({
    include: [
      {
        model: Episode,
        as: "episodeID",
        where: { toon_id: webstoonId, id: episodeId },
        attributes: [],
        include: [
          {
            model: Toon,
            as: "toonID",
            where: { created_by: userId, id: webstoonId },
            attributes: []
          }
        ]
      }
    ]
  }).then(data => {
    if (data.length > 0) {
      Page.destroy({
        where: { id_episode: episodeId, id: pageId }
      }).then(item => {
        if (item > 0) {
          res.status(200).json({ item });
        } else {
          res.status(404).json({ message: "object to delete not found" });
        }
      });
    } else {
      res.status(400).json({ message: "Bad request!" });
    }
  });
};

exports.getFavorite = (req, res) => {
  const userId = req.params.user_id;

  Favorite.findAll({
    include: [
      {
        model: Toon,
        as: "toonId",
        exclude: ["updateAt", "createdAt"],
        include: [
          {
            model: Genre,
            as: "toonGenre"
          }
        ]
      }
    ],
    where: { id_user: userId }
  }).then(data => {
    const newData = getFavToons(data);
    res.send(newData);
  });
};

exports.createFavorite = (req, res) => {
  const { user_id, webtoon_id } = req.params;

  User.findOne({
    where: { id: user_id },
    attributes: ["id"]
  }).then(user => {
    if (user) {
      Toon.findOne({
        where: {
          id: webtoon_id
        },
        attributes: ["id"]
      }).then(webtoon => {
        if (webtoon) {
          Favorite.findOne({
            where: {
              id_user: user.id,
              id_toon: webtoon.id
            }
          }).then(item => {
            if (item) {
              res.status(400).json({ message: "Bad Request" });
            } else {
              Favorite.create({
                id_user: user_id,
                id_toon: webtoon_id
              }).then(data => {
                Favorite.findAll({
                  include: [
                    {
                      model: Toon,
                      as: "toonId",
                      exclude: ["updateAt", "createdAt"],
                      include: [
                        {
                          model: Genre,
                          as: "toonGenre",
                          attributes: ["name"]
                        }
                      ]
                    }
                  ],
                  where: { id_user: data.id_user }
                }).then(newData => {
                  const dataFav = responseFavData(newData);
                  res.send(dataFav);
                });
              });
            }
          });
        } else {
          res.status(400).json({ message: "Bad Request" });
        }
      });
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  });
};

exports.deleteFavorite = (req, res) => {
  const { user_id, webtoon_id } = req.params;

  Favorite.destroy({
    where: { id_user: user_id, id_toon: webtoon_id }
  }).then(data => {
    if (data > 0) {
      Favorite.findAll({
        include: [
          {
            model: Toon,
            as: "toonId",
            exclude: ["updateAt", "createdAt"],
            include: [
              {
                model: Genre,
                as: "toonGenre",
                attributes: ["name"]
              }
            ]
          }
        ],
        where: { id_user: user_id }
      }).then(newData => {
        const dataFav = responseFavData(newData);
        res.send(dataFav);
      });
    } else {
      res.status(404).json({ message: "nothing to delete" });
    }
  });
};
