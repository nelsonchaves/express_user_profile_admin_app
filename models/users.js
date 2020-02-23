'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define(
    'users',
    {
      UserId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      FirstName: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      LastName: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      Username: {
        type: DataTypes.STRING(45),
        allowNull: true,
        unique: true
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Email: {
        type: DataTypes.STRING(45),
        allowNull: true,
        unique: true
      },
      Admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: '0'
      },
      Deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: '0'
      },  
      createdAt: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      updatedAt: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
    },
    {}
  );
  return users;
};