const Tags = require("./tags.model");
const Tasks = require("./tasks.model");
const Users = require("./users.model");

const createAssociation = () => {
    Tags.belongsToMany(Tasks, { through: 'TaskTag' });
    Tasks.belongsToMany(Tags, { through: 'TaskTag' });
    
    Tasks.belongsTo(Users, { as: 'createdBy', foreignKey: 'created_by' })
    Tasks.belongsTo(Users, { as: 'assignTo', foreignKey: 'assign_to' })
}

module.exports = createAssociation;
