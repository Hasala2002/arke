import { IconDoor, IconHomePlus, IconSignature } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import * as styles from "./styles/Auth.module.scss"
import { useArke } from './utilities/Arke.Context'
import Divider from './utilities/Divider'
import { v4 as uuidv4 } from 'uuid';
import AnimatedBackground from './utilities/AnimatedBackground'

import { motion } from "framer-motion"

const CreateRoom = () => {

    const [roomName, setRoomName] = useState("")
    const [roomNameFocus, setRoomNameFocus] = useState(false)
    const [displayName, setDisplayName] = useState("")
    const [displayNameFocus, setDisplayNameFocus] = useState(false)

    const { arkeToasteer, currentUser, setCurrentUser, connectToRoom, setArkeTitle } = useArke()

    useEffect(() => {
        if (!currentUser.roomName) {
            setArkeTitle("Arkē")
        }
    }, [currentUser])

    const handleCreateRoom = (e) => {
        e.preventDefault()
        let roomId = uuidv4()
        if (roomName !== "" && displayName !== "") {
            let currentUserObj = {
                senderName: displayName,
                senderId: uuidv4(),
                roomName: roomName,
                roomId: roomId,
                newRoom: true
            }
            setCurrentUser({
                ...currentUserObj
            })
            connectToRoom(roomId, currentUserObj)
        } else {
            arkeToasteer({
                type: "error",
                message: "Fields cannot be empty!"
            })
        }
    }

    const handleRoomNameFocus = () => {
        setRoomNameFocus(true);
    };

    const handleRoomNameBlur = () => {
        setRoomNameFocus(false);
    };

    const handleDisplayNameFocus = () => {
        setDisplayNameFocus(true);
    };

    const handleDisplayNameBlur = () => {
        setDisplayNameFocus(false);
    };

    return (
        <div className={styles.CrtRoom}>
            {/* <div className={styles.Graphics}>
        <img src="/arke-hero.png" alt="Arke" />
    </div> */}
            <motion.div initial={{ y: 0, scale: 0.99, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 0, scale: 0.99, opacity: 0 }}
                transition={{ type: "tween", duration: 0.25 }} className={styles.Text}>
                <h1>Arkē <span>Chat</span></h1>
                <h2>Chat private. Chat free.</h2>
                <p>Create your own disposable chatroom, invite other people to chat with you and not worry about anyone else snooping into your conversation. Nothing is saved.</p>
                <div className={styles.BtnGroup}>
                    <a href="https://arkechat.live" className={styles.SubBtn}> <button>Learn more</button></a>

                </div>
                <div className={styles.TextBG}>
                    <AnimatedBackground />
                </div>
            </motion.div>
            <div className={styles.Form}>
                <form action="">
                    <div className={styles.Title}>
                        <div className={styles.Logo}>
                            <IconHomePlus size={22} />
                        </div>
                        <span>Create Arkē Room</span>
                    </div>
                    <span className={styles.Label}>Room Name</span>
                    <div className={styles.NameInput}
                        style={{ borderColor: roomNameFocus ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.1)" }}
                    >
                        <div className={`${styles.Shade} ${roomNameFocus ? styles.ShadeAnimationClass : ""}`}></div>
                        <input type="text"
                            onFocus={handleRoomNameFocus}
                            onBlur={handleRoomNameBlur}
                            required value={roomName} onChange={e => setRoomName(e.target.value)} placeholder={"The Lepidopterarium"} />
                        <div className={styles.icon}>
                            <IconDoor stroke={roomNameFocus ? 2 : 0.5} size={20} />
                        </div>
                    </div>
                    <span className={styles.Label}>Display Name</span>
                    <div className={styles.NameInput}
                        style={{ borderColor: displayNameFocus ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.1)" }}>
                        <div className={`${styles.Shade} ${displayNameFocus ? styles.ShadeAnimationClass : ""}`}></div>
                        <input type="text"
                            onFocus={handleDisplayNameFocus}
                            onBlur={handleDisplayNameBlur}
                            required value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder={"ex: Vanessa22"} />
                        <div className={styles.icon}>
                            <IconSignature stroke={displayNameFocus ? 2 : 0.5} size={20} />
                        </div>
                    </div>
                    <button className={styles.loginButton} onClick={handleCreateRoom}>
                        <div className={styles.Shade}></div>
                        <span>Create Room</span>
                    </button>
                    <Divider text={"remember"} />
                    <div className={styles.instructionSection}>
                        <div className={styles.instructionPoint}>
                            <div className={styles.bullet}>1</div>
                            <span className={styles.instructionLine}>This is a <b>disposable</b> chatroom. Nothing is saved and its encrypted too.</span>
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