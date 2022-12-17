import React from 'react'
import * as styles from "./styles/ChatMessage.module.scss"
import Linkify from "react-linkify";
import dayjs from 'dayjs';
import { IconNewsOff } from '@tabler/icons';

const ChatOut = ({noLabel,noTime,message}) => {

  const hrefDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" className={styles.urlDecor}>
      {text}
    </a>);

    let timeStamp = dayjs(message.timeStamp).format("HH:mm")

  return (
    <div className={styles.ChatOut}>
        {noLabel ? null :<span className={styles.ChatLabel}>You</span>}
        <div className={styles.ChatMessage}>
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