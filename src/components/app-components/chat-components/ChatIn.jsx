import React from 'react'
import * as styles from "./styles/ChatMessage.module.scss"
import Linkify from "react-linkify";
import dayjs from 'dayjs';
import { IconArrowBack } from '@tabler/icons-react';
import { useArke } from '../../utilities/Arke.Context';
import { useSettings } from '../../utilities/Settings.Context';
import { decryptMessage } from '../../utilities/Encryption';
import MarkdownWrapper from './MardownWrapper'

const ChatIn = ({ noLabel, noTime, message }) => {

  const hrefDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" className={styles.urlDecor}>
      {text}
    </a>);

  const isSingleEmoji = str =>
    /^\p{Emoji}\uFE0F?$/u.test(str) && str.length === 2;

  const isHeartEmoji = str =>
    str === "❤️";

  const { textSize, twelveHrClock, TEXTSIZE_CONFIG } = useSettings()

  const { setSelectedReply, setSelectedImage, secretKey } = useArke()

  let decryptedMessage = decryptMessage(message.message, secretKey)

  const handleSelectReply = () => {
    setSelectedReply({
      senderName: message.senderName,
      message: message.message
    })
  }

  // let timeStamp = dayjs(message.timeStamp).format(twelveHrClock ? "hh:mm a" : "HH:mm")
  let timeStamp = dayjs(new Date()).format(twelveHrClock ? "hh:mm a" : "HH:mm")

  return (
    <div className={styles.ChatIn} style={{ fontSize: `${TEXTSIZE_CONFIG[textSize]}%` }}>
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
            <div className={styles.message}><MarkdownWrapper>{decryptMessage(message.reply.message, secretKey)}</MarkdownWrapper></div>
          </div>
          :
          null
        }
        <div className={styles.ReplyContainer} onClick={handleSelectReply}>
          <IconArrowBack size={15} />
        </div>
        <span className={isSingleEmoji(decryptedMessage) ? isHeartEmoji(decryptedMessage) ? styles.ChatEmojiHeart : styles.ChatOneEmoji : ""}>
          <MarkdownWrapper>{decryptedMessage}</MarkdownWrapper>
        </span>
      </div>
      {noTime ? null : <span className={styles.ChatTimeStamp}>{timeStamp}</span>}
    </div>
  )
}

export default ChatIn