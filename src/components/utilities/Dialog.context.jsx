import { useContext, useState, createContext, useEffect, useRef } from 'react'
import ArkeDialog from "./ArkeDialog"

const DialogContext = createContext()

export const useDialog = () => {
    return useContext(DialogContext)
}

export const DialogProvider = ({ children }) => {

    // {
    //     openState: true,
    //     title: 'Are you sure?',
    //     text: "This is a disposable chatroom! All current chat history will be deleted.",
    //     showCancelButton: true,
    //     confirmButtonText: 'Yes I am sure',
    //     onConfirm: () => console.log("Hello")
    // }

    const [dialogOptions, arkeFire] = useState(null)

    const IMPORTANT_URLS = {
        "https://arkechat.live/terms-of-service": "Terms of Service",
        "https://arkechat.live/privacy-policy": "Privacy Policy",
        // Add more entries as needed
    };

    const value = {
        dialogOptions,
        IMPORTANT_URLS,
        arkeFire
    }

    return (
        <DialogContext.Provider value={value}>
            <ArkeDialog options={dialogOptions} />
            {children}
        </DialogContext.Provider>
    )

}