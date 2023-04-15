import {React, useContext} from 'react'
import Navbar from "./navbar"
import Search from "./search"
import Chats from "./chats"
import {getMessaging, getToken} from "firebase/messaging"
import { updateDoc, doc } from 'firebase/firestore'
import { app } from '../firebase'
import { db } from "../firebase";
import { AuthContext } from '../context/AuthContext'

const Sidebar = ({setActiveChat, activeChat}) => {
  const {currentUser} = useContext(AuthContext)
    // const db = getDatabase();
  const messaging = getMessaging(app);
  async function HandleToken(){
    await updateDoc(doc(db, "users",currentUser.uid), {
      "token":await  getToken(messaging,{vapidKey: 'BDqjGxkUI5EbrVSllKxDBbXyvZoVqfoN33DhdOBT-vr_4C-urbR9KlyNhEuJFMdrg-DJ4Gz_hbNcwmhGouV8ypY'})
  }) 
   }
  //  HandleToken()
  return (
    <div className='sidebar'>
      <Navbar/>
      <Search/>
      <div className="wrap">
        <Chats setActiveChat={setActiveChat} activeChat={activeChat}/>
      </div>
      <div className="footer">
          Source code can be found at <a href="https://github.com/joi-lightyears" target="_blank" rel="noopener noreferrer">Github</a> 
      </div>
    </div>
  )
}

export default Sidebar