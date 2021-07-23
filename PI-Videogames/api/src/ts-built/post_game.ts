import * as express from "express"
const router = express.Router()
import { msg, Props, createGame, arrayChecker, dateChecker, dateParser } from "../functions.js"

router.post('/', async (req, res) => {
    //! props
    let body = { ...req.body }
        , { name, description, releaseDate, rating, platform }: Props = body
        , { genres } = req.body;
    delete body.genres;
    //! verification have all props
    if (!['name', 'description', 'releaseDate', 'rating', 'platform']
        .every((prop: string) =>
            Object.entries(body).some((propName: Array<any>) =>
                propName[0] === prop)
    )
    ) return res.send(msg("empty"))
    //! verification all props are correct
    if (
        (typeof name !== "string"||
            name.length < 3 ||  //? name checher
            name.length > 30) ||
        typeof description !== "string" || //? desc checher
        arrayChecker(platform) ||   //? platform checher
        dateChecker(releaseDate) || //? Date checher X
        Number.isNaN(parseFloat(rating)) ||//? Rating checher
        (genres ? arrayChecker(genres): !!0)//? Genres checher
        ) return res.send(msg("incorrect"))
    return res.send(await createGame(body, genres))
    })
    module.exports = router;