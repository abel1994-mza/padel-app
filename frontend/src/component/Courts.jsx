import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"




const Courts= ()=>{
   const [courts, setCourts] = useState([])
   const [selectedCourt, setSelectedCourt] = useState(null)
   const [date, setDate] = useState("")            
const [selectedHours, setSelectedHours] = useState([])             
const [availableHours, setAvailableHours] = useState([]) 
const [message, setMessage] = useState("")
    

   useEffect(()=>{
     const getData = async ()=>{
      try {
        const response = await fetch("http://localhost:3001/api/courts");
        const data = await response.json()
        setCourts(data) 
        
      } catch (error) {
        console.log("Error al recibir los datos", error);
        
      }
     }
     getData()
   },[])

   useEffect(() => {
  if (!date || !selectedCourt) return

  const getAvailableHours = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/reserva/available?court=${selectedCourt.name}&date=${date}`
      )
      const data = await response.json()
      setAvailableHours(data)
    } catch (error) {
      console.log("Error al obtener horarios", error)
    }
  }

  getAvailableHours()
}, [date, selectedCourt])
  
const {token} = useAuth()
const handleReservar = async () => {
  for (const h of selectedHours) {
    await fetch('http://localhost:3001/api/reserva', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        court: selectedCourt.name,
        hour: h,
        date
      })
    })
  }
  setMessage(`✅ Reservas confirmadas — ${selectedHours.join(', ')}`)
  setSelectedHours([])
  
  const schedulesResponse = await fetch(
    `http://localhost:3001/api/reserva/available?court=${selectedCourt.name}&date=${date}`
  )
  const schedulesData = await schedulesResponse.json()
  setAvailableHours(schedulesData)
}
const toggleHour =  (h) => {
  if (selectedHours.includes(h)) {
    setSelectedHours(selectedHours.filter(s => s !== h))  // lo saca
  } else {
    if (selectedHours.length >= 2) return
    setSelectedHours([...selectedHours, h])
  }
}

   return(
 <div className="px-4 py-8 max-w-4xl mx-auto">
      <h1 className="font-bold text-2xl text-text mb-6">Canchas disponibles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {courts.map((c) => (
          <div
            key={c._id}
             onClick={() => setSelectedCourt(c)}
            className={`bg-surface border rounded-xl p-5 cursor-pointer transition ${
    selectedCourt?._id === c._id 
      ? 'border-primary border-2' 
      : 'border-border hover:border-primary'
  }`}
          >
            <h2 className="text-text font-semibold text-lg">{c.name}</h2>
            <p className="text-text-muted text-sm mt-1">{c.type}</p>
          </div>
        ))}
      </div>
          {selectedCourt && (
      <div className="mt-8">
        <h2 className="text-text font-bold text-xl mb-4">
          Reservar: {selectedCourt.name}
        </h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-surface-2 text-text px-4 py-3 rounded-lg outline-none"
        />
        {availableHours.length > 0 && (
      <div className="mt-6">
        <h3 className="text-text font-semibold mb-3">Horarios disponibles:</h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {availableHours.map((h) => (
            <button
              key={h}
             onClick={() => toggleHour(h)}
              className={`... ${
                selectedHours.includes(h)  
                  ? 'bg-primary text-text'
                  : 'bg-surface-2 text-text-muted hover:bg-primary hover:text-text'
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>
    )}
      </div>
    )}
    {selectedHours.length > 0 && (
  <button
    onClick={handleReservar}
    className="mt-6 bg-primary hover:bg-primary-hover text-text py-3 px-8 rounded-lg font-semibold"
  >
    Reservar {selectedCourt.name} — {selectedHours.join(', ')}
  </button>
)}
{message && (
  <p className="mt-4 text-primary font-semibold">{message}</p>
)}
    </div>
   )
}







export default Courts