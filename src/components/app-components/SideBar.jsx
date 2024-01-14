import { IconAlignRight, IconArrowLeft, IconCheck, IconClipboardCopy, IconCopy, IconX } from '@tabler/icons'
import React, { useState } from 'react'
// import useClipboard from 'react-hook-clipboard'
import { useArke } from '../utilities/Arke.Context'
import QRCode from "react-qr-code";
import Swal from 'sweetalert2'
import * as styles from "./styles/SideBar.module.scss"
import EditableInput from '../utilities/EditableInput';
import { openDialog } from '../utilities/DialogTrigger';
import { useDialog } from '../utilities/Dialog.context';

const SideBar = ({ setToggleSideBar }) => {

    const { currentUser, arkeToasteer, customSWClass, leaveRoom, setCurrentUser, secretKey } = useArke()

    const { dialogOptions, arkeFire } = useDialog()

    async function copyToClipboard() {

        let joinUrl = new URL(`${window.location.origin}/join`);
        joinUrl.searchParams.set('rid', currentUser.roomId);
        joinUrl.searchParams.set('sky', secretKey);
        // let joinUrl = `${window.location.origin}/join/${currentUser.roomId}&${secretKey}`
        // let url = `${window.location.origin}/join/${token}`

        let url = joinUrl.toString();

        try {
            await navigator.clipboard.writeText(url);
            //   console.log('Token copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy token:', error);
            // Consider providing alternative feedback to the user
        }
    }


    const [userEditMode, setUserEditMode] = useState(false);


    const handleLeaveRoom = () => {
        // Swal.fire({
        //     title: 'Are you sure?',
        //     text: "This is a disposable chatroom! All current chat history will be deleted.",
        //     showCancelButton: true,
        //     confirmButtonText: 'Yes I am sure',
        //     customClass: customSWClass,
        //     showClass: {
        //         backdrop: 'swal2-noanimation',
        //         popup: '',
        //         icon: ''
        //     },
        //     hideClass: {
        //         popup: '',
        //     },
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         leaveRoom(currentUser.roomId)
        //     }
        // })

        arkeFire({
            open: true,
            title: 'Are you sure?',
            text: "This is a disposable chatroom! All current chat history will be deleted.",
            showCancelButton: true,
            confirmButtonText: 'Yes I am sure',
            onConfirm: () => leaveRoom(currentUser.roomId),
        });
    }

    return (
        <>
            <div className={styles.Title}>
                <div className={styles.Logo}>
                    <img src="/arke.svg" alt="Logo" />
                </div>
                <span>Welcome to Arkē</span>
                <button className={styles.OptionsBtn} onClick={() => { setToggleSideBar(false) }}>
                    <IconArrowLeft stroke={0.5} size={20} />
                </button>
            </div>
            <span className={styles.Label}>Display Name</span>
            <div className={styles.NameInput}>
                {/* <input readOnly={userNameEditable} type="text" value={currentUser ? currentUser.senderName : ""} placeholder={"John123"} disabled={true} /> */}
                {/* <span>{currentUser ? currentUser.senderName : ""}</span> */}
                <EditableInput
                    initialValue={currentUser ? currentUser.senderName : ""}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    editMode={userEditMode}
                    setEditMode={setUserEditMode}
                />
                <div className={styles.icon}
                    style={{
                        cursor: userEditMode ? "pointer" : "unset"
                    }}
                >
                    <IconCheck
                        color={userEditMode ? "green" : "white"}
                        stroke={userEditMode ? 3 : 0.5}
                        size={20}
                    />
                </div>
            </div>
            <div className={styles.RoomTitle}>
                Current Room: <span>{currentUser ? currentUser.roomName : ""}</span>
            </div>
            <div className={styles.RoomInfo}>
                <div className={styles.disclaimer}>
                    Invite people to join <span>{currentUser ? currentUser.roomName : ""}</span>
                </div>
                {/* <img src="https://i.ibb.co/jDnMLvK/qrcode.png" alt="QR Code" /> */}
                <QRCode
                    size={175}
                    style={{ margin: "10px 0 20px 0", minHeight: 100 }}
                    value={`${window.location.origin}/join/${currentUser.roomId}`}
                />
                <div className={styles.LinkCopy}>
                    <span>{(`${window.location.origin}/join/${currentUser.roomId}&${secretKey}`).substring(0, 20) + "..."}</span>
                    <div className={styles.icon} onClick={() => {
                        copyToClipboard()
                        arkeToasteer({
                            type: "success",
                            message: "Copied Link to Room"
                        })
                    }}>
                        <IconClipboardCopy stroke={1} size={20} />
                    </div>
                </div>
                <div className={styles.instructionSection}>
                    <div className={styles.instructionPoint}>
                        <div className={styles.bullet}>1</div>
                        <span className={styles.instructionLine}>You are inside a <b>disposable</b> chatroom. Nothing is saved and its encrypted too.</span>
                    </div>
                    <div className={styles.instructionPoint}>
                        <div className={styles.bullet}>2</div>
                        <span className={styles.instructionLine}>Invite anyone to this chatroom by sharing the <b>QR Code</b> above or copying the invite link by clicking on the <b>button</b> next to the link.</span>
                    </div>
                    <div className={styles.instructionPoint}>
                        <div className={styles.bullet}>3</div>
                        <span className={styles.instructionLine}>Enjoy!</span>
                    </div>
                </div>
                <button className={styles.closeButton} onClick={handleLeaveRoom}>
                    <IconX size={16} stroke={3} />
                    <span>Leave Room</span>
                </button>
            </div>
        </>
    )
}

export default SideBar