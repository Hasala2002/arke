import { useRef, useEffect, useState } from 'react';
import { useSettings } from './Settings.Context';

const DynamicFavicon = ({ imageSrc, notfication }) => {


    const { theme } = useSettings()

    const THEME_CONFIG = {
        "default": "#72128f",
        "malachite": "#0Bab64",
        "monarch": "#1525b8"
    }

    const canvasRef = useRef(null);
    const canvasWidth = 16;
    const canvasHeight = 16;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const image = new Image();

        let badgeText = ""

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const drawCanvas = () => {
            context.drawImage(image, 0, 0, canvas.width, canvas.height);

            if (notfication === null) return

            if (typeof notfication === "string") return

            if (notfication > 9) {
                badgeText = "9+"
            } else {
                badgeText = `${notfication}`
            }

            const circleRadius = 6;
            const circleX = canvas.width - 5
            const circleY = canvas.height - 5

            context.beginPath();
            context.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
            context.fillStyle = THEME_CONFIG[theme];
            context.fill();

            context.font = '8px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(badgeText, circleX, circleY);
        };

        const convertCanvasToImage = () => {
            const image = new Image();
            image.src = canvas.toDataURL('image/png');
            return image;
        };

        const updateFavicon = (val) => {
            const faviconImage = convertCanvasToImage();

            // Set the favicon
            const head = document.head || document.getElementsByTagName('head')[0];
            const existingFavicon = document.getElementById('dynamic-favicon');
            if (existingFavicon) {
                head.removeChild(existingFavicon);
            }

            const newFavicon = document.createElement('link');
            newFavicon.id = 'dynamic-favicon';
            newFavicon.type = 'image/x-icon';
            newFavicon.rel = 'shortcut icon';
            newFavicon.href = faviconImage.src;

            head.appendChild(newFavicon);
        };

        image.onload = () => {
            drawCanvas();
            updateFavicon();
        };

        image.src = imageSrc;
    }, [imageSrc, notfication, canvasWidth, canvasHeight, theme]);

    return <canvas className='favicon-canvas' ref={canvasRef} />;
};

export default DynamicFavicon;
