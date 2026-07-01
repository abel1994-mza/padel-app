
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function NavBar() {
  const { usuario, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

    const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate("/login")
  }

  return (
     <nav className="bg-bg border-b border-border px-6 py-4 flex justify-between items-center relative">
      <Link to="/courts">
        <h1 className="text-text text-xl font-bold">🎾 PádelApp</h1>
      </Link>
      

      {usuario && (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-text text-2xl"
        >
          ☰
        </button>
      )}

      {menuOpen&& (
        <div className="absolute top-16 right-6 bg-surface border border-border rounded-lg p-4 flex flex-col gap-3 w-48">
          <span className="text-text-muted text-sm">Hola, {usuario}</span>
                <Link 
                    to="/my-reservations"
                    onClick={() => setMenuOpen(false)}
                    className="text-text-muted hover:text-text text-sm"
                >
                  Mi reserva</Link>
          <button
            onClick={handleLogout}
            className="bg-danger hover:bg-red-700 text-text px-4 py-2 rounded-lg text-sm"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </nav>
  )
}

export default NavBar