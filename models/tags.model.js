const { Sequelize, Model } = require("sequelize");


/**
 * 
 * @param {Sequelize} sequelize 
 * @param {Sequelize} Sequelize 
 * @returns {Tags}
 */
const tagsDefine = (sequelize, Sequelize) => {
  const Tags = sequelize.define("tags", {
    name: {
      type: Sequelize.STRING
    }
  });

  return Tags;
};

module.exports = tagsDefine;