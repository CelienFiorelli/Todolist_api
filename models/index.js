
const { Sequelize } = require('sequelize');
const { database } = require('../config.json')

const sequelize = new Sequelize(database.database, database.username, database.password, {
  host: database.host,
  dialect: database.dialect
});


const usersDefine = require("./users.model.js");
const tagsDefine = require("./tags.model.js");
const tasksDefine = require("./tasks.model.js");

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    users: usersDefine(sequelize, Sequelize),
    tags: tagsDefine(sequelize, Sequelize),
    tasks: tasksDefine(sequelize, Sequelize)
};


db.tags.belongsToMany(db.tasks, { through: 'TaskTag' });
db.tasks.belongsToMany(db.tags, { through: 'TaskTag' });

db.tasks.belongsTo(db.users, { as: 'createdBy', foreignKey: 'created_by' })
db.tasks.belongsTo(db.users, { as: 'assignTo', foreignKey: 'assign_to' })



module.exports = db;