import React, { useState, useRef, useEffect } from 'react';
import { useDialog } from './Dialog.context';
import AnimatedLogo from './AnimatedLogo';

const ArkeDialog = () => {


    const { dialogOptions } = useDialog()



    // const { openState, title, text, showCancelButton, confirmButtonText, onConfirm } = dialogOptions

    const [open, setOpen] = useState(null);

    useEffect(() => {
        if (dialogOptions) {
            setOpen(dialogOptions.open)
        }

    }, [dialogOptions])

    useEffect(() => {
        const handleEscKey = (event) => {
            if (open && event.key === 'Escape') {
                setOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => document.removeEventListener('keydown', handleEscKey);
    }, [open]);

    const handleConfirm = () => {
        setOpen(false);
        dialogOptions.onConfirm();
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <div className={`ArkeDialogWrapper ${open ? "ArkeDialogWrapperOpen" : ""}`} onClick={handleCancel}>
                <div className='ArkeDialog' onClick={(e) => e.stopPropagation()}>
                    {/* <img src="/arke.svg" alt="dialog-decoration" /> */}
                    <div className="dialog-icon">
                        <AnimatedLogo infinite />
                    </div>
                    <div className="dialog-content">
                        <h2>{dialogOptions && dialogOptions.title}</h2>
                        <p>{dialogOptions && dialogOptions.text}</p>
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