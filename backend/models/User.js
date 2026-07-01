
import mongoose from "mongoose";




const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    rol: {
        type:String,
        default: "usuario"
    }
})



export default mongoose.model("User", UserSchema)