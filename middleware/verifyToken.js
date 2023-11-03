const { token } = require('../config.json');
const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        jwt.verify(authHeader, token, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user.userId;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = { verifyToken }