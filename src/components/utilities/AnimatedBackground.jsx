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
            circles[index].style.transition = "all 1s ease-in-out";
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
            circles[index].style.transition = "all 1s ease-in-out";
            circles[index].setAttribute("fill", originalColor);
        }, i * delayBetweenCircles);
    });
};

function getIntermediatePoints(startPoint, endPoint) {
    // Calculate the step size for interpolation
    const step = 1 / 31; // 21 points including start and end

    // Initialize the result array with the start point
    let intermediatePoints = [startPoint];

    // Perform linear interpolation for 20 intermediate points
    for (let t = step; t < 1; t += step) {
        // Calculate intermediate point using linear interpolation formula
        // const x = startPoint.x + (endPoint.x - startPoint.x) * t;
        // const y = startPoint.y + (endPoint.y - startPoint.y) * t;
        const x = startPoint.x + (endPoint.x - startPoint.x) * t + Math.random() * 10 - 2.5;
        const y = startPoint.y + (endPoint.y - startPoint.y) * t + Math.random() * 10 - 2.5;
        // Add the intermediate point to the result array
        intermediatePoints.push({ x, y });
    }

    // Add the end point to the result array
    intermediatePoints.push(endPoint);

    return intermediatePoints;
}

// Example usage:
// const startPoint = { x: 10, y: 20 };
// const endPoint = { x: 90, y: 80 };

// const intermediatePoints = getIntermediatePoints(startPoint, endPoint);



