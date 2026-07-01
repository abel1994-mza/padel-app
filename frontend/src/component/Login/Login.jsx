import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"


function Login (){
    const {login}= useAuth()
    const navigate  = useNavigate()
    const[error,setError]= useState("")
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submit = async (e)=>{
    e.preventDefault()

   const response = await fetch('http://localhost:3001/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email, password })
})
const datos = await response.json()
 if (datos.error) {
    setError(datos.error)
    return
  }
   setError("")
   login(datos)  
   navigate("/courts")
  }

return(
  <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-700 text-white px-4 py-3 rounded-lg outline-none placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-700 text-white px-4 py-3 rounded-lg outline-none placeholder-gray-400"
          />
        {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold mt-2"
          >
            Ingresar
          </button>
        </form>
        <p className="text-text-muted text-sm text-center mt-4">
             ¿No tenés cuenta?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Registrate
              </Link>
         </p>
      </div>
    </div>
)





}

export default Login