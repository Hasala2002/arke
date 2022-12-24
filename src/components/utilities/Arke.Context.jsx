import { useContext, useState ,createContext ,useEffect} from 'react'

import { useNavigate } from "react-router-dom";


import { v4 as uuidv4 } from 'uuid';
const ArkeContext = createContext()

import { io } from 'socket.io-client'
import { IconBellRinging, IconCircleCheck } from '@tabler/icons';

const socket = io.connect("https://arkeapi.tech:3000/")

export const useArke = () => {
    return useContext(ArkeContext)
}

function pad2(number) {
  return (number < 10 ? '0' : '') + number
}

const messages = [
    {
        senderName: "Hasala",
        senderId: "12324434",
        type: "textMessage",
        timeStamp: new Date(
          "Sun Jul 17 2021 18:19:36 GMT+0530 (India Standard Time)"
        ),
        message: "minim veniam, quis nostrud exercitation",
      },
      {
        senderName: "Chamindu",
        senderId: "22342343",
        type: "textMessage",
        timeStamp: new Date(
          "Sun Jul 17 2021 18:22:36 GMT+0530 (India Standard Time)"
        ),
        message: "in voluptate velit esse cillum dolore",
      },
      {
        senderName: "Chamindu",
        senderId: "22342343",
        type: "textMessage",
        timeStamp: new Date(
          "Sun Jul 17 2021 18:22:36 GMT+0530 (India Standard Time)"
        ),
        message: "in voluptate velit esse cillum testing msg testing",
      },
      {
        senderName: "Supun",
        senderId: "22375343",
        type: "textMessage",
        timeStamp: new Date(
          "Sun Jul 17 2021 18:22:36 GMT+0530 (India Standard Time)"
        ),
        message: "in voluptate velit esse cillum testing msg testing 1233423",
      },
      {
        senderName: "Hasala",
        senderId: "12324434",
        type: "textMessage",
        timeStamp: new Date(
          "Sun Jul 17 2021 18:24:36 GMT+0530 (India Standard Time)"
        ),
        message: "Sed ut perspiciatis unde omnis iste",
      }
    ]

export const ArkeProvider = ({children}) => {

  const getToastType = (type) => {
    switch (type) {
        case "success":
            return "198754"
        case "danger":
            return "d21f3c"
        case "warning":
            return "ffbf00"
        default:
            return "eb683f"
    }
  }

  const ArkeToast = () =>{
      return(
         <div className="toast" id="toast">
            <IconBellRinging color={"#fff"} />
            <span id="toastMessage"></span>
          </div>
      )
  }

  const arkeToasteer = (options) => {
      const toast =  document.getElementById("toast")
      const toastMessage =  document.getElementById("toastMessage")
      toastMessage.innerText = options.message
      toast.style.borderLeft = `5px solid #${getToastType(options.type)}`
      toast.classList.add("showToast")
      setTimeout(() => {
          toast.classList.remove("showToast")
      },options.age||2000)
  }
  
    

    const navigate = useNavigate();

    const [roomMessages,setRoomMessages] = useState([])

    const [roomCount,setRoomCount] = useState(null)

    const [currentUser,setCurrentUser] = useState({})

    // const [socket,setSocket] = useState()

    // useEffect(()=>{
    //   setSocket(io.connect("http://localhost:3000"))
    // })

    const connectToRoom = async (roomId,currentUserObj) =>{
      await socket.emit('join-room',roomId,currentUserObj) 
      setRoomCount(pad2(1))
      navigate(`/chat/${roomId}`)
    }

    const connectToExistingRoom = async(roomId,currentUserObj)=>{
      await socket.emit('join-room',roomId,currentUserObj) 
      navigate(`/chat/${roomId}`)
    }

    const checkIfRoomExists = async (roomId) => {
      await socket.emit('check-if-room-exists',roomId)
    }

    const sendTextMessage = async (messageData)=>{
      await socket.emit('send-message',messageData)
    }

    useEffect(()=>{
      socket.on('user-connected',()=>{
        console.log("connected")
        arkeToasteer({
          type: "success",
          message: "Joined Room"
        })
      })

      socket.on('receive-message',(messageData)=>{
        setRoomMessages((roomMessages) => [...roomMessages,messageData])
      })

      socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });

      socket.on('update-room-count',(count)=>{
        setRoomCount(pad2(count))
      })

    },[])

    const value = {
      roomMessages,
      setRoomMessages,
      currentUser,
      setCurrentUser,
      connectToRoom,
      ArkeToast,
      arkeToasteer,
      sendTextMessage,
      checkIfRoomExists,
      connectToExistingRoom,
      roomCount,
      setRoomCount,
      socket
    }


    return(
        <ArkeContext.Provider value={value}>
            {children}
        </ArkeContext.Provider>
    )
}