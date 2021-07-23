import * as express from "express"
const router = express.Router()

router.get('/', async (req, res) => res.send("glist"))

module.exports = router;