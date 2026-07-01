import { AuthContext } from "./AuthContext";
import { useState } from "react";




export const AuthProvider = ({children})=>{
    const [usuario,setUsuario]= useState(localStorage.getItem("name") || null)
    const [token,setToken] = useState(localStorage.getItem("token") || null)

    const login = (datos)=>{
        setUsuario(datos.name)
        setToken(datos.token)
        localStorage.setItem("name", datos.name)
        localStorage.setItem("token", datos.token)
    }

    const logout = ()=>{
        setUsuario(null)
        setToken(null)
        localStorage.removeItem("name")
        localStorage.removeItem("token")
    }


   return(
    <AuthContext.Provider value= {{usuario,token, login,logout}}>
        {children}
    </AuthContext.Provider>
   )
}