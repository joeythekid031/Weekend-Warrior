'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      startDate: DataTypes.DATEONLY,
      endDate: DataTypes.DATEONLY,
      lodgingType: DataTypes.STRING(64),
      transportationType: DataTypes.STRING(64),
      details: DataTypes.STRING(140),
      title: DataTypes.STRING(64),
      body: DataTypes.TEXT,
      category: DataTypes.STRING
    },
    {}
  );
  Post.associate = function (models) {
    Post.belongsTo(models.User);
    // Post.hasMany(models.Marker);
  };

  return Post;
};
