import axios from 'axios';
import { createContext , useEffect, useState ,useRef } from 'react';
import io from 'socket.io-client';



const AuthContext = createContext();

 export const AuthContextProvider = ({children ,json ,logged}) => {

    const [userLoggedIn , setUserLoggedIn] = useState(false);
    const [find , setFind] = useState(false);
    const [users ,setUsers] = useState(null);
    const socket = useRef();

    useEffect(() => {
      socket.current = io("ws://localhost:27017")
     } , []);
 
    useEffect(() => {
       socket.current.on("getOnlineUsers" , OnlineUsers => {
          setUsers(OnlineUsers)
       })
     },[]);

    async function getUserLoggedIn() {
        const usersloggedIn = await axios.get("http://localhost:27017/authentication/loggedIn",{withCredentials:true});
        setUserLoggedIn(usersloggedIn.data);  
    }

//   async function getIp() {
//     const usersloggedIn = await axios.get("http://localhost:27017/get/ip/address",{withCredentials:true});
//     console.log(usersloggedIn.data)
    
// }

// useEffect(() => {
//   getIp();
// },[]);
async function getUserinfo() {
  const usersloggedIn = await axios.get("http://localhost:27017/authentication/findUser",{withCredentials:true});
  setFind(usersloggedIn.data);  
}

useEffect(() => {
  async function getSession() {
     await axios.get("http://localhost:27017/session",{withCredentials:true});}
getSession();
},[]);
useEffect(() => {
  getUserLoggedIn()
},[]);

useEffect(() => {
  getUserinfo()
},[]);




    return(
    <AuthContext.Provider value={{ userLoggedIn ,getUserLoggedIn ,find ,users}} >
       {children}
    </AuthContext.Provider>
    ) 

}

export default AuthContext;


