import * as express from "express"
import { getById, msg } from "../functions.js"
const router = express.Router()

router.get('/:id', async (req, res, next) => {
    if (!req.params.id) return next(); //Route Verificator

    const ID = Number(req.params.id);
    if (typeof ID !== 'number' || Number.isNaN(ID)) return res.send({ "msg": "ID Invalido" })

    res.send(
        //! DB OPERATIVA CON 1000 slots
        ID <= 1300000 
            ? await getById(ID) 
            : msg("invalid")
    )
})

module.exports = router;