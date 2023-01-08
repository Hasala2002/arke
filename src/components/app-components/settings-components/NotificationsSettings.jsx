import React from 'react'
import { useSettings } from '../../utilities/Settings.Context'
import * as styles from "./styles/SettingsComponent.module.scss"

const NotificationsSettings = () => {

  const {toastState,setToastState,soundState,setSoundState} = useSettings()

  return (
    <div className={styles.SettingsContainer}>
        <h2>Notifications</h2>

        <h3>Toasts</h3>
        <span>{"You can switch of pop up toast notifications here. (Not Recommended)"}</span>
        <input type="checkbox" checked={toastState} onClick={()=>{setToastState(!toastState)}} id="toastSet" /><label htmlFor="toastSet">Toggle</label>

        <h3>Sounds</h3>
        <span>You can switch of sound notifications here.</span>
        <input type="checkbox" checked={soundState} onClick={()=>{setSoundState(!soundState)}} id="sounds" /><label htmlFor="sounds">Toggle</label>
    </div>
  )
}

export default NotificationsSettings