'use strict';
module.exports = (sequelize, DataTypes) => {
  const Marker = sequelize.define(
    'Marker',
    {
      lat: DataTypes.STRING,
      long: DataTypes.STRING,
      popup: DataTypes.STRING,
    },
    {}
  );
  Marker.associate = function (models) {
    Marker.belongsTo(models.Post)
  };
  return Marker;
};