const AnimatedBackground = () => {

    const svgRef = useRef(null);
    const [circles, setCircles] = useState([]);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [fixedPoint, setFixedPoint] = useState({ x: 0, y: 0 });

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

    const [isDrawing, setIsDrawing] = useState(false);
    const [linePoints, setLinePoints] = useState([]);

    const [linePointLines, setLinePointLines] = useState([[]])


    const handleMouseLeave = () => {
        setIsDrawing(false);
        // console.log("hello")
    };

    const handleMouseEnter = () => {
        setIsDrawing(true);
        // console.log("hello")
    };

    const handleMouseMove = (event) => {
        // if (isDrawing) {
        //     const mouseX = event.nativeEvent.offsetX;
        //     const mouseY = event.nativeEvent.offsetY;
        //     const newLinePoint = { x: mouseX, y: mouseY };
        //     setLinePoints(prevPoints => [...prevPoints, newLinePoint]);
        // }
        // console.log(event.nativeEvent)
        // console.log(event)
        setCursorPosition({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
    };


    useEffect(() => {
        if (!isDrawing) {
            // console.log("out")
            setLinePointLines([])
        } else {
            // console.log("in")
        }

    }, [isDrawing])


    // useEffect(() => {
    //     console.log(linePointLines)
    // }, [linePointLines])


    useEffect(() => {
        // console.log(parseFloat(fixedPoint.x) + Math.random() * 10 - 2.5)
        const interval = setInterval(() => {
            if (isDrawing) {
                // console.table(cursorPosition)
                // const newShakyLinePoints = [
                //     cursorPosition,
                //     { x: parseFloat(fixedPoint.x), y: parseFloat(fixedPoint.y) } // Adjust the range of randomness
                // ];

                let newLines = []

                for (let i = 0; i < fixedPoint.length; i++) {
                    const newShakyLinePoints = getIntermediatePoints({ x: parseFloat(fixedPoint[i].x), y: parseFloat(fixedPoint[i].y) }, cursorPosition)
                    newLines.push(newShakyLinePoints)
                }



                // const newShakyLinePoints = getIntermediatePoints({ x: parseFloat(fixedPoint.x), y: parseFloat(fixedPoint.y) }, cursorPosition)
                // console.log(newLines)
                setLinePointLines(newLines);
                // console.log(getIntermediatePoints({ x: parseFloat(fixedPoint.x), y: parseFloat(fixedPoint.y) }, cursorPosition))
            } else {
                setLinePointLines([])
            }
        }, 100); // Adjust the interval duration according to your preference

        return () => clearInterval(interval);
    }, [cursorPosition, fixedPoint]);


    const startAnimation = () => {

        const selectedCircles = getRandomCircles(circles.length, 7);

        // let fixedPointValue = { x: 0, y: 0 }
        // fixedPointValue.x = ((circles[selectedCircles[0]]).getAttribute("cx"))
        // fixedPointValue.y = ((circles[selectedCircles[0]]).getAttribute("cy"))

        // setFixedPoint(fixedPointValue)

        let fixedPointValues = []

        for (let i = 0; i < selectedCircles.length; i++) {
            let fixedPointValue = { x: 0, y: 0 }
            fixedPointValue.x = ((circles[selectedCircles[i]]).getAttribute("cx"))
            fixedPointValue.y = ((circles[selectedCircles[i]]).getAttribute("cy"))
            fixedPointValues.push(fixedPointValue)

        }

        setFixedPoint(fixedPointValues)

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
                id="animatedBackground"
                ref={svgRef}
                onMouseUp={handleMouseLeave}
                // onMouseEnter={handleMouseEnter}
                onMouseDown={(event) => {
                    handleMouseEnter()
                    handleMouseMove(event)
                }}
                onClick={() => {
                    // console.log(linePointLines)
                    // linePointLines.map(linePointLine => {
                    //     linePointLine.map(linePoint => {
                    //         console.log(linePoint);
                    //     })
                    // })
                }}
            >

                {/* {linePointLines && linePointLines.map(linePointsLine => {
                    <polyline
                        points={linePointsLine && linePointsLine.map(point => `${point.x + Math.random() * 10 - 2.5},${point.y + Math.random() * 10 - 2.5}`).join(' ')}
                        // points={`${linePoints[0].x},${linePoints[0].y}, ${linePoints[1].x},${linePoints[1].y}`}
                        fill="none"
                        className="poly-line"
                        strokeWidth="2"
                    />
                })} */}

                {/* {linePointLines && linePointLines.map(linePoints => { */}
                <polyline
                    points={linePointLines[0] && linePointLines[0].map(point => `${point.x + Math.random() * 10 - 2.5},${point.y + Math.random() * 10 - 2.5}`).join(' ')}
                    fill="none"
                    className="poly-line"
                    strokeWidth="1"
                />
                <polyline
                    points={linePointLines[1] && linePointLines[1].map(point => `${point.x + Math.random() * 10 - 2.5},${point.y + Math.random() * 10 - 2.5}`).join(' ')}
                    fill="none"
                    className="poly-line"
                    strokeWidth="1"
                />
                <polyline
                    points={linePointLines[2] && linePointLines[2].map(point => `${point.x + Math.random() * 10 - 2.5},${point.y + Math.random() * 10 - 2.5}`).join(' ')}
                    fill="none"
                    className="poly-line"
                    strokeWidth="1"
                />
                <polyline
                    points={linePointLines[3] && linePointLines[3].map(point => `${point.x + Math.random() * 10 - 2.5},${point.y + Math.random() * 10 - 2.5}`).join(' ')}
                    fill="none"
                    className="poly-line"
                    strokeWidth="1"
                />
                <polyline
                    points={linePointLines[4] && linePointLines[4].map(point => `${point.x + Math.random() * 10 - 2.5},${point.y + Math.random() * 10 - 2.5}`).join(' ')}
                    fill="none"
                    className="poly-line"
                    strokeWidth="1"
                />
                <polyline
                    points={linePointLines[5] && linePointLines[5].map(point => `${point.x + Math.random() * 10 - 2.5},${point.y + Math.random() * 10 - 2.5}`).join(' ')}
                    fill="none"
                    className="poly-line"
                    strokeWidth="1"
                />
                <polyline
                    points={linePointLines[6] && linePointLines[6].map(point => `${point.x + Math.random() * 10 - 2.5},${point.y + Math.random() * 10 - 2.5}`).join(' ')}
                    fill="none"
                    className="poly-line"
                    strokeWidth="1"
                />
                {/* })} */}
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