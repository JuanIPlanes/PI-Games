import * as express from "express"
const router = express.Router()

router.get('/', async (req, res, next) => {
            console.log(req.body);
    if(!Object.entries(req.query).length) return next()
    res.send("vgname")
})

module.exports = router;