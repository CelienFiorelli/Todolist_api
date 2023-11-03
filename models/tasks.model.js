const { Sequelize } = require("sequelize");
const sequelize = require('./index');

const Tasks = sequelize.define("tasks", {
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
});


module.exports = Tasks;