import React, { useEffect, useRef, useState } from 'react'
import { useArke } from '../../utilities/Arke.Context'
import * as styles from "./styles/ChatBox.module.scss"
import ChatMessage from './ChatMessage'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useSettings } from '../../utilities/Settings.Context'

const ChatBox = () => {

  const [missedMessages, setMissedMessages] = useState(0);

  // Event listener for visibility change
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      // User is back on the tab, reset badge
      setFaviconBadge(null);
      setMissedMessages(0);
    }
  };

  const { roomMessages, playSMSSound, currentUser, setFaviconBadge } = useArke()

  const { soundState, textSize, TEXTSIZE_CONFIG } = useSettings()

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    // Add event listener for visibility change
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);


  useEffect(() => {
    scrollToBottom()
    if (roomMessages[roomMessages.length - 1]) {
      if (roomMessages[roomMessages.length - 1].senderId !== currentUser.senderId) {
        setMissedMessages((prevCount) => prevCount + 1);
        setFaviconBadge(missedMessages + 1);
        if (soundState) {
          playSMSSound()
        }
      }
    }
  }, [roomMessages]);

  return (
    <div className={styles.ChatBox} style={{ fontSize: `${TEXTSIZE_CONFIG[textSize]}%` }}>
      <TransitionGroup>
        {roomMessages.map((message, index, messages) => {
          // console.log(message.message)
          return (
            <CSSTransition
              key={index}
              timeout={100}
              classNames="message"
            >
              <ChatMessage
                message={message}
                prevMessage={messages[index - 1] ? messages[index - 1] : null}
                nextMessage={messages[index + 1] ? messages[index + 1] : null}
              />
            </CSSTransition>
          )
        })}
      </TransitionGroup>
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatBox

{/* <ChatOut noTime message={"Hello Guys"} />
<ChatOut noLabel noTime message={"What's Happening?"} />
<ChatOut noLabel message={"What's up?"} />
<ChatIn noTime message={"Hello"} />
<ChatIn noLabel noTime message={"Nothing much!"} />
<ChatIn noLabel message={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."} />
<ChatOut noTime message={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."} />
<ChatOutImage noLabel noTime message={"Hello"} />
<ChatOut noLabel noTime message={`Hasala Heiyanthuduwa is inviting you to a scheduled Zoom meeting.

Join Zoom Meeting

https://us04web.zoom.us/j/6905914158?pwd=cmdRUDFaQXBHQdawdahhRC9UbDdCc2V6UT09h

Meeting ID: 620 511 4258
Passcode: 1435
Time:03.00pm-07.00pm

Date - 2021.07.27(Tuesday)`} />
<ChatOut noLabel message={"What's up?"} />
<ChatOut noTime message={"Hello Guys"} />
<ChatOut noLabel noTime message={"What's Happening?"} />
<ChatOut noLabel message={"What's up?"} />
<ChatOut noTime message={"Hello Guys"} />
<ChatOut noLabel noTime message={"What's Happening?"} />
<ChatOut noLabel message={"What's up?"} />
<ChatOut noTime message={"Hello Guys"} />
<ChatOut noLabel noTime message={"What's Happening?"} />
<ChatOut noLabel message={"What's up?"} />
<ChatOut noTime message={"Hello Guys"} />
<ChatOut noLabel noTime message={"What's Happening?"} />
<ChatOut noLabel message={"What's up?"} />
<ChatOut noTime message={"Hello Guys"} />
<ChatOut noLabel noTime message={"What's Happening?"} />
<ChatOut noLabel message={"What's up?"} /> */}