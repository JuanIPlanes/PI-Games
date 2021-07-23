import * as express from "express"
const router = express.Router()
import { msg, Props, createGame, arrayChecker, dateChecker, dateParser } from "../functions.js"

router.post('/', async (req, res) => {
    //! props
    let body = { ...req.body }
        , { name, description, releaseDate, rating, platform, imageURL }: Props = body
        , { genres } = req.body;
    delete body.genres;
    //! verification have all props
    if (!['name', 'description', 'releaseDate', 'rating', 'platform', "imageURL"]
        .every((prop: string) =>
            Object.entries(body).some((propName: Array<any>) =>
                propName[0] === prop)
    )
    ) return res.send(msg("empty"))
    //! verification all props are correct
    // let veracityImage: Promise<object> = await (async () => await new Promise((res):object => res(new URL(imageURL))))()
    //     .then((e):object=>e)
    //     .finally((url:void) => console.log(url))
    let _URL = await (async () => await new Promise(res => res(new URL(imageURL))))()
        .catch((url) => ({ url, message:"invalid imageURL"}))
    if (_URL?.message ?? false) return res.send(msg("incorrect"))
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