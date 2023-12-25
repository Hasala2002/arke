import React from 'react'
import * as styles from "./styles/ChatMessage.module.scss"
import Linkify from "react-linkify";
import dayjs from 'dayjs';
import { IconArrowBack } from '@tabler/icons';
import { useArke } from '../../utilities/Arke.Context';

const ChatIn = ({ noLabel, noTime, message }) => {

  const hrefDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" className={styles.urlDecor}>
      {text}
    </a>);

  const { setSelectedReply, setSelectedImage } = useArke()

  const handleSelectReply = () => {
    setSelectedReply({
      senderName: message.senderName,
      message: message.message
    })
  }

  let timeStamp = dayjs(message.timeStamp).format("HH:mm")

  return (
    <div className={styles.ChatIn}>
      {noLabel ? null : <span className={styles.ChatLabel}>{message.senderName}</span>}
      <div className={styles.ChatMessage}>
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
      {noTime ? null : <span className={styles.ChatTimeStamp}>{timeStamp}</span>}
    </div>
  )
}

export default ChatIn