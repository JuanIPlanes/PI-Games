const router = require('express').Router();
const Genres = require('./genres');
const VideoGames = require('./videogames.index');

router.use('/genres', Genres);
router.use('/videogame', VideoGames);


module.exports = router;
