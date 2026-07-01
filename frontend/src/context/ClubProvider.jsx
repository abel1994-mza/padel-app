import { ClubContext } from "./clubContext";
import { useState } from "react";


 
export const ClubProvider = ({children})=>{
    const [NameClub, SetNameClub]= useState("Club Padel Mendoza Argentina")

    return(
        <ClubContext.Provider value={{NameClub}}>
            {children}
        </ClubContext.Provider>
    )
}