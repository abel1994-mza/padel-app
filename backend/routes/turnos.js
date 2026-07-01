import express from "express"
import Turno from "../models/turnos.js"
import verificarToken from "../middleware/auth.js"
const router = express.Router()





router.post("/",verificarToken, async (req,res)=>{
    const turnos = await Turno.create(req.body)
    res.json(turnos)
})



export default router