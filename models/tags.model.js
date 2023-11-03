const { Sequelize } = require("sequelize");
const sequelize = require('./index');

const Tags = sequelize.define("tags", {
  name: {
    type: Sequelize.STRING,
    unique: true
  }
});

module.exports = Tags;