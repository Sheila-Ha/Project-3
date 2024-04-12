const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Activity extends Model {}

Activity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    activityDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // This column will store a reference of the `id` of the `CurrentMission` that "owns" this Activity
    currentMissionId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'currentMission',
          key: 'id',
        },
      },
    },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'activity',
  }
);

module.exports = Activity;