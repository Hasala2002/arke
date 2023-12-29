import { useContext, useState, createContext, useEffect, useRef } from 'react'

const SettingsContext = createContext()

export const useSettings = () => {
    return useContext(SettingsContext)
}

export const SettingsProvider = ({ children }) => {

    const [theme, setTheme] = useState("default")

    const [toastState, setToastState] = useState(true)
    const [soundState, setSoundState] = useState(true)

    const [textSize, setTextSize] = useState(3)

    const TEXTSIZE_CONFIG = { 1: 85, 2: 92.5, 3: 100, 4: 107.5, 5: 115 }


    const value = {
        theme,
        setTheme,
        toastState,
        setToastState,
        soundState,
        setSoundState,
        textSize,
        setTextSize,
        TEXTSIZE_CONFIG
    }

    useEffect(() => {
        const theme = localStorage.getItem("theme")
        if (theme) {
            document.documentElement.setAttribute("data-theme", theme)
        } else {
            document.documentElement.setAttribute("data-theme", "default")
        }
    }, [theme])

    useEffect(() => {
        const sounds = localStorage.getItem("theme")
        if (sounds) {
            let state = sounds === "on"
            setSoundState(state)
        }

        const toasts = localStorage.getItem("toasts")
        if (toasts) {
            let state = toasts === "on"
            setToastState(state)
        }
    }, [])

    // useEffect(() => {
    //     let values = { 1: 85, 2: 92.5, 3: 100, 4: 107.5, 5: 115 }
    //     document.getElementById("chatbox").style.fontSize = values[textSize] + "%"
    // }, [textSize])



    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    )

}