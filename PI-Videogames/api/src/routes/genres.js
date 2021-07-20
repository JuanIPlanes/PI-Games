const {  } = require('../functions')
    , { Genre } = require('../db');
const router = require('express').Router();

router.get('/', async (req, res) =>
    res.send(await Genre.findAll({
    attributes: {
        exclude: ["createdAt", "updatedAt"]
    }
    })
))

module.exports = router;