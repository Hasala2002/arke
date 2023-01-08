import { useContext, useState ,createContext ,useEffect, useRef} from 'react'

const SettingsContext = createContext()

export const useSettings = () => {
    return useContext(SettingsContext)
}

export const SettingsProvider = ({children}) => {

    const [theme,setTheme] = useState("default")

    const [toastState,setToastState] = useState(true)
    const [soundState,setSoundState] = useState(true)

    const value ={
        theme,
        setTheme,
        toastState,
        setToastState,
        soundState,
        setSoundState,
    }

    useEffect(()=>{
        const theme = localStorage.getItem("theme")
        if(theme){
            document.documentElement.setAttribute("data-theme", theme) 
        }else{
            document.documentElement.setAttribute("data-theme", "default") 
        }
    },[theme])


    return(
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    )

}