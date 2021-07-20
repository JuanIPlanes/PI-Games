import * as express from "express"
const router = express.Router()

router.post('/', async (req, res) =>
    res.send("pogames"))

module.exports = router;