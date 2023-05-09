'use strict';
const { Model } = require('sequelize');
const { User } = require('./user.js');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId',
      });
      Booking.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Booking.init(
    {
      spotId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Booking',
      defaultScope: {
        attributes: {},
      },
      scopes: {
        notOwner: {
          attributes: { exclude: ['id', 'userId', 'createdAt', 'updatedAt'] },
        },
        isOwner: {
          attributes: [
            'id',
            'spotId',
            'userId',
            'startDate',
            'endDate',
            'createdAt',
            'updatedAt',
          ],
          // include: [{ model: User }],
        },
      },
    }
  );
  return Booking;
};
