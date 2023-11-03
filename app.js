const express = require('express');
const bodyParser = require('body-parser');

const usersController = require('./controllers/usersController');
const authController = require('./controllers/authController');
const tagsController = require('./controllers/tagsController');
const tasksController = require('./controllers/tasksController');

const db = require("./models");

const app = express();

app.use(bodyParser.json());

db.sequelize.sync()
    .then(() => {
        console.log("[+] Synced database");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.use('/user', usersController)
app.use('/tag', tagsController)
app.use('/task', tasksController)
app.use('/', authController)

module.exports = app;