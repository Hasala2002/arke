import { IconColorSwatch, IconDialpad, IconHelp, IconLock, IconSettings, IconX } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import * as styles from "./styles/Settings.module.scss"
import LogoBox from "./utilities/LogoBox"

import { motion } from "framer-motion"

const Settings = ({ prevRoute }) => {

    const navigate = useNavigate();

    const location = useLocation();

    const [selectedThemePage, setSelectedThemePage] = useState();

    useEffect(() => {
        if (location.pathname === ('/settings')) {
            navigate("/settings/general")
        }
        const currentPath = location.pathname;
        if (currentPath.startsWith("/settings")) {
            let locArray = currentPath.split("/")
            setSelectedThemePage(locArray[2])
        }
    }, [location.pathname]);


    return (
        <motion.div initial={{ y: 0, scale: 0.99, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 0, scale: 0.99, opacity: 0 }}
            transition={{ type: "tween", duration: 0.25 }} className={styles.Settings}>
            <div className={styles.SideMenu}>
                <div className={styles.Title}>
                    <LogoBox>
                        <IconSettings size={22} stroke={2.5} />
                    </LogoBox>
                    <h2>Settings</h2>
                </div>
                {/* <Link to="/createroom" className={styles.SideLink}>
                <IconAccessible size={20} />
                <span>Accessibility</span>
            </Link> */}
                <div className={styles.SettingLinks}>
                    <Link to="general" className={`${styles.SideLink} ${selectedThemePage === "general" ? styles.SelectedSideLink : ""}`}>
                        <IconDialpad size={20} />
                        <span>General</span>
                    </Link>
                    <Link to="theme" className={`${styles.SideLink} ${selectedThemePage === "theme" ? styles.SelectedSideLink : ""}`}>
                        <IconColorSwatch size={20} />
                        <span>Theme</span>
                    </Link>
                    <Link to="encryption" className={`${styles.SideLink} ${selectedThemePage === "encryption" ? styles.SelectedSideLink : ""}`}>
                        <IconLock size={20} />
                        <span>Encryption</span>
                    </Link>
                    <Link to="help" className={`${styles.SideLink} ${selectedThemePage === "help" ? styles.SelectedSideLink : ""}`}>
                        <IconHelp size={20} />
                        <span>Help</span>
                    </Link>
                </div>
            </div>
            <div className={styles.SettingsPage}>
                <Outlet />
            </div>
            <button className={styles.OptionsBtn}
                onClick={() => {
                    // If there is a previous main route, navigate to it; otherwise, go to the root
                    navigate(prevRoute || '/createroom');
                }}
            >
                <IconX stroke={0.5} size={20} />
            </button>
        </motion.div>
    )
}

export default Settings