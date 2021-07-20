import * as express from "express"
const router = express.Router()

router.get('/:id', async (req, res, next) => {
    console.log(req.params.id)
  if(!req.params.id) return next()  
    res.send("vgid")
})

module.exports = router;