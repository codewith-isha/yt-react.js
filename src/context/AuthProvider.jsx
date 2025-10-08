import { createContext, useContext, useEffect, useState } from "react";
import { fetchData } from "../utils/rapid";

export const AuthContext = createContext()

export  default function AuthProvider({children}){
  const [loading , setLoading] = useState(false)
  const [data ,setData] = useState([])
  const [value , setValue] = useState("New")

   useEffect(() => {
    fetchAlldata(value)
   },[value])

   const fetchAlldata = async(query) => {
    setLoading(true)
    try{
      const contents = await fetchData(`search/?q=${query}`)
      console.log(`Fetched contents:`,contents)

      setData(
        contents?.data?.contents||
        contents?.items||
         contents?.contents ||       
        contents?.items || 
        []
      )
    }catch(error){
      console.error(`Error fecthing data`,error)
      setData([])
    }finally{
      setLoading(false)
    }
  }
   return(
    <AuthContext.Provider value={{loading,data,value,setValue}}>
      {children}
    </AuthContext.Provider>
   )
}

export const useAuth=()=>useContext(AuthContext)