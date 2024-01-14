import React from 'react'
import { useSettings } from '../../utilities/Settings.Context'
import * as styles from "./styles/SettingsComponent.module.scss"
import ChatMessage from '../chat-components/ChatMessage'
import ChatOut from '../chat-components/ChatOut'
import Divider from "../../utilities/Divider"
import { encryptMessage } from '../../utilities/Encryption'

const GeneralSettings = () => {

  const { toastState, setToastState, soundState, setSoundState, textSize, setTextSize, setTwelveHrClock, twelveHrClock } = useSettings()

  return (
    <div className={styles.SettingsContainer}>
      <h2>General</h2>

      <h3>Toasts</h3>
      <span>You can switch off pop up toast notifications here. <b>{"("}Not Recommended{")"}</b></span>
      <input type="checkbox" checked={toastState} onChange={() => {
        localStorage.setItem("toasts", toastState ? "off" : "on")
        setToastState(!toastState)
      }} id="toastSet" /><label htmlFor="toastSet">Toggle</label>

      <Divider />

      <h3>Sounds</h3>
      <span>You can switch off sound notifications here.</span>
      <input type="checkbox" checked={soundState} onChange={() => {
        localStorage.setItem("sounds", soundState ? "off" : "on")
        setSoundState(!soundState)
      }} id="sounds" /><label htmlFor="sounds">Toggle</label>

      <Divider />

      <h3>Message Text Size</h3>
      <span>Adjust font sizing to your preference here. <b>{"("}Default set at 100%{")"}</b></span>
      <div className={styles.fontSizeSliderContainer} >
        <div className={styles.fontBlocks}>
          {
            ["85%", "92.5%", "100%", "107.5%", "115%"].map((number) => {
              return (<div className={styles.fontBlock} key={number}><span>{number}</span></div>)
            })
          }
        </div>
        <input className={styles.fontSizeSlider} type="range" min="1" max="5" value={textSize} onChange={(e) => {
          setTextSize(parseInt(e.target.value))
          localStorage.setItem("text_size", parseInt(e.target.value))
        }} />
      </div>

      <Divider />

      <h3>Time Format</h3>
      <span>You can enable 12-hour format timestamps here.</span>
      <input type="checkbox" checked={twelveHrClock} onChange={() => {
        localStorage.setItem("twelve_hour", twelveHrClock ? "off" : "on")
        setTwelveHrClock(!twelveHrClock)
      }} id="twelvehour" /><label htmlFor="twelvehour">Toggle</label>

      {/* <Divider /> */}

      <div className={styles.fontPreview}>
        <span className={styles.fontPreviewTitle}>chat bubble preview</span>
        <div>
          <ChatOut noLabel={false} noTime={false} sample message={{ message: "You Shall Not Pass! 🧙🏼‍♂️", timeStamp: Date.now() }} />
        </div>
      </div>

    </div>
  )
}

export default GeneralSettings