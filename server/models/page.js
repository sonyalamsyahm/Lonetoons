'use strict';
module.exports = (sequelize, DataTypes) => {
  const page = sequelize.define(
    'page',
    {
      page: DataTypes.INTEGER,
      image: DataTypes.STRING,
      id_episode: DataTypes.INTEGER,
    },
    {},
  );
  page.associate = function(models) {
    page.belongsTo(models.episode, {
      as: 'episodeID',
      foreignKey: 'id_episode',
    });
  };
  return page;
};
