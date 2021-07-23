import * as express from "express"
const router = express.Router()
import { getByName, msg } from "../functions.js"


router.get('/', async (req, res, next) => {
    if (!req.query.hasOwnProperty('name')) return next();

    const NAME = String(req.query.name).replace("%",' ').trim();
    if (typeof NAME !== 'string' || NAME.length < 2)
        return res.send({ msg: 'Nombre invalido' })

res.send(await getByName(NAME)); //Obtain Search of LOCAL_DB, and EXT_API_DB

// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/genres
// GET https://api.rawg.io/api/games/{id}
})

module.exports = router;