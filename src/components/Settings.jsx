import { IconAccessible, IconColorSwatch, IconHelp, IconNotification, IconSettings, IconX } from '@tabler/icons'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import * as styles from "./styles/Settings.module.scss"

const Settings = () => {
  return (
    <div className={styles.Settings}>
        <div className={styles.SideMenu}>
            <div className={styles.Title}>
                <div className={styles.Logo}>
                    <IconSettings size={22} stroke={2.5} />
                </div>
                <h2>Settings</h2>
            </div>
            {/* <Link to="/createroom" className={styles.SideLink}>
                <IconAccessible size={20} />
                <span>Accessibility</span>
            </Link> */}
            <Link to="theme" className={styles.SideLink}>
                <IconColorSwatch size={20} />
                <span>Theme</span>
            </Link>
            <Link to="notifications" className={styles.SideLink}>
                <IconNotification size={20} />
                <span>Notifications</span>
            </Link>
            <Link to="help" className={styles.SideLink}>
                <IconHelp size={20} />
                <span>Help</span>
            </Link>
        </div>
        <div className={styles.SettingsPage}>
            <Outlet />
        </div>
        <Link className={styles.OptionsBtn} to="/createroom">
                <IconX stroke={0.5} size={20} />
            </Link>
    </div>
  )
}

export default Settings