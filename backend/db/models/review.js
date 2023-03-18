'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.hasMany(models.ReviewImage, { foreignKey: 'id' });
    }
  }
  Review.init(
    {
      spotId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      review: DataTypes.STRING,
      stars: {
        type: DataTypes.INTEGER,

        validate: {
          len: [1, 5],
        },
      },
    },
    {
      sequelize,
      modelName: 'Review',
    }
  );
  return Review;
};
