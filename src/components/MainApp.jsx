import React, { useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import Chat from './app-components/Chat'
import SideBar from './app-components/SideBar'
import * as styles from "./styles/MainApp.module.scss"
import { useArke } from './utilities/Arke.Context'

const MainApp = () => {

  const MainContainer = useRef()

  const {currentUser} = useArke()

  return (
    <div ref={MainContainer} className={styles.MainApp}>
        {currentUser.senderName ? null : <Navigate to="/createroom"/>}
        <div className={styles.SideBar}>
            <SideBar />
        </div>
        <div className={styles.App}>
            <Chat />
        </div>
    </div>
  )
}

export default MainApp