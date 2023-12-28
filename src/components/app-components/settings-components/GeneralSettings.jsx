import React from 'react'
import { useSettings } from '../../utilities/Settings.Context'
import * as styles from "./styles/SettingsComponent.module.scss"

const GeneralSettings = () => {

  const { toastState, setToastState, soundState, setSoundState } = useSettings()

  return (
    <div className={styles.SettingsContainer}>
      <h2>General</h2>

      <h3>Toasts</h3>
      <span>You can switch of pop up toast notifications here. <b>{"("}Not Recommended{")"}</b></span>
      <input type="checkbox" checked={toastState} onChange={() => {
        localStorage.setItem("toasts", toastState ? "off" : "on")
        setToastState(!toastState)
      }} id="toastSet" /><label htmlFor="toastSet">Toggle</label>

      <h3>Sounds</h3>
      <span>You can switch of sound notifications here.</span>
      <input type="checkbox" checked={soundState} onChange={() => {
        localStorage.setItem("sounds", soundState ? "off" : "on")
        setSoundState(!soundState)
      }} id="sounds" /><label htmlFor="sounds">Toggle</label>

      {/* <h3>Text Size</h3> */}

    </div>
  )
}

export default GeneralSettings