import { useContext, useState, createContext, useEffect, useRef } from 'react'

const SettingsContext = createContext()

export const useSettings = () => {
    return useContext(SettingsContext)
}

export const SettingsProvider = ({ children }) => {

    const [theme, setTheme] = useState("default")

    const [toastState, setToastState] = useState(true)
    const [soundState, setSoundState] = useState(true)
    const [twelveHrClock, setTwelveHrClock] = useState(false)

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
        twelveHrClock,
        setTwelveHrClock,
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
        const sounds = localStorage.getItem("sounds")
        if (sounds) {
            let state = sounds === "on"
            setSoundState(state)
        }

        const toasts = localStorage.getItem("toasts")
        if (toasts) {
            let state = toasts === "on"
            setToastState(state)
        }

        const twelve_hour = localStorage.getItem("twelve_hour")
        if (twelve_hour) {
            let state = twelve_hour === "on"
            setTwelveHrClock(state)
        }

        const text_size = localStorage.getItem("text_size")
        if (text_size) {
            setTextSize(parseInt(text_size))
        }
    }, [])




    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    )

}