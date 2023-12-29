import React from 'react'
import * as styles from "./styles/ChatMessage.module.scss"
import Linkify from "react-linkify";
import dayjs from 'dayjs';
import { IconArrowBack } from '@tabler/icons';
import { useArke } from '../../utilities/Arke.Context';
import { useSettings } from '../../utilities/Settings.Context';

const ChatOut = ({ noLabel, noTime, message }) => {

  const { textSize, twelveHrClock, TEXTSIZE_CONFIG } = useSettings()

  const hrefDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" className={styles.urlDecor}>
      {text}
    </a>);

  let timeStamp = dayjs(message.timeStamp).format(twelveHrClock ? "hh:mm a" : "HH:mm")

  const { setSelectedReply, setSelectedImage } = useArke()

  const handleSelectReply = () => {
    setSelectedReply({
      senderName: message.senderName,
      message: message.message
    })
  }

  return (
    <div className={styles.ChatOut} style={{ fontSize: `${TEXTSIZE_CONFIG[textSize]}%` }}>
      {noLabel ? null : <span className={styles.ChatLabel}>You</span>}

      {/* {image ? <img src={"https://raw.githubusercontent.com/Hasala2002/arke/main/public/screenshots/architecture.png"} alt="message-image" ></img> : null} */}
      <div className={styles.ChatMessage}>
        {/* <img src={"https://raw.githubusercontent.com/Hasala2002/arke/main/public/screenshots/architecture.png"} alt="message-image" ></img> */}
        {/* <img onClick={() => {
          setSelectedImage("https://picsum.photos/1080/720")
        }} src={"https://picsum.photos/1080/720"} alt="message-image" ></img> */}
        {
          message.image ?
            <img onClick={() => {
              setSelectedImage(message.image)
            }} src={message.image.imageURL} alt={`message-image-${(message.message).trim()}`} ></img>
            :
            null
        }
        {message.reply
          ?
          <div className={styles.ReplyMessage}>
            <span className={styles.sender}>{message.reply.senderName}</span>
            <div className={styles.message}>{message.reply.message}</div>
          </div>
          :
          null
        }
        <div className={styles.ReplyContainer} onClick={handleSelectReply}>
          <IconArrowBack size={15} />
        </div>
        <Linkify componentDecorator={hrefDecorator}>{message.message}</Linkify>
      </div>
      {noTime ? null :
        <span className={styles.ChatTimeStamp}>
          {timeStamp}
        </span>}
    </div>
  )
}

export default ChatOut