import React from 'react'
import Linkify from "react-linkify";
import * as styles from "./styles/SettingsComponent.module.scss"
import ChatOut from '../chat-components/ChatOut';

const Encryption = () => {

    const hrefDecorator = (href, text, key) => (
        <a href={href} key={key} target="_blank" className={styles.urlDecor}>
            {text}
        </a>);

    return (
        <div className={styles.SettingsContainer}>
            <h2>Encryption</h2>
            <div className={styles.SettingsDiagContainer}>
                <div className={styles.messageBox}>
                    <ChatOut noLabel noTime sample message={{ message: "You Shall Not Pass! 🧙🏼‍♂️", timeStamp: Date.now() }} />
                </div>
                <div className={styles.line}>
                    <div className={styles.arrow}></div>
                </div>
                <div className={styles.intermediateBox}>
                    U2FsdGvQsweA=
                    {/* <div className={styles.disclaimer}>Unreadable encrypted message</div> */}
                </div>
                <div className={styles.line}>
                    <div className={styles.arrow}></div>
                </div>
                <div className={styles.messageBox}>
                    <ChatOut noLabel noTime sample message={{ message: "You Shall Not Pass! 🧙🏼‍♂️", timeStamp: Date.now() }} />
                </div>
            </div>


            <div className={styles.SettingsExpContainer}>
                <span className={styles.SettingsExplaination}>
                    <b>End-to-end encryption</b> ensures the confidentiality of your personal messages, restricting access to only you and your intended recipients, with Arke Chat having no capability to decipher them. For added security, exercise caution when sharing the invite link to maintain the integrity of your communication.
                </span>
            </div>

            <span><Linkify componentDecorator={hrefDecorator}>Visit https://arkechat.live to learn more about Arke Chat Encryption</Linkify></span>
        </div>
    )
}

export default Encryption