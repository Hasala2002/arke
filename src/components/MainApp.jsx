import React, { useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Chat from './app-components/Chat'
import SideBar from './app-components/SideBar'
import * as styles from "./styles/MainApp.module.scss"
import { useArke } from './utilities/Arke.Context'
import { motion } from "framer-motion"

const MainApp = () => {

  const MainContainer = useRef()

  const { currentUser, setArkeTitle, secretKey } = useArke()

  const [toggleSideBar, setToggleSideBar] = useState(true)

  const handleMouseMove = e => {
    // const { currentTarget: target } = e;
    // const rect = target.getBoundingClientRect(),
    //   x = e.clientX - rect.left,
    //   y = e.clientY - rect.top

    // console.log("--mouse-x", `${x}px`);
    // console.log("--mouse-y", `${y}px`);
    // target.style.setProperty("--mouse-x", `${x}px`);
    // target.style.setProperty("--mouse-y", `${y}px`);



  }

  // useEffect(()=>{
  //   const unloadCallback = (event) => {      
  //       const e = event || window.event;
  //       //console.log(e)
  //       e.preventDefault();
  //       if (e) {
  //         e.returnValue = ''
  //       }
  //       return '';

  //   };

  useEffect(() => {
    if (currentUser.roomName) {
      setArkeTitle(`Arkē | @${currentUser.roomName}`)
    }
  }, [currentUser])

  //   window.addEventListener("beforeunload", unloadCallback);
  //   return () => {
  //     //cleanup function
  //     window.removeEventListener("beforeunload", unloadCallback);
  //   }

  // },[])

  return (
    <motion.div initial={{ y: 0, scale: 0.99, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ y: 0, scale: 0.99, opacity: 0 }}
      transition={{ type: "tween", duration: 0.25 }} ref={MainContainer} className={styles.MainApp}>
      {currentUser.senderName ? null : <Navigate to="/createroom" />}
      <div className={toggleSideBar ? styles.SideBar : styles.SideBarClosed}>
        <SideBar setToggleSideBar={setToggleSideBar} />
      </div>
      <div className={styles.App} onMouseMove={handleMouseMove}>
        <Chat setToggleSideBar={setToggleSideBar} />
      </div>
    </motion.div>
  )
}

export default MainApp