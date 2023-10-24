import { IconMoodTongueWink2, IconPhotoUp, IconSend, IconX } from '@tabler/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useArke } from '../../utilities/Arke.Context'
import * as styles from "./styles/SendArea.module.scss"
import { v4 as uuidv4 } from 'uuid';

import data from '@emoji-mart/data'
import EmojiPicker, { Theme } from 'emoji-picker-react'

const SendArea = () => {

  const input = useRef(null)
  const { selectedReply, setSelectedReply, currentUser, sendTextMessage } = useArke()

  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(prevVisible => !prevVisible);
  };


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

  const onClick = (emojiData, event) => {
    const inputRef = input.current;
    if (!inputRef) return;

    const startPosition = inputRef.selectionStart; // Get the cursor position
    const endPosition = inputRef.selectionEnd; // Get the end of the selected text

    const currentValue = inputRef.value;
    const emoji = emojiData.emoji;

    // Insert the emoji at the cursor position
    const newValue =
      currentValue.substring(0, startPosition) +
      emoji +
      currentValue.substring(endPosition);

    inputRef.value = newValue;
    inputRef.selectionStart = inputRef.selectionEnd = startPosition + emoji.length; // Set the cursor after the inserted emoji
  };

  return (
    <>
      <div className={styles.sendAreaMain}>
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
        <div className={styles.sendAreaBtn} onClick={toggleEmojiPicker}>
          {/* {emojiPickerVisible && (
            <div className={`${styles.emojiKeyboard} ${styles.emojiKeyboardVisible}`}>
              <EmojiPicker
                theme={Theme.DARK}
                onEmojiClick={onClick}
              />
            </div>
          )} */}
          <IconMoodTongueWink2 size={22} />
        </div>
        <div className={styles.sendAreaBtn}>
          <IconPhotoUp color={"#C5A3FF"} size={22} />
        </div>
        <div className={styles.sendAreaBtn} onClick={handleSendMessage}>
          <IconSend size={22} />
        </div>
      </div>
      <div className={`${styles.sendAreaSubMenu} ${emojiPickerVisible ? null : styles.sendAreaSubMenuClosed}`} >
        <EmojiPicker
          theme={Theme.DARK}
          onEmojiClick={onClick}
        />
      </div>
    </>
  )
}

export default SendArea