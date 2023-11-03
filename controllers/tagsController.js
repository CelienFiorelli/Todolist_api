const express = require('express');
const db = require("../models");
const Tags = db.tags;

const { verifyToken } = require('../middleware/verifyToken');
const { verifyParams } = require('../middleware/verifyParams');

const router = express.Router();

router.get('/', async (req, res) => {
    const tags = await Tags.findAll();
    return res.status(200).send(tags);
})

router.post('/', verifyToken, verifyParams(["name"]), async (req, res) => {
    try {
        const tag = await Tags.create({name: req.body.name});
        return res.status(201).send(tag);
    } catch (err) {
        return res.sendStatus(409);
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