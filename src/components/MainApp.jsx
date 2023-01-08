import React, { useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Chat from './app-components/Chat'
import SideBar from './app-components/SideBar'
import * as styles from "./styles/MainApp.module.scss"
import { useArke } from './utilities/Arke.Context'

const MainApp = () => {

  const MainContainer = useRef()

  const {currentUser} = useArke()

  const [toggleSideBar,setToggleSideBar] = useState(true)

  return (
    <div ref={MainContainer} className={styles.MainApp}>
        {/* {currentUser.senderName ? null : <Navigate to="/createroom"/>} */}
        <div className={toggleSideBar ? styles.SideBar : styles.SideBarClosed}>
            <SideBar setToggleSideBar={setToggleSideBar} />
        </div>
        <div className={styles.App}>
            <Chat setToggleSideBar={setToggleSideBar} />
        </div>
    </div>
  )
}

export default MainApp