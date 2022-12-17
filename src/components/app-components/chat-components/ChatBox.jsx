import React, { useEffect, useRef } from 'react'
import { useArke } from '../../utilities/Arke.Context'
import ChatIn from './ChatIn'
import ChatOut from './ChatOut'
import ChatOutImage from './ChatOutImage'
import * as styles from "./styles/ChatBox.module.scss"
import { CSSTransitionGroup } from 'react-transition-group'
import { useSpring, animated } from 'react-spring';
import ChatMessage from './ChatMessage'

const ChatBox = () => {

  const {roomMessages} = useArke()

  return (
    <div className={styles.ChatBox}>
      <CSSTransitionGroup
                transitionName="message"
                transitionEnterTimeout={100}
                transitionLeaveTimeout={100}
      >
      {roomMessages.map((message,index,messages)=>{
        // console.log(message.message)
        return(
          <ChatMessage 
            key={index} 
            message={message} 
            prevMessage={messages[index-1] ? messages[index-1] : null}
            nextMessage={messages[index+1] ? messages[index+1] : null}
          />
        )
      })}
      </CSSTransitionGroup>
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