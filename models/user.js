'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: DataTypes.STRING(64),
      firstName: DataTypes.STRING(64),
      lastName: DataTypes.STRING(64),
      email: DataTypes.STRING(64),
      about: DataTypes.STRING(140)
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Post);
  };
  return User;
};
