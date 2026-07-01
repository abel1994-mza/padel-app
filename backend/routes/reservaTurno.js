import express from "express"
import Shifts from "../models/shifts.js"
import verificarToken from "../middleware/auth.js"



const routes = express.Router()



routes.post("/",verificarToken, async (req,res)=>{
   const {court,hour,date} = req.body
   const player= req.usuario.id
    const newCourts = await Shifts.create({court,hour,date,player})
    res.json(newCourts)
})


routes.get("/available",async (req,res)=>{
    const {court,date}= req.query

    const timeOfTheDay = [
         "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00",
    "16:00", "17:00", "18:00", "19:00",
    "20:00", "21:00", "22:00"
    ]


    const reservations = await Shifts.find({court,date})
    const BusySchedules = await reservations.map((r)=>r.hour)


    const availableTimes = timeOfTheDay.filter(h => !BusySchedules.includes(h))

    res.json(availableTimes)
})

routes.get("/my-shifts", verificarToken, async (req, res) => {
  const player = req.usuario.id
  const reservas = await Shifts.find({ player })
  res.json(reservas)
})
// Eliminar resrva. 
routes.delete("/cancel/:id",verificarToken,async (req,res)=>{
  const id = req.params.id
  const deleteShifts = await Shifts.findByIdAndDelete(id)
  res.json(deleteShifts)


})
export default routes 