'use strict';
module.exports = (sequelize, DataTypes) => {

// changed Topic to Topics == error with names.

  var Topic = sequelize.define('Topic', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});


  Topic.associate = function(models) {
      // associations can be defined here
      Topic.hasMany(models.Banner, {
        foreignKey: "topicId",
        as: "banners",
      });
    return Topic;
  };

}//END OF EXPORTS FUNCTION
