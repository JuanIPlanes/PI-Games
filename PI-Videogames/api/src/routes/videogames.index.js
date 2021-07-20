const router = require('express').Router()
    , getByName = require('./vg_name')
    , getById = require('./vg_id')
    , gameList = require('./game_list')
    , postGame = require('./post_game');

// Configurar los routers
router.use('/', postGame);
router.use('/:id', getById);
router.use('/', getByName);
router.get('/', gameList);

module.exports = router;