import {React, useContext} from 'react'
import Navbar from "./navbar"
import Search from "./search"
import Chats from "./chats"
import {getMessaging, getToken} from "firebase/messaging"
import { updateDoc, doc } from 'firebase/firestore'
import { app } from '../firebase'
import { db } from "../firebase";
import { AuthContext } from '../context/AuthContext'

const Sidebar = () => {
  const {currentUser} = useContext(AuthContext)
    // const db = getDatabase();
  const messaging = getMessaging(app);
  async function HandleToken(){
    await updateDoc(doc(db, "users",currentUser.uid), {
      "token":await  getToken(messaging,{vapidKey: 'BDqjGxkUI5EbrVSllKxDBbXyvZoVqfoN33DhdOBT-vr_4C-urbR9KlyNhEuJFMdrg-DJ4Gz_hbNcwmhGouV8ypY'})
  }) 
   }
   HandleToken()
  return (
    <div className='sidebar'>
      <Navbar/>
      <Search/>
      <div className="wrap">
        <Chats/>
      </div>
    </div>
  )
}

export default Sidebar