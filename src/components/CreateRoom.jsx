import { IconDoor, IconHomePlus, IconSignature } from '@tabler/icons'
import React, { useState } from 'react'
import * as styles from "./styles/Auth.module.scss"
import { useArke } from './utilities/Arke.Context'
import Divider from './utilities/Divider'
import { v4 as uuidv4 } from 'uuid';

const CreateRoom = () => {

    const [roomName,setRoomName] = useState("")
    const [displayName,setDisplayName] = useState("")

    const {arkeToasteer,setCurrentUser,connectToRoom} = useArke()

    const handleCreateRoom = (e) => {
        e.preventDefault()
        let roomId = uuidv4()
        if(roomName!=="" && displayName!==""){
            console.log(roomName)
            let currentUserObj={
                senderName: displayName,
                senderId: uuidv4(),
                roomName: roomName,
                roomId: roomId,
                newRoom: true
            }
            setCurrentUser({
                ...currentUserObj
            })
            connectToRoom(roomId,currentUserObj)
        }else{
            arkeToasteer({
                type:"error",
                message: "Fields cannot be empty!"
            })
        }
    }

  return (
    <div className={styles.CrtRoom}>
    <div className={styles.Graphics}>
        <img src="/arke-hero.png" alt="Arke" />
    </div>
    <div className={styles.Form}>
        <form action="">
        <div className={styles.Title}>
        <div className={styles.Logo}>
            <IconHomePlus size={22} />
        </div>
        <span>Create Arkē Room</span>
    </div>
        <span className={styles.Label}>Room Name</span>
    <div className={styles.NameInput}>
        <input type="text" required value={roomName} onChange={e => setRoomName(e.target.value)} placeholder={"The Matrix Room"} />
        <div className={styles.icon}>
            <IconDoor stroke={0.5} size={20} />
        </div>
    </div>
        <span className={styles.Label}>Display Name</span>
    <div className={styles.NameInput}>
        <input type="text" required value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder={"John123"} />
        <div className={styles.icon}>
            <IconSignature stroke={0.5} size={20} />
        </div>
    </div>
    <button className={styles.loginButton} onClick={handleCreateRoom}>
                {/* <IconX size={16} stroke={3} /> */}
                <span>Create Room</span>
            </button>
            <Divider text={"remember"} />
            <div className={styles.instructionSection}>
                <div className={styles.instructionPoint}>
                    <div className={styles.bullet}>1</div>
                    <span className={styles.instructionLine}>This is a <b>disposable</b> chatroom. Nothing is saved. It's peer-to-peer.</span>
                </div>
                <div className={styles.instructionPoint}>
                    <div className={styles.bullet}>2</div>
                    <span className={styles.instructionLine}>Invite anyone to this chatroom by sharing the <b>QR Code</b> provided or copying the invite link by clicking on the <b>button</b> next to the link.</span>
                </div>
                <div className={styles.instructionPoint}>
                    <div className={styles.bullet}>3</div>
                    <span className={styles.instructionLine}>Enjoy!</span>
                </div>
                </div>
        </form>
    </div>
</div>
  )
}

export default CreateRoom