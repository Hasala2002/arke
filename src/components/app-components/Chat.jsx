import {  IconGridDots, IconGridPattern, IconInfoSquare, IconMessages, IconUserCircle } from '@tabler/icons'
import React, { useEffect } from 'react'
import { useArke } from '../utilities/Arke.Context'
import ChatBox from './chat-components/ChatBox'
import SendArea from './chat-components/SendArea'
import * as styles from "./styles/Chat.module.scss"

const Chat = ({setToggleSideBar}) => {

  const handleMouseMove = e =>{
    const  {  currentTarget: target } = e;
    const rect = target.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top
    
      target.style.setProperty("--mouse-x", `${x}px`);
      target.style.setProperty("--mouse-y", `${y}px`);
  }

  const {currentUser,roomCount, useMediaQuery} = useArke()

  const isMobile = useMediaQuery("max-width: 864px)");


  return (
    <>
        <div className={styles.Header}>
        <div className={styles.Logo} onClick={
          ()=>{
            if(!isMobile){
              setToggleSideBar(true)
            }
          }
        }>
                {!isMobile ? <IconGridDots size={22} stroke={2.5} /> : <IconMessages size={22} stroke={2.5} />}
            </div>
            <div className={styles.Title}>
                <span>{currentUser?currentUser.roomName : ""}</span>
                <p>chatroom is live and active</p>
            </div>
            <div className={styles.chatStats}>
            <div className={styles.Chip}>
            <IconUserCircle stroke={2} color={"#C5A3FF"} size={20} />
            <span>{roomCount ? roomCount : "00"}</span>
          </div>
          <IconInfoSquare size={20} />
            </div>
        </div>
        <div className={styles.ChatBox}>
        <div className={styles.Wrapper}>
            <ChatBox />
        </div>
          {/* <ChatBox/> */}
        </div>
        <div className={styles.SendArea}>
          <SendArea />
        </div>
    </>
  )
}

export default Chat