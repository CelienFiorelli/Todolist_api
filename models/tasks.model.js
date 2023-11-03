const { Sequelize, Model } = require("sequelize");

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {Sequelize} Sequelize 
 * @returns {Tasks}
 */
const tasksDefine = (sequelize, Sequelize) => {
  const Tasks = sequelize.define("tasks", {
    name: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
  });

  return Tasks;
};

module.exports = tasksDefine;