import { IconMoodTongueWink2, IconPhotoUp, IconSend, IconX } from '@tabler/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useArke } from '../../utilities/Arke.Context'
import * as styles from "./styles/SendArea.module.scss"
import { v4 as uuidv4 } from 'uuid';
const SendArea = () => {

  const input = useRef(null)
  const { selectedReply, setSelectedReply, currentUser, sendTextMessage } = useArke()


  useEffect(() => {
    input.current.addEventListener("input", () => {
      let currentLines = ((input.current.value).split("\n")).length
      if (currentLines < 3) {
        input.current.style.height = `${18 * currentLines}px`
      }
    })
  }, [])

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (input.current.value !== "") {
        let message = {
          senderName: currentUser.senderName,
          senderId: currentUser.senderId,
          message: input.current.value,
          type: "textMessage",
          timeStamp: new Date(),
          reply: selectedReply
        }
        // console.log(message)
        sendTextMessage(message)
        input.current.value = ""
        input.current.style.height = `${18}px`
        handleCloseReplyDialog()
      }
    }
  }

  const handleSendMessage = () => {
    if (input.current.value !== "") {
      let message = {
        senderName: currentUser.senderName,
        senderId: currentUser.senderId,
        message: input.current.value,
        type: "textMessage",
        timeStamp: new Date(),
      }
      // setRoomMessages((roomMessages) => [...roomMessages,message])
      sendTextMessage(message)
      input.current.value = ""
      input.current.style.height = `${18}px`
      handleCloseReplyDialog()
    }
  }

  const handleCloseReplyDialog = () => {
    setSelectedReply(null)
  }

  return (
    <>
      <div className={styles.sendTextArea}>
        <div className={selectedReply ? styles.ReplyContainer : styles.ReplyContainerClosed}>
          <div className={styles.chatMessage}>
            <span className={styles.sender}>{selectedReply ? selectedReply.senderName : ""}</span>
            <span className={styles.message}>{selectedReply ? selectedReply.message : ""}</span>
          </div>
          <div className={styles.closeReply} onClick={handleCloseReplyDialog}>
            <IconX stroke={0.5} size={20} />
          </div>
        </div>
        <textarea ref={input} style={{ height: 18 }} onKeyDown={(e) => { handleKeyPress(e) }} resize="none" placeholder={`Message @${currentUser ? currentUser.roomName : "myRoom"} here. Say Howdy! 🤠`} />
      </div>
      <div className={styles.sendAreaBtn}>
        <IconMoodTongueWink2 size={22} />
      </div>
      {/* <div className={styles.sendAreaBtn}>
        <IconPhotoUp color={"#C5A3FF"} size={22} />
      </div> */}
      <div className={styles.sendAreaBtn} onClick={handleSendMessage}>
        <IconSend size={22} />
      </div>
    </>
  )
}

export default SendArea