import React from 'react'
import { useEffect } from 'react'

const AnimatedBackground = () => {

    useEffect(() => {
        // JavaScript code to randomly select 5 circles and change their color with a staggered effect

        function getRandomCircles(totalCircles, numToSelect) {
            // Create an array with numbers from 0 to totalCircles - 1
            const allCircles = Array.from({ length: totalCircles }, (_, index) => index);
            const selectedCircles = [];

            // Randomly select numToSelect circles
            for (let i = 0; i < numToSelect; i++) {
                const randomIndex = Math.floor(Math.random() * allCircles.length);
                selectedCircles.push(allCircles.splice(randomIndex, 1)[0]);
            }

            return selectedCircles;
        }

        function changeColorWithStagger(
            selectedCircles,
            targetColor,
            delayBetweenCircles
        ) {
            // Get all the circles in the SVG
            const circles = document.querySelectorAll("svg#grid circle");

            // Add a staggered effect to the color change for selected circles
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
            delayBetweenCircles
        ) {
            // Get all the circles in the SVG
            const circles = document.querySelectorAll("svg#grid circle");

            // Add a staggered effect to reset the color of selected circles to the original color
            selectedCircles.forEach((index, i) => {
                setTimeout(() => {
                    circles[index].style.transition = "fill 1s ease-in-out";
                    circles[index].setAttribute("fill", originalColor);
                }, i * delayBetweenCircles);
            });
        }
        3;

        function loopColorChange() {
            const circles = document.querySelectorAll("svg#grid circle");

            // Randomly select 5 circles
            const selectedCircles = getRandomCircles(circles.length, 5);

            // Define the staggered delay between each circle color change (milliseconds)
            const delayBetweenCircles = 200;

            // Change the color of selected circles to #72128f (or any other target color) with a staggered effect
            changeColorWithStagger(selectedCircles, "#72128f", delayBetweenCircles);

            // Reset the color of the selected circles to the original color with a staggered effect after a delay
            setTimeout(() => {
                resetColorWithStagger(
                    selectedCircles,
                    "rgba(255, 255, 255, 0.07)",
                    delayBetweenCircles
                );

                // Call the function again after a delay to move to the next set of circles
                setTimeout(loopColorChange, delayBetweenCircles * selectedCircles.length);
            }, 2000); // Change 2000 to your desired duration for the #72128f color
        }

        // Call the function to start the color change loop
        loopColorChange();
    }, [])


    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                // xmlns: svgjs="http://svgjs.dev/svgjs"
                viewBox="0 0 800 800"
                width="800"
                height="800"
                id="grid"
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