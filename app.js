const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const createAssociation = require('./models/association');
createAssociation();

const app = express();
app.use(bodyParser.json());

app.use('/', require('./controllers/authController'))
app.use('/user', require('./controllers/usersController'))
app.use('/tag', require('./controllers/tagsController'))
app.use('/task', require('./controllers/tasksController'))

module.exports = app;