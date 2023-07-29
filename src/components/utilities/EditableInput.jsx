import React, { useState, useRef } from 'react';
import useFocus from './useFocus';
import { useArke } from './Arke.Context';


const EditableInput = ({ initialValue, currentUser, setCurrentUser, editMode, setEditMode }) => {

    const [value, setValue] = useState(initialValue);

    const { arkeToasteer } = useArke()

    // const editableInput = useRef(0);

    const [inputRef, setInputFocus] = useFocus()

    const handleDoubleClick = () => {
        setEditMode(true);
    };

    const handleBlur = () => {
        if (value !== "") {
            setEditMode(false);
        } else {
            arkeToasteer({
                type: "error",
                message: "Display Name cannot be empty!"
            })
            setInputFocus()
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
    };

    const handleChange = (e) => {
        setValue(e.target.value);
        if (e.target.value !== "") {
            setCurrentUser({
                ...currentUser,
                senderName: e.target.value
            })
        }
    };

    if (editMode) {
        return (
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                autoFocus
            />
        );
    }

    return (
        <span onDoubleClick={handleDoubleClick}>
            {value}
        </span>
    );
};

export default EditableInput;