'use strict';
module.exports = (sequelize, DataTypes) => {
  const episode = sequelize.define(
    'episode',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: DataTypes.STRING,
      toon_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {},
  );
  episode.associate = function(models) {
    episode.belongsTo(models.toon, {
      as: 'toonID',
      foreignKey: 'toon_id',
    });
  };
  return episode;
};
