import { IconAccessible, IconColorSwatch, IconHelp, IconNotification, IconSettings } from '@tabler/icons'
import React from 'react'
import { Link } from 'react-router-dom'
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
            <Link to="/createroom" className={styles.SideLink}>
                <IconAccessible size={20} />
                <span>Accessibility</span>
            </Link>
            <Link to="/createroom" className={styles.SideLink}>
                <IconColorSwatch size={20} />
                <span>Theme</span>
            </Link>
            <Link to="/createroom" className={styles.SideLink}>
                <IconNotification size={20} />
                <span>Notifications</span>
            </Link>
            <Link to="/createroom" className={styles.SideLink}>
                <IconHelp size={20} />
                <span>Help</span>
            </Link>
        </div>
    </div>
  )
}

export default Settings