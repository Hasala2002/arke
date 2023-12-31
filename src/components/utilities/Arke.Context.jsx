import { useContext, useState, createContext, useEffect, useRef } from 'react'

import { useNavigate } from "react-router-dom";


import smsSFX from '../../assets/audio/sms.mp3';
import enterSFX from '../../assets/audio/enter.mp3';

import { v4 as uuidv4 } from 'uuid';
const ArkeContext = createContext()

import { io } from 'socket.io-client'
import { IconBellRinging, IconCircleCheck } from '@tabler/icons';

import { useSettings } from './Settings.Context'

const socket = io.connect("https://arke-backend.fly.dev")
// const socket = io.connect("http://localhost:3000")

export const useArke = () => {
  return useContext(ArkeContext)
}

function pad2(number) {
  return (number < 10 ? '0' : '') + number
}


export const ArkeProvider = ({ children }) => {

  const { soundState } = useSettings()

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

  const MAX_FILE_SIZE = 1000000; // 1MB

  const ArkeToast = () => {
    return (
      <div className="toast" id="toast">
        <IconBellRinging color={"#fff"} />
        <span id="toastMessage"></span>
      </div>
    )
  }

  const arkeToasteer = (options) => {
    const toast = document.getElementById("toast")
    const toastMessage = document.getElementById("toastMessage")
    toastMessage.innerText = options.message
    toast.style.borderLeft = `5px solid #${getToastType(options.type)}`
    toast.classList.add("showToast")
    setTimeout(() => {
      toast.classList.remove("showToast")
    }, options.age || 2000)
  }

  function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
      const matchQueryList = window.matchMedia(query);
      function handleChange(e) {
        setMatches(e.matches);
      }
      matchQueryList.addEventListener("change", handleChange);
      return () => {
        matchQueryList.removeEventListener("change", handleChange);
      };
    }, [query]);
    return matches;
  }

  const navigate = useNavigate();

  const [roomMessages, setRoomMessages] = useState([])

  const [roomImages, setRoomImages] = useState([])

  const [roomCount, setRoomCount] = useState(null)

  const [currentUser, setCurrentUser] = useState({})

  const [selectedReply, setSelectedReply] = useState(null)

  const [selectedImage, setSelectedImage] = useState(null)

  const [readyToSendImage, setReadyToSendImage] = useState(null)

  const [dialogState, setDialogState] = useState(false)

  const [arkeTitle, setArkeTitle] = useState("Arkē")

  const [dialog, setDialog] = useState({
    title: "",
    content: "",
    handleConfirm: null,
    handleCancel: null
  })

  const arkeDialog = (dialogInfo) => {
    setDialog(dialogInfo)
    setDialogState(true)
  }

  let smsSound;
  let enterSound;

  const customSWClass = {
    container: 'arke-dialog-container',
    popup: 'arke-dialog-popup',
    header: 'arke-dialog-header',
    title: 'arke-dialog-title',
    closeButton: 'arke-dialog-closebtn',
    icon: 'arke-dialog-icon',
    image: 'arke-dialog-image',
    htmlContainer: 'arke-dialog-htmlcontainer',
    input: 'arke-dialog-input',
    inputLabel: 'arke-dialog-inputlabel',
    validationMessage: 'arke-dialog-validationmessage',
    actions: 'arke-dialog-actions',
    confirmButton: 'arke-dialog-confirmbtn',
    denyButton: 'arke-dialog-denybtn',
    cancelButton: 'arke-dialog-cancelbtn',
    loader: 'arke-dialog-loader',
    footer: 'arke-dialog-footer',
    timerProgressBar: 'arke-dialog-timerprogress',
  }

  const smsElem = useRef(null)
  const enterElem = useRef()

  const playSMSSound = () => {
    smsElem.current.play()
  }

  const playEnterSound = () => {
    enterElem.current.play()
  }
  // useEffect(()=>{
  //   setSocket(io.connect("http://localhost:3000"))
  // })

  const connectToRoom = async (roomId, currentUserObj) => {
    await socket.emit('join-room', roomId, currentUserObj)
    setRoomCount(pad2(1))
    navigate(`/chat/${roomId}`)
  }

  const connectToExistingRoom = async (roomId, currentUserObj) => {
    await socket.emit('join-room', roomId, currentUserObj)
    navigate(`/chat/${roomId}`)
  }

  const leaveRoom = async (roomId) => {
    await socket.emit('leave-room', roomId)
    navigate(`/createroom`)
    setRoomCount(null)
    setRoomMessages([])
    setCurrentUser({})
    setDialogState({
      title: "",
      content: "",
      handleConfirm: null,
      handleCancel: null
    })
  }

  const checkIfRoomExists = async (roomId) => {
    await socket.emit('check-if-room-exists', roomId)
  }

  const sendTextMessage = async (messageData) => {
    await socket.emit('send-message', messageData)
  }

  useEffect(() => {
    document.title = arkeTitle
  }, [arkeTitle])

  useEffect(() => {
    socket.on('user-connected', () => {
      arkeToasteer({
        type: "success",
        message: "Joined Room"
      })
      playEnterSound()
    })

    socket.on('receive-message', (messageData) => {

      let imageIndex = 0

      const getImageIndex = (index) => {
        imageIndex = index
        return index
      }


      if (messageData.image) {

        setRoomImages((roomImages) => [...roomImages, {
          ...messageData.image,
          caption: messageData.message,
          name: messageData.senderName,
          timeStamp: messageData.timeStamp,
          imageIndex: getImageIndex(roomImages.length)
        }])
        setRoomMessages((roomMessages) => [...roomMessages, {
          ...messageData,
          image: {
            ...messageData.image,
            caption: messageData.message,
            name: messageData.senderName,
            timeStamp: messageData.timeStamp,
            imageIndex: imageIndex
          }
        }])
      } else {
        setRoomMessages((roomMessages) => [...roomMessages, messageData])
      }

      if (messageData.senderId !== currentUser.senderId) {
      }
    })

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on('update-room-count', (count) => {
      setRoomCount(pad2(count))
    })

  }, [])

  const value = {
    arkeTitle,
    setArkeTitle,
    MAX_FILE_SIZE,
    roomMessages,
    setRoomMessages,
    roomImages,
    setRoomImages,
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
    socket,
    playSMSSound,
    leaveRoom,
    useMediaQuery,
    selectedReply,
    setSelectedReply,
    selectedImage,
    setSelectedImage,
    readyToSendImage,
    setReadyToSendImage,
    dialogState,
    setDialogState,
    arkeDialog,
    customSWClass
  }


  return (
    <ArkeContext.Provider value={value}>
      <audio ref={smsElem} src={smsSFX} preload="true" />
      <audio ref={enterElem} src={enterSFX} preload="true" />
      {children}
    </ArkeContext.Provider>
  )
}