import React, { useRef, useState } from 'react'
import { useEffect } from 'react'

function getRandomCircles(totalCircles, numToSelect) {
    const allCircles = Array.from({ length: totalCircles }, (_, index) => index);
    const selectedCircles = [];

    for (let i = 0; i < numToSelect; i++) {
        const randomIndex = Math.floor(Math.random() * allCircles.length);
        selectedCircles.push(allCircles.splice(randomIndex, 1)[0]);
    }

    return selectedCircles;
}

function changeColorWithStagger(
    selectedCircles,
    targetColor,
    delayBetweenCircles,
    circles
) {
    selectedCircles.forEach((index, i) => {
        setTimeout(() => {
            circles[index].style.transition = "fill 1s ease-in-out";
            circles[index].setAttribute("fill", targetColor);
        }, i * delayBetweenCircles);
    });
}

function resetColorWithStagger(
    selectedCircles,
    originalColor,
    delayBetweenCircles,
    circles
) {
    selectedCircles.forEach((index, i) => {
        setTimeout(() => {
            circles[index].style.transition = "fill 1s ease-in-out";
            circles[index].setAttribute("fill", originalColor);
        }, i * delayBetweenCircles);
    });
};


const AnimatedBackground = () => {

    const svgRef = useRef(null);
    const [circles, setCircles] = useState([]);

    const setupAnimation = () => {
        const svgElement = svgRef.current;
        const circles = svgElement.querySelectorAll('circle');
        setCircles(circles);
    }

    useEffect(() => {
        setupAnimation()
        // startAnimation()
    }, []);

    useEffect(() => {
        if (circles.length > 0) {
            startAnimation();
        }
    }, [circles]);


    const startAnimation = () => {

        const selectedCircles = getRandomCircles(circles.length, 5);

        const delayBetweenCircles = 200;

        changeColorWithStagger(selectedCircles, Math.random() < 0.5 ? 'var(--primary-color)' : 'var(--secondary-color)', delayBetweenCircles, circles);

        setTimeout(() => {
            resetColorWithStagger(selectedCircles, 'rgba(255,255,255,0.075)', delayBetweenCircles, circles);
            setTimeout(startAnimation, delayBetweenCircles * selectedCircles.length);
        }, 2000);
    };

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 800 800"
                width="800"
                height="800"
                ref={svgRef}
            >
                <circle
                    r="3"
                    cx="66.66666666666667"
                    cy="66.66666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="133.33333333333334"
                    cy="66.66666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="200"
                    cy="66.66666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="266.6666666666667"
                    cy="66.66666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="333.33333333333337"
                    cy="66.66666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="400.00000000000006"
                    cy="66.66666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="466.66666666666674"
                    cy="66.66666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="533.3333333333334"
                    cy="66.66666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="600"
                    cy="66.66666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="666.6666666666666"
                    cy="66.66666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="733.3333333333333"
                    cy="66.66666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="66.66666666666667"
                    cy="133.33333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="133.33333333333334"
                    cy="133.33333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="200"
                    cy="133.33333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="266.6666666666667"
                    cy="133.33333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="333.33333333333337"
                    cy="133.33333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="400.00000000000006"
                    cy="133.33333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="466.66666666666674"
                    cy="133.33333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="533.3333333333334"
                    cy="133.33333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="600"
                    cy="133.33333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="666.6666666666666"
                    cy="133.33333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="733.3333333333333"
                    cy="133.33333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="66.66666666666667"
                    cy="200"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="133.33333333333334"
                    cy="200"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="200"
                    cy="200"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="266.6666666666667"
                    cy="200"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="333.33333333333337"
                    cy="200"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="400.00000000000006"
                    cy="200"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="466.66666666666674"
                    cy="200"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="533.3333333333334"
                    cy="200"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="600"
                    cy="200"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="666.6666666666666"
                    cy="200"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="733.3333333333333"
                    cy="200"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="66.66666666666667"
                    cy="266.6666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="133.33333333333334"
                    cy="266.6666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="200"
                    cy="266.6666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="266.6666666666667"
                    cy="266.6666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="333.33333333333337"
                    cy="266.6666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="400.00000000000006"
                    cy="266.6666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="466.66666666666674"
                    cy="266.6666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="533.3333333333334"
                    cy="266.6666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="600"
                    cy="266.6666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="666.6666666666666"
                    cy="266.6666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="733.3333333333333"
                    cy="266.6666666666667"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="66.66666666666667"
                    cy="333.33333333333337"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="133.33333333333334"
                    cy="333.33333333333337"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="200"
                    cy="333.33333333333337"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="266.6666666666667"
                    cy="333.33333333333337"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="333.33333333333337"
                    cy="333.33333333333337"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="400.00000000000006"
                    cy="333.33333333333337"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="466.66666666666674"
                    cy="333.33333333333337"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="533.3333333333334"
                    cy="333.33333333333337"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="600"
                    cy="333.33333333333337"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="666.6666666666666"
                    cy="333.33333333333337"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="733.3333333333333"
                    cy="333.33333333333337"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="66.66666666666667"
                    cy="400.00000000000006"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="133.33333333333334"
                    cy="400.00000000000006"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="200"
                    cy="400.00000000000006"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="266.6666666666667"
                    cy="400.00000000000006"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="333.33333333333337"
                    cy="400.00000000000006"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="400.00000000000006"
                    cy="400.00000000000006"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="466.66666666666674"
                    cy="400.00000000000006"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="533.3333333333334"
                    cy="400.00000000000006"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="600"
                    cy="400.00000000000006"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="666.6666666666666"
                    cy="400.00000000000006"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="733.3333333333333"
                    cy="400.00000000000006"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="66.66666666666667"
                    cy="466.66666666666674"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="133.33333333333334"
                    cy="466.66666666666674"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="200"
                    cy="466.66666666666674"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="266.6666666666667"
                    cy="466.66666666666674"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="333.33333333333337"
                    cy="466.66666666666674"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="400.00000000000006"
                    cy="466.66666666666674"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="466.66666666666674"
                    cy="466.66666666666674"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="533.3333333333334"
                    cy="466.66666666666674"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="600"
                    cy="466.66666666666674"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="666.6666666666666"
                    cy="466.66666666666674"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="733.3333333333333"
                    cy="466.66666666666674"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="66.66666666666667"
                    cy="533.3333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="133.33333333333334"
                    cy="533.3333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="200"
                    cy="533.3333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="266.6666666666667"
                    cy="533.3333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="333.33333333333337"
                    cy="533.3333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="400.00000000000006"
                    cy="533.3333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="466.66666666666674"
                    cy="533.3333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="533.3333333333334"
                    cy="533.3333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="600"
                    cy="533.3333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="666.6666666666666"
                    cy="533.3333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="733.3333333333333"
                    cy="533.3333333333334"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="66.66666666666667"
                    cy="600"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="133.33333333333334"
                    cy="600"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="200"
                    cy="600"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="266.6666666666667"
                    cy="600"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="333.33333333333337"
                    cy="600"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="400.00000000000006"
                    cy="600"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="466.66666666666674"
                    cy="600"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="533.3333333333334"
                    cy="600"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="600"
                    cy="600"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="666.6666666666666"
                    cy="600"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="733.3333333333333"
                    cy="600"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="66.66666666666667"
                    cy="666.6666666666666"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="133.33333333333334"
                    cy="666.6666666666666"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="200"
                    cy="666.6666666666666"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="266.6666666666667"
                    cy="666.6666666666666"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="333.33333333333337"
                    cy="666.6666666666666"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="400.00000000000006"
                    cy="666.6666666666666"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="466.66666666666674"
                    cy="666.6666666666666"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="533.3333333333334"
                    cy="666.6666666666666"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="600"
                    cy="666.6666666666666"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="666.6666666666666"
                    cy="666.6666666666666"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="733.3333333333333"
                    cy="666.6666666666666"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="66.66666666666667"
                    cy="733.3333333333333"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="133.33333333333334"
                    cy="733.3333333333333"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="200"
                    cy="733.3333333333333"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="266.6666666666667"
                    cy="733.3333333333333"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="333.33333333333337"
                    cy="733.3333333333333"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="400.00000000000006"
                    cy="733.3333333333333"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="466.66666666666674"
                    cy="733.3333333333333"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="533.3333333333334"
                    cy="733.3333333333333"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="600"
                    cy="733.3333333333333"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="666.6666666666666"
                    cy="733.3333333333333"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
                <circle
                    r="3"
                    cx="733.3333333333333"
                    cy="733.3333333333333"
                    fill="rgba(255, 255, 255, 0.07)"
                    stroke="none"
                ></circle>
            </svg>
        </>
    )
}

export default AnimatedBackground