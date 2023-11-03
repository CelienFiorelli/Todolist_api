const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const { verifyParams } = require('../middleware/verifyParams');

const Tasks = require('../models/tasks.model');
const Users = require('../models/users.model');
const Tags = require('../models/tags.model');

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
    try {
        const tasks = await Tasks.findAll({
            where: { created_by: req.user },
            include: [{
                model: Users,
                as: 'createdBy',
                attributes: ['username', 'id']
            },
            {
                model: Users,
                as: 'assignTo',
                attributes: ['username', 'id']
            }]
        });

        // const etag = generateETag(tasks)
        // if (req.headers['if-none-match'] == etag) {
        //     return res.sendStatus(304)
        // }
        // res.set('ETag', etag)
        
        return res.status(200).send(tasks)
    } catch (error) {
        return res.sendStatus(500)
    }
})

router.post('/', verifyToken, verifyParams(["name", "description", "tags"]), async (req, res) => {
    try {
        const tags = await Tags.findAll({ where: { id: req.body.tags } });
        const task = await Tasks.create({
            name: req.body.name,
            description: req.body.description,
        })

        await task.setCreatedBy(req.user)
        await task.addTags(tags)
        await task.reload();
        const taskWithTags = await Tasks.findAll({
            where: { id: task.id },
            include: [{
                model: Tags,
                attributes: ['id', 'name'],
                through: { attributes: [] }
            }]
        });
        return res.status(200).send(taskWithTags)
    } catch (err) {
        return res.sendStatus(409);
    }
})

router.delete('/:id([0-9]+)', verifyToken, async (req, res) => {
    try {
        const task = await Tasks.findByPk(req.params.id);
        if (task.created_by != req.user) {
            return res.sendStatus(403);
        }
        await task.destroy();
        return res.sendStatus(204);
    } catch (err) {
        return res.sendStatus(500);
    }
})

router.put('/:id([0-9]+)', verifyToken, async (req, res) => {
    try {
        const task = await Tasks.findOne({
            where: { id: req.params.id },
            include: [{
                model: Users,
                as: 'createdBy',
                attributes: ['username', 'id']
            },
            {
                model: Users,
                as: 'assignTo',
                attributes: ['username', 'id']
            }]
        });

        if (task.created_by != req.user) {
            return res.sendStatus(403);
        }

        for (const field of ['name', 'description']) {
            if (req.body.hasOwnProperty(field)) task[field] = req.body[field];
        }
        if (req.body.hasOwnProperty('assignTo') && await Users.findByPk(req.body.assignTo)) {
            task.setAssignTo(req.body.assignTo);
        }

        task.save();

        return res.status(200).send(task);
    } catch (err) {
        return res.sendStatus(409);
    }
})

module.exports = router;