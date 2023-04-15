import {React, useContext, useEffect, useState} from 'react'
import Sidebar from "../components/sidebar"
import Chat from "../components/chat"
import "../style.scss"
import {motion} from "framer-motion"


const Home = () => {
  // presence detection
  
  // const presenceRef = ref(db, 'users/' + currentUser.uid);
  // onDisconnect(presenceRef).set({
  //   onlineState: false
  // });
  
  // const connectedRef = ref(db, ".info/connected");
  // onValue(connectedRef, (snap) => {
  //   if (snap.val() === true) {
  //     console.log("connected");
  //   } else {
  //     console.log("not connected");
  //   }
  // });
  const [activeChat, setActiveChat] = useState(null)
  
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
              clipPath: "circle(100% at 50% 50%)",
            },
            exitState: {
              opacity: 0,
              clipPath: "circle(0.0% at 50% 50%)",
            },
          }}
        className="container">
            <Sidebar setActiveChat={setActiveChat} activeChat={activeChat}/>
            <Chat/>
        </motion.div>
    </div>
  )
}

export default Home