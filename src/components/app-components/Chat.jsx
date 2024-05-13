import { IconGridDots, IconGridPattern, IconInfoSquare, IconMessages, IconUserCircle } from '@tabler/icons-react'
import React, { useEffect } from 'react'
import { useArke } from '../utilities/Arke.Context'
import ChatBox from './chat-components/ChatBox'
import SendArea from './chat-components/SendArea'
import * as styles from "./styles/Chat.module.scss"


import ArkeToolTip from "../utilities/ArkeToolTip"
import Lightbox from './chat-components/Lightbox'
import ImageConfirm from './chat-components/ImageConfirm'

const Chat = ({ setToggleSideBar }) => {

  const handleMouseMove = e => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  const { currentUser, roomCount, useMediaQuery, readyToSendImage } = useArke()

  const isMobile = useMediaQuery("max-width: 864px)");


  return (
    <>
      <ImageConfirm />
      <Lightbox readyToSendImage={readyToSendImage} />
      {/* {
        readyToSendImage ? <ImageConfirm /> : null
      } */}
      <div className={styles.Header}>
        <div className={styles.Logo} onClick={
          () => {
            if (!isMobile) {
              setToggleSideBar(true)
            }
          }
        }>
          {!isMobile ? <IconGridDots size={22} stroke={2.5} /> : <IconMessages size={22} stroke={2.5} />}
        </div>
        <div className={styles.Title}>
          <span>{currentUser ? currentUser.roomName : ""}</span>
          <p>chatroom is live</p>
        </div>
        <div className={styles.chatStats}>
          <div className={styles.Chip}>
            <IconUserCircle stroke={2} size={20} />
            <span>{roomCount ? roomCount : "00"}</span>
          </div>
          <ArkeToolTip content={`This Arkē chatroom is live and active.`} align="right">
            <IconInfoSquare size={20} style={{ cursor: "pointer" }} />
          </ArkeToolTip>
        </div>
      </div>
      <div className={styles.ChatBox}>
        <div className={styles.Wrapper}>
          <ChatBox />
        </div>
        {/* <ChatBox/> */}
      </div>
      <div className={styles.SendArea}>
        <SendArea mainSendArea={true} />
      </div>
    </>
  )
}

export default Chat