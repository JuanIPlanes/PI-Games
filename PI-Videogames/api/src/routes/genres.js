const { Genre } = require('../db'),
    router = require('express').Router();

router.get('/', async (req, res) =>
    res.send(await Genre.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    })
    ))

module.exports = router;