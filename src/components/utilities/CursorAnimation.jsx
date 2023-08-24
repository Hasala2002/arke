import React, { useState, useEffect } from 'react';

const CursorAnimation = () => {
    const [animationActive, setAnimationActive] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setAnimationActive(true);
        setPosition({ x: e.clientX, y: e.clientY });
        setCursorOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseUp = () => {
        setTimeout(() => {
            setAnimationActive(false);
        }, 100)
    };

    useEffect(() => {

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div
            className={`cursor ${animationActive ? 'animation' : ''}`}
            style={{
                '--x': `${position.x}px`,
                '--y': `${position.y}px`,
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        />
    );
};

export default CursorAnimation;