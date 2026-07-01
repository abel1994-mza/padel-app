import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"



const ViewReservations = ()=>{
   const [reservations, setReservations]= useState([])
   const [modalOpen, setModalOpen] = useState(false)
const [reservationToDelete, setReservationToDelete] = useState(null)
    const {token} = useAuth() 
    const navigate = useNavigate()

   useEffect(()=>{
  

   const getReservations =async ()=>{
    try {
         const response =await  fetch("http://localhost:3001/api/reserva/my-shifts",  {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
         const data =  await response.json()
         setReservations(data)
    } catch (error) {
        console.log("Error al traer la reservas", error);
        
    }
   }
   getReservations()


   },[])
   
//Cancelar turno
const handleCancel = async(id)=>{
try {
  const response = await fetch(`http://localhost:3001/api/reserva/cancel/${id}`, {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
  
})
const data = await response.json()
setReservations(reservations.filter(r => r._id !== id))  
   
} catch (error) {
  console.log("Error al cancelar la turno", error)
}
}


   return (
  <div className="px-4 py-8 max-w-4xl mx-auto">
    <div className="flex items-center gap-4 mb-6">
      <button 
        onClick={() => navigate(-1)}
        className="bg-surface-2 hover:bg-border text-text px-4 py-2 rounded-lg text-sm"
      >
        ← Volver
      </button>
      <h1 className="font-bold text-2xl text-text">Mis reservas</h1>
    </div>

    <div className="flex flex-col gap-3">
      {reservations.map((r) => (
        <div 
          key={r._id}
          className="bg-surface border border-border rounded-xl p-5 flex justify-between items-center"
        >
          <div>
            <h2 className="text-text font-semibold">{r.court}</h2>
            <p className="text-text-muted text-sm mt-1">{r.date} — {r.hour}</p>
          </div>
          <button
            onClick={() =>{
              setReservationToDelete(r) 
              setModalOpen(true)
            } }
            className="bg-danger hover:bg-red-700 text-text text-xs px-3 py-1 rounded-full"
          >
            Cancelar
          </button>
          <span className="bg-primary text-text text-xs px-3 py-1 rounded-full">
            Confirmada
          </span>
        </div>
      ))}
    </div>
    {modalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-sm">
      <h2 className="text-text font-bold text-lg mb-2">¿Cancelar reserva?</h2>
      <p className="text-text-muted text-sm mb-6">
        {reservationToDelete?.court} — {reservationToDelete?.hour} — {reservationToDelete?.date}
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => setModalOpen(false)}
          className="flex-1 bg-surface-2 text-text py-2 rounded-lg text-sm"
        >
          Volver
        </button>
        <button
          onClick={() => {
            handleCancel(reservationToDelete._id)
            setModalOpen(false)
          }}
          className="flex-1 bg-danger hover:bg-red-700 text-text py-2 rounded-lg text-sm"
        >
          Sí, cancelar
        </button>
      </div>
    </div>
  </div>
)}
  </div>
  
)
}



export default ViewReservations