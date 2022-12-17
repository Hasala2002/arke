import React from 'react'
import ChatOut from './ChatOut'
import ChatIn from './ChatIn'
import { useArke } from '../../utilities/Arke.Context'

const ChatMessage = ({message,prevMessage,nextMessage}) => {

  const {currentUser} = useArke()
  
  let isPrevMessageFromMe=false
  let isNextMessageFromMe=false

  if(prevMessage){
    isPrevMessageFromMe = message.senderId===prevMessage.senderId
  }

  if(nextMessage){
    isNextMessageFromMe = message.senderId===nextMessage.senderId
  }

  return (
    <>
        {
          message.senderId === currentUser.senderId ?
          <ChatOut noLabel={isPrevMessageFromMe} noTime={isNextMessageFromMe} message={message} />
          :
          <ChatIn noLabel={isPrevMessageFromMe} noTime={isNextMessageFromMe} message={message} />
        }
        
    </>
  )
}

export default ChatMessage