const express = require('express');
const Tags = require('../models/tags.model');

const { verifyToken } = require('../middleware/verifyToken');
const { verifyParams } = require('../middleware/verifyParams');

const router = express.Router();

router.get('/', async (req, res) => {
    const tags = await Tags.findAll();
    return res.status(200).send(tags);
})

router.get('/:id([0-9]+)', async (req, res) => {
    try {
        const tags = await Tags.findByPk(req.params.id);
        return res.status(200).send(tags);
    } catch (error) {
        return res.status(404).send({message: "Tag not found"})
    }
})

router.post('/', verifyToken, verifyParams(["name"]), async (req, res) => {
    try {
        const tag = await Tags.create({name: req.body.name});
        return res.status(201).send(tag);
    } catch (err) {
        return res.status(409).send({ message: `${req.body.name} already exist`});
    }
})

router.delete('/:id([0-9]+)', verifyToken, async (req, res) => {
    try {
        const tag = await Tags.findByPk(req.params.id);
        await tag.destroy();

        return res.sendStatus(204);
    } catch (err) {
        return res.sendStatus(409);
    }
})

module.exports = router;