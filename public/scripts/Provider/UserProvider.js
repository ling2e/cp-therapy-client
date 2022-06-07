import React, { useContext, useState ,useEffect} from 'react'
import axios from 'axios';
import { serverUrl } from '../_setting';

const userContext = React.createContext()




// function
export const useUserContext = () => {
  return useContext(userContext)
};

export const UserProvider = ({children}) => {
  const [userDetails ,setUserDetails] = useState()
  if(typeof(window) != "undefined"){
    let token = localStorage.getItem("token")
    if(token == "undefined") localStorage.removeItem("token")
    if(token!=null){
      if(!userDetails){
        axios.post(serverUrl+"auth/verify",{
          accessToken : token
        }).then((res)=>{
          setUserDetails(res.data) 
        }).catch((err)=>{
          localStorage.getItem("token")
        })
      }
    }
  }

  return (
    <userContext.Provider value={userDetails}>
      {children}
    </userContext.Provider>
  )
}
