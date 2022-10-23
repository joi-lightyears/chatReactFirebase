import {React, useContext} from 'react'
import Sidebar from "../components/sidebar"
import Chat from "../components/chat"
import "../style.scss"
import {motion} from "framer-motion"
import { getDatabase, ref, onDisconnect, onValue } from "firebase/database";
import {AuthContext} from "../context/AuthContext"
const Home = () => {
  // presence detection
  const {currentUser} = useContext(AuthContext)
  const db = getDatabase();
  // const presenceRef = ref(db, 'users/' + currentUser.uid);
  // onDisconnect(presenceRef).set({
  //   onlineState: false
  // });

  const connectedRef = ref(db, ".info/connected");
  onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
      console.log("connected");
    } else {
      console.log("not connected");
    }
  });

  return (
    <div className='home'>
        <motion.div
          initial="initialState"
          animate="animateState"
          exit="exitState"
          transition={{duration:0.5}}
          variants={{
            initialState: {
              opacity: 0,
              clipPath: "circle(0.0% at 50% 50%)",
            },
            animateState: {
              opacity: 1,
              clipPath: "circle(70.7% at 50% 50%)",
            },
            exitState: {
              opacity: 0,
              clipPath: "circle(0.0% at 50% 50%)",
            },
          }}
        className="container">
            <Sidebar/>
            <Chat/>
        </motion.div>
    </div>
  )
}

export default Home