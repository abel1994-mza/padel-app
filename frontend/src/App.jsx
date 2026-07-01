
import { Route, Routes,Navigate } from "react-router-dom"
import Courts from "./component/Courts"
import Login from "./component/Login/Login"
import NavBar from "./component/NavBar"
import Register from "./component/Register/Register"
import RoutetProtected from "./component/Route/RouteProtected"
import ViewReservations from "./component/ViewReservation/ViewReservation"

function App() {


  return (
    <div>
    <NavBar/>
   <Routes>
     <Route path="/" element={<Navigate to="/login" />} />
     <Route path="/login" element={<Login/>}/>
     <Route path="/register" element={<Register/>}/>
     
     <Route path="/courts" element={ 
      <RoutetProtected>
         <Courts/>
      </RoutetProtected>
     } />

    <Route path="/my-reservations" element={
      <RoutetProtected>
        <ViewReservations/>
      </RoutetProtected>
    } >
      
    </Route>

   </Routes>

    
    </div>
  )
}

export default App