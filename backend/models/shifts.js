import mongoose  from "mongoose";



const SchemaShifts = new mongoose.Schema({
    hour: String,
    court: String,
    date: String,
    player: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

  const Shifts= mongoose.model("Shifts", SchemaShifts)


  export default Shifts