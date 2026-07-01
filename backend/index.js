import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import courtsRoutes from "./routes/courts.js"
import authRoutes from "./routes/auth.js"
import reservaTurno from "./routes/reservaTurno.js"




dotenv.config()


const app = express()

app.use(cors())
app.use(express.json())


//Conectando a mongoodb 
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("Servidor conectado a MongoDB"))
.catch((err)=> console.log("error",err, ));





app.use("/api/courts", courtsRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/reserva", reservaTurno)





const PORT = 3001
app.listen( PORT, ()=>{
    console.log("Servidor corriendo en el puerto 3001");
    
})