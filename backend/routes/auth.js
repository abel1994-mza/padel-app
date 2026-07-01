import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()



//Registro de user 

router.post("/register", async(req,res)=>{
  const {name, email, password}= req.body

  const passwordHash = await bcrypt.hash(password,10)

  const usuario = await User.create({
    name,
    email,
    password: passwordHash
  })

  res.json(usuario)

})

// LOGIN 
router.post("/login", async(req,res)=>{
  const {email, password} = req.body

  const usuario = await User.findOne({email})

  if(!usuario){
    return res.status(401).json({error: "Usuario no encontrado"})
   }

   const passwordCorrect =  await bcrypt.compare(password , usuario.password)

   if(!passwordCorrect){
      return res.status(401).json({error: "Contraseña incorrecta"})
    }

      const token = jwt.sign(
   {id: usuario.id, rol: usuario.rol},
      'secreto123',
      {expiresIn:"7d"}
  )

  res.json({ token, name: usuario.name })
  
})

export default router