import React, { useState, useRef, useEffect } from 'react';
import { useDialog } from './Dialog.context';
import AnimatedLogo from './AnimatedLogo';

import Linkify from 'react-linkify';
import { useArke } from './Arke.Context';

const ArkeDialog = () => {


    const { dialogOptions, IMPORTANT_URLS } = useDialog()
    const { arkeToasteer, ArkeToast } = useArke()



    // const { openState, title, text, showCancelButton, confirmButtonText, onConfirm } = dialogOptions

    const [open, setOpen] = useState(null);
    const [check, setCheck] = useState(false)

    useEffect(() => {
        if (dialogOptions) {
            setOpen(dialogOptions.open)
        }

    }, [dialogOptions])

    useEffect(() => {
        const handleEscKey = (event) => {
            if (open && event.key === 'Escape') {
                setOpen(false);
                setCheck(false)
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => document.removeEventListener('keydown', handleEscKey);
    }, [open]);

    const handleConfirm = () => {
        if (check || !dialogOptions.confirmBoxText) {
            dialogOptions.onConfirm();
            setCheck(false)
            setOpen(false);
        } else {
            arkeToasteer({
                type: "error",
                message: dialogOptions && dialogOptions.unconfirmedError
            })
        }

    };

    const handleCancel = () => {
        setOpen(false);
        setCheck(false);
    };

    function getTitleFromUrl(inputUrl) {
        // Check if the inputUrl exists in the urlObject
        if (IMPORTANT_URLS.hasOwnProperty(inputUrl)) {
            // If it does, return the corresponding title
            return IMPORTANT_URLS[inputUrl];
        } else {
            // If not, return the original url
            return inputUrl;
        }
    }

    const hrefDecorator = (href, text, key) => {
        text = getTitleFromUrl(text)
        return (
            <a href={href} key={key} target="_blank">
                {text}
            </a>)
    };

    const customFormatter = ({ value, type }) => {
        // Extract the link and text from the value using a regular expression
        const match = /^([^\[]*)\[("([^"]*)"|([^\]"]*))\]$/.exec(value);
        if (match) {
            const text = match[1];
            const link = match[4] || match[3]; // Use either quoted or unquoted link
            return <a href={link}>{text}</a>;
        }
        return value; // Return the original value if it doesn't match the format
    };

    return (
        <>
            <ArkeToast />
            <div className={`ArkeDialogWrapper ${open ? "ArkeDialogWrapperOpen" : ""}`} onClick={handleCancel}>
                <div className='ArkeDialog' onClick={(e) => e.stopPropagation()}>
                    {/* <img src="/arke.svg" alt="dialog-decoration" /> */}
                    <div className="dialog-icon">
                        <AnimatedLogo infinite />
                    </div>
                    <div className="dialog-content">
                        <h2>{dialogOptions && dialogOptions.title}</h2>
                        <p>{dialogOptions && dialogOptions.text}</p>
                        {dialogOptions && dialogOptions.confirmBoxText && (
                            <div className="ArkeConfirmText">
                                <div className="ArkeCheckBox">
                                    <input className="ArkeCheckBoxInput" type="checkbox" value="None" id="ArkeConfirmBoxId" name="check" checked={check} readOnly />
                                    <label className="ArkeCheckBoxLabel" htmlFor="ArkeConfirmBoxId" onClick={() => { setCheck(!check) }}></label>
                                </div>
                                <div><Linkify componentDecorator={hrefDecorator} options={{ format: customFormatter }}>{dialogOptions && dialogOptions.confirmBoxText}</Linkify></div>
                            </div>
                        )}
                        <div className="dialog-buttons">
                            <button onClick={handleConfirm} className="ArkeDialogConfirm">{dialogOptions && dialogOptions.confirmButtonText}</button>
                            {dialogOptions && dialogOptions.showCancelButton && (
                                <button onClick={handleCancel} className="ArkeDialogCancel">Cancel</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ArkeDialog