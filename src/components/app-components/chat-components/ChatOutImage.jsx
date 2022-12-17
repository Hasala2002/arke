import React from 'react'
import * as styles from "./styles/ChatMessage.module.scss"

const ChatOutImage = ({noLabel,noTime,message}) => {
  return (
    <div className={styles.ChatOut}>
    {noLabel ? null :<span className={styles.ChatLabel}>You</span>}
    <div className={styles.ChatMessage}>
        <div className={styles.ChatImage}>
            <img src="http://placeimg.com/1200/800/nature" alt="temp" />
        </div>
        {message}
    </div>
        {noTime ? null: <span className={styles.ChatTimeStamp}>11:44</span>}
    </div>
  )
}

export default ChatOutImage