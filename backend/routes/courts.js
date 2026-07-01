import express from "express"
import Courts from "../models/courts.js"




const router = express.Router()




router.post("/",async(req,res)=>{
    const newCourts = await Courts.create(req.body)
    res.json(newCourts)
})



router.get("/",async(req,res)=>{
    const courts = await Courts.find()
    res.json(courts)
})



router.delete("/:id",async (req,res)=>{
    const deleteCourts  = await Courts.findByIdAndDelete(req.params.id)
    res.json(deleteCourts)
})


export default router