import * as express from "express"
import { getGames, msg, Params } from "../functions";
const router = express.Router()
// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/genres
// GET https://api.rawg.io/api/games/{id}

router.get('/', async (req, res) => {
let _URL:any, { offset=0, order="ASC", by="name" }:Params = req.query, {next=undefined} = req.body;
        //!verify that NEXT is valid
    _URL = next === undefined ? false : await (async () => await new Promise(res => res(new URL(next))))()
        .catch((url) => ({ url, message: "invalid imageURL" }))
    if ((_URL?.message ?? false) ||
        !["DESC", "ASC"].includes(order) ||
        !["name", "rating"].includes(by) ||
        Number.isNaN(parseInt(offset))
    ) return res.send(msg("incorrect"))

    const GameList = await getGames({ offset: Number(offset), order, by}, next).catch(e=>e)
    // if (GameList.hasOwnProperty("msg")) {
    //     console.log(`------->----->---->${GameList.msg}<----<-----<-------`)
        
    //     return res.send({
    //         lastmsg: "------->----->---->" + GameList.toString() + "<----<-----<-------",
    //         next: _URL
    //     })
    // }
    return res.send(GameList)
})

module.exports = router;