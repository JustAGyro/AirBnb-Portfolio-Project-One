'use strict';
const { Model, Op } = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'Owner',
      });
      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
      });
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
      });
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
      });
    }
  }
  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.DECIMAL,
        validate: {
          isDecimal: true,
        },
      },
      lng: {
        type: DataTypes.DECIMAL,
        validate: {
          isDecimal: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 50],
        },
      },
      description: {
        type: DataTypes.STRING(5000),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,

        validate: {
          isDecimal: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Spot',
    }
  );
  return Spot;
};
