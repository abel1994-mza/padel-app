
import { useState } from "react";
import { Link } from "react-router-dom";



function Register(){
   const [email, setEmail]= useState("")
   const [password, setPassword] = useState("")
   const [name, setName]= useState("")
   const[error,setErorr]= useState("")


  const submit = async(e)=>{
e.preventDefault()
  
 if(!email.includes("@")){
  setErorr("El Email debe contener @")
  return
 }
    const response = await fetch("http://localhost:3001/api/auth/register", {
        method: 'POST',
        headers:{
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email,password})
    })
    const datos =await   response.json()
     console.log(datos);
     
  }



    return(
         <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-surface p-8 rounded-xl w-full max-w-md">
        <h2 className="text-text text-2xl font-bold mb-6 text-center">Crear cuenta</h2>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-surface-2 text-text px-4 py-3 rounded-lg outline-none placeholder-text-muted"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`bg-surface-2 text-text px-4 py-3 rounded-lg outline-none placeholder-text-muted ${error ? "border border-red-500": "" }`} />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-surface-2 text-text px-4 py-3 rounded-lg outline-none placeholder-text-muted"
          />
          
          <button
            type="submit"
            className="bg-primary hover:bg-primary-hover text-text py-3 rounded-lg font-semibold mt-2"
          >
            Registrarse
          </button>
        </form>
        <p className="text-text-muted text-sm text-center mt-4">
           ¿Ya tenés cuenta?{' '}
           <Link to="/login" className="text-primary hover:underline">
            Iniciá sesión
            </Link>
        </p>
      </div>
    </div>
    )
    
   }





export default Register