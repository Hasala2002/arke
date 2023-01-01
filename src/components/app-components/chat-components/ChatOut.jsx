import React from 'react'
import * as styles from "./styles/ChatMessage.module.scss"
import Linkify from "react-linkify";
import dayjs from 'dayjs';
import { IconArrowBack } from '@tabler/icons';
import { useArke } from '../../utilities/Arke.Context';

const ChatOut = ({noLabel,noTime,message}) => {

  const hrefDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" className={styles.urlDecor}>
      {text}
    </a>);

    let timeStamp = dayjs(message.timeStamp).format("HH:mm")

    const { setSelectedReply } = useArke()

    const handleSelectReply = () => {
      setSelectedReply({
        senderName: message.senderName,
        message: message.message
      })
    }

  return (
    <div className={styles.ChatOut}>
        {noLabel ? null :<span className={styles.ChatLabel}>You</span>}
        <div className={styles.ChatMessage}>
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
       {noTime ? null: 
        <span className={styles.ChatTimeStamp}>
          {timeStamp}
        </span>}
    </div>
  )
}

export default ChatOut