import React from 'react'
import { useSettings } from '../../utilities/Settings.Context'
import * as styles from "./styles/SettingsComponent.module.scss"

const ThemeSettings = () => {

    const { theme, setTheme } = useSettings()

    const setSelectedTheme = (theme) => {
        setTheme(theme)
        localStorage.setItem("theme", theme)
    }

    return (
        <div className={styles.SettingsContainer}>
            <h2>Theme</h2>
            <div className={styles.Themes}>
                <div className={styles.Theme}
                    style={{ borderColor: theme === "default" ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.1)" }}
                    onClick={() => { setSelectedTheme("default") }}>
                    <img src="/theme_previews/def-pre.png" alt="Default Theme" />
                    <span>Emperor</span>
                </div>
                <div className={styles.Theme}
                    style={{ borderColor: theme === "malachite" ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.1)" }}
                    onClick={() => { setSelectedTheme("malachite") }}>
                    <img src="/theme_previews/mal-pre.png" alt="Malachite Theme" />
                    <span>Malachite</span>
                </div>
                <div className={styles.Theme}
                    style={{ borderColor: theme === "monarch" ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.1)" }}
                    onClick={() => { setSelectedTheme("monarch") }}>
                    <img src="/theme_previews/mon-pre.png" alt="Monarch Theme" />
                    <span>Monarch</span>
                </div>
            </div>
            <p>More themes coming soon. Stay upto date using the github repository, or contribute themes to us!</p>
        </div>
    )
}

export default ThemeSettings