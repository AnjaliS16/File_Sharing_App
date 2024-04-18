const Sequelize = require('sequelize')
const sequelize = require('../config/db.js')

const File = sequelize.define('File', {
    filename: {
      type: Sequelize.STRING,
      allowNull: false
    },
    path: {
      type: Sequelize.STRING,
      allowNull: false
    },
    size: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    uuid: {
      type: Sequelize.STRING,
      allowNull: false
    },
    sender: {
      type: Sequelize.STRING,
      allowNull: true 
    },
    receiver: {
      type: Sequelize.STRING,
      allowNull: true 
    }
  }, {
    tableName: 'files', 
    timestamps: true 
  });
  
  module.exports = File;