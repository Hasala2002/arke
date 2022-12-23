import { IconDoor, IconSignature } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import * as styles from "./styles/Auth.module.scss"
import { Navigate, useParams } from 'react-router-dom'
import { useArke } from './utilities/Arke.Context'
import { v4 as uuidv4 } from 'uuid';
const JoinRoom = () => {

    const { id } = useParams()

    const { connectToExistingRoom, setCurrentUser, checkIfRoomExists, socket } = useArke()

    const [displayName, setDisplayName] = useState("")

    const [roomStatus,setRoomStatus] = useState(null)
    const [roomInfo, setRoomInfo] = useState(null)

    const handleJoinRoom = (e) => {
        e.preventDefault()
        if(displayName!==""){
            let currentUserObj={
                senderName: displayName,
                senderId: uuidv4(),
                roomName: roomInfo.roomName,
                roomId: id,
                newRoom: false
            }
            setCurrentUser({
                ...currentUserObj
            })
            connectToExistingRoom(id,currentUserObj)
        }else{
            arkeToasteer({
                type:"error",
                message: "Fields cannot be empty!"
            })
        }
    }

    useEffect(() => {
        const getRoomData = async () => {
            await checkIfRoomExists(id)
        }

        socket.on('room-data', (roomData)=>{
            setRoomInfo(roomData)
        })

        socket.on('room-404', (error)=>{
            if(error.code===404){
                console.log(error)
                setRoomStatus("Oops! Room doesnt exist.")
            }
        })

        getRoomData()
    }, [id])


    return (
        <>
            <div className={styles.Auth}>
                <div className={styles.Graphics}>
                    <img src="/arke-hero.png" alt="Arke" />
                </div>
                <div className={styles.Form}>
                    <form action="">
                        <div className={styles.Title}>
                            <div className={styles.Logo}>
                                <IconDoor size={22} />
                            </div>
                            <span>Join Room</span>
                        </div>
                        <div className={styles.loader} style={{ display: roomInfo || roomStatus ? 'none' : 'flex' }}>
                            <div>
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                    width="24px" height="30px" viewBox="0 0 24 30">
                                    <rect x="0" y="0" width="4" height="20" fill="#333">
                                        <animate attributeName="opacity" attributeType="XML"
                                            values="1; .2; 1"
                                            begin="0s" dur="0.6s" repeatCount="indefinite" />
                                    </rect>
                                    <rect x="7" y="0" width="4" height="20" fill="#333">
                                        <animate attributeName="opacity" attributeType="XML"
                                            values="1; .2; 1"
                                            begin="0.2s" dur="0.6s" repeatCount="indefinite" />
                                    </rect>
                                    <rect x="14" y="0" width="4" height="20" fill="#333">
                                        <animate attributeName="opacity" attributeType="XML"
                                            values="1; .2; 1"
                                            begin="0.4s" dur="0.6s" repeatCount="indefinite" />
                                    </rect>
                                </svg>
                            </div>
                        </div>
                        <div className={styles.RoomInfo} style={{ display: roomInfo && !roomStatus ? 'flex' : 'none' }}>
                            <span className={styles.RoomLabel}>Room Name</span>
                            <span className={styles.RoomName}>{roomInfo && roomInfo.roomName}</span>
                            <div className={styles.RoomStatus}><div className={styles.RoomOnline}></div><span>{roomInfo && roomInfo.participants} Online</span></div>
                        </div>
                        <div className={styles.RoomInfo} style={{ display: roomStatus ? 'flex' : 'none' }}>
                            <span className={styles.RoomName}>{roomStatus && roomStatus}</span>
                        </div>
                        <span className={styles.Label}>Display Name</span>
                        <div className={styles.NameInput}>
                            <input type="text" placeholder={"John123"} disabled={roomStatus ? true : false} onChange={e => setDisplayName(e.target.value)} />
                            <div className={styles.icon}>
                                <IconSignature stroke={0.5} size={20} />
                            </div>
                        </div>
                        <button className={styles.loginButton} onClick={handleJoinRoom}>
                            {/* <IconX size={16} stroke={3} /> */}
                            <span>Join Room</span>
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default JoinRoom