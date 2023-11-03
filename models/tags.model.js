const { Sequelize } = require("sequelize");
const sequelize = require('./index');

const Tags = sequelize.define("tags", {
  name: {
    type: Sequelize.STRING
  }
});

module.exports = Tags;