'use strict';
module.exports = (sequelize, DataTypes) => {
  const Toon = sequelize.define(
    'toon',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {},
  );
  Toon.associate = function(models) {
    Toon.belongsTo(models.genre, {
      as: 'toonGenre',
      foreignKey: 'genre',
    }),
      Toon.belongsTo(models.user, {
        as: 'createdBy',
        foreignKey: 'created_by',
      }),
      Toon.belongsToMany(models.user, {
        through: models.favorite,
        as: 'isFavorite',
        foreignKey: 'id_toon',
      });
  };
  return Toon;
};
