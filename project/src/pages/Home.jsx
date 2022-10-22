import React from 'react'
import Sidebar from "../components/sidebar"
import Chat from "../components/chat"
import "../style.scss"
import {motion} from "framer-motion"
const Home = () => {
  return (
    <div 
    
    className='home'>
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
        }} className="container">
            <Sidebar/>
            <Chat/>
        </motion.div>
    </div>
  )
}

export default Home