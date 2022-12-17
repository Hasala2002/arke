import { IconMoodTongueWink2, IconPhotoUp, IconSend } from '@tabler/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useArke } from '../../utilities/Arke.Context'
import * as styles from "./styles/SendArea.module.scss"
import { v4 as uuidv4 } from 'uuid';
const SendArea = () => {

  const input = useRef(null)
  const {roomMessages,setRoomMessages,currentUser,socket,connectToRoom,sendTextMessage} = useArke()

  const handleConnectToRoom = () =>{
    const roomId = uuidv4()
    connectToRoom(roomId)
  }

  useEffect(()=>{
    input.current.addEventListener("input",()=>{
      let currentLines = ((input.current.value).split("\n")).length
      if(currentLines<3){
        input.current.style.height= `${18*currentLines}px`
      }
    })

    input.current.addEventListener("keydown",(e)=>{
      if(e.key === "Enter" && !e.shiftKey){
        e.preventDefault()
        if(input.current.value!==""){
          let message = {
            senderName: currentUser.senderName,
            senderId: currentUser.senderId,
            message: input.current.value,
            type: "textMessage",
            timeStamp: new Date(),
          }
          // setRoomMessages((roomMessages) => [...roomMessages,message])
          sendTextMessage(message)
          input.current.value=""
          input.current.style.height= `${18}px`
        }
      }
    })

  },[])

  return (
    <>
      <textarea ref={input} style={{height:18}} resize="none" placeholder="Message @myRoom here. Say Howdy! 🤠" />
      <div className={styles.sendAreaBtn}>
        <IconMoodTongueWink2 color={"#C5A3FF"} size={22} />
      </div>
      <div className={styles.sendAreaBtn}>
        <IconPhotoUp color={"#C5A3FF"} size={22} />
      </div>
      <div className={styles.sendAreaBtn} onClick={handleConnectToRoom}>
        <IconSend color={"#C5A3FF"} size={22} />
      </div>
    </>
  )
}

export default SendArea