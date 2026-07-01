//schema model 
import mongoose from "mongoose"

 
const schemaCourts= new mongoose.Schema({
  name: String,
  type: String
})


const Courts = mongoose.model( "Courts", schemaCourts)



export default Courts