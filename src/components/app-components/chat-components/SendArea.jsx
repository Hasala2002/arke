import { IconMoodTongueWink2, IconPhotoUp, IconSend, IconX } from '@tabler/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useArke } from '../../utilities/Arke.Context'
import * as styles from "./styles/SendArea.module.scss"
import { v4 as uuidv4 } from 'uuid';

import { encryptMessage, decryptMessage } from '../../utilities/Encryption';

import data from '@emoji-mart/data'

import EmojiPicker, { Theme } from 'emoji-picker-react'

const SendArea = ({ imageConfirm, setImageCaption, mainSendArea }) => {

  const input = useRef(null)
  const { selectedReply, setSelectedReply, currentUser, sendTextMessage, readyToSendImage, setReadyToSendImage, MAX_FILE_SIZE, arkeToasteer, secretKey } = useArke()

  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  useEffect(() => {
    if (readyToSendImage && imageConfirm) {
      setEmojiPickerVisible(false)
    }
  }, [readyToSendImage])

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(prevVisible => !prevVisible);
  };

  // const encryptMessage = (message) => {
  //   const cryptr = new Cryptr('myTotallySecretKey');
  //   const encryptedMessage = cryptr.encrypt(message);

  //   return message
  // }


  useEffect(() => {
    input.current.addEventListener("input", () => {
      let currentLines = ((input.current.value).split("\n")).length
      if (currentLines < 3) {
        input.current.style.height = `${18 * currentLines}px`
      }
    })
  }, [])

  useEffect(() => {
    if (selectedReply) {
      input.current.focus()
    }
  }, [selectedReply])

  useEffect(() => {
    if (readyToSendImage) {
      input.current.focus()
    }
  }, [readyToSendImage])

  const handleKeyPress = (e) => {
    if (imageConfirm) {
      setImageCaption(input.current.value)
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (input.current.value !== "" || readyToSendImage) {
        let message = {
          senderName: currentUser.senderName,
          senderId: currentUser.senderId,
          message: encryptMessage(input.current.value, secretKey),
          type: "textMessage",
          timeStamp: new Date(),
          image: readyToSendImage,
          reply: selectedReply
        }
        // console.log(message)
        sendTextMessage(message)
        input.current.value = ""
        input.current.style.height = `${18}px`
        handleCloseReplyDialog()
        setReadyToSendImage(null)
      }
    }
  }

  const handleSendMessage = () => {
    if (input.current.value !== "" || readyToSendImage) {
      let message = {
        senderName: currentUser.senderName,
        senderId: currentUser.senderId,
        message: encryptMessage(input.current.value, secretKey),
        type: "textMessage",
        timeStamp: new Date(),
        image: readyToSendImage,
        reply: selectedReply
      }
      // setRoomMessages((roomMessages) => [...roomMessages,message])
      sendTextMessage(message)
      input.current.value = ""
      input.current.style.height = `${18}px`
      handleCloseReplyDialog()
      setReadyToSendImage(null)
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

  const getPlaceHolder = () => {
    if (imageConfirm) {
      return `Give your image a caption! Say "Look at this 👆"`
    } else {
      return `Message @${currentUser ? currentUser.roomName : "myRoom"} here. Say Howdy! 🤠`
    }
  }

  const imageInputRef = useRef();

  const handleImageUpload = () => {
    imageInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files.length > 1) {
      // Only one file can be uploaded at a time
      alert("Please only select one file at a time.");
      imageInputRef.current.value = "";
      return;
    }

    if (files[0].size > MAX_FILE_SIZE) {
      // The file size is too large
      arkeToasteer({
        type: "warning",
        message: "The file size cannot be greater than 1MB."
      })
      imageInputRef.current.value = "";
      return;
    }

    // Validate the selected files
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        // This is not an image file
        alert("Please only select image files.");
        imageInputRef.current.value = "";
        return;
      }
    }

    const reader = new FileReader();
    reader.onload = () => {
      setReadyToSendImage({
        image: files[0],
        imageURL: reader.result
      })
    };
    reader.readAsDataURL(files[0]);
    imageInputRef.current.value = "";
  }

  return (
    <>
      <div className={styles.sendAreaMain}>
        <div className={styles.sendTextArea}>
          <div className={selectedReply ? styles.ReplyContainer : styles.ReplyContainerClosed}>
            <div className={styles.chatMessage}>
              <span className={styles.sender}>{selectedReply ? selectedReply.senderName : ""}</span>
              <span className={styles.message}>{selectedReply ? decryptMessage(selectedReply.message, secretKey) : ""}</span>
            </div>
            <div className={styles.closeReply} onClick={handleCloseReplyDialog}>
              <IconX stroke={0.5} size={20} />
            </div>
          </div>
          <textarea
            ref={input}
            style={{ height: 18 }}
            onKeyDown={(e) => { handleKeyPress(e) }}
            resize="none"
            disabled={mainSendArea && readyToSendImage}
            placeholder={getPlaceHolder()} />
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
        {
          imageConfirm ? null :
            <>
              <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                onChange={handleFileChange}
                multiple={false}
              />
              <button className={styles.sendAreaBtn} onClick={handleImageUpload}>
                <IconPhotoUp color={"#C5A3FF"} size={22} />
              </button>
            </>
        }
        <div className={styles.sendAreaBtn} onClick={handleSendMessage}>
          <IconSend size={22} />
        </div>
      </div>
      <div className={`${styles.sendAreaSubMenu} ${emojiPickerVisible ? null : styles.sendAreaSubMenuClosed}`} >
        <EmojiPicker
          theme={Theme.DARK}
          onEmojiClick={onClick}
          lazyLoadEmojis={true}
        />
      </div>
    </>
  )
}

export default SendArea