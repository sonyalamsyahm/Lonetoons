'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define(
    'favorite',
    {
      id_toon: DataTypes.INTEGER,
      id_user: DataTypes.INTEGER,
    },
    {},
  );
  Favorite.associate = function(models) {
    Favorite.belongsTo(models.toon, {
      as: 'toonId',
      foreignKey: 'id_toon',
    });
  };
  return Favorite;
};
