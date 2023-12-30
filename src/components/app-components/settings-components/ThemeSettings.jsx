import React from 'react'
import { useSettings } from '../../utilities/Settings.Context'
import * as styles from "./styles/SettingsComponent.module.scss"
import Divider from "../../utilities/Divider"

const ThemeSettings = () => {

    const { theme, setTheme, font, setFont } = useSettings()

    const setSelectedTheme = (theme) => {
        setTheme(theme)
        localStorage.setItem("theme", theme)
    }

    const setSelectedFont = (font_save) => {
        setFont(font_save)
        localStorage.setItem("font", font_save)
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
            <Divider />
            <h3>Font</h3>
            <div className={styles.Themes}>
                <div className={styles.ThemeFont}
                    style={{ borderColor: font === "default" ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.1)" }}
                    onClick={() => { setSelectedFont("default") }}>
                    <span style={{ fontFamily: `"Plus Jakarta Display", sans-serif` }}>Plus Jakarta</span>
                    <p>{"("}Default{")"}</p>
                </div>
                <div className={styles.ThemeFont}
                    style={{ borderColor: font === "kalam" ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.1)" }}
                    onClick={() => { setSelectedFont("kalam") }}>
                    <span style={{ fontFamily: `"Kalam", cursive` }}>Kalam</span>
                </div>
                <div className={styles.ThemeFont}
                    style={{ borderColor: font === "cascadia" ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.1)" }}
                    onClick={() => { setSelectedFont("cascadia") }}>
                    <span style={{ fontFamily: `"Cascadia Code", sans-serif` }}>Cascadia Code</span>
                </div>
            </div>
        </div>
    )
}

export default ThemeSettings