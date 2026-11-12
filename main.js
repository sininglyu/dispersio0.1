// get coordinate of mouse 
const coordsLog = document.getElementById("coords");
let coordsSaved = document.getElementById("coords-list");
const svg = document.querySelector("svg");

document.addEventListener("mousemove", displayCoords);
document.addEventListener("click", logCoords);

const coordsList = [];
const circlesList = [];

// helper function to get svgCoords. Returns a point
function getSvgCoords(e) {
    const pt = new DOMPoint(e.clientX, e.clientY);

    // get transformation of screen to svg, inverse to get svg to screen
    const svgCoords = pt.matrixTransform(svg.getScreenCTM().inverse());
    svgCoords.y = - svgCoords.y.toFixed(1);
    svgCoords.x = + svgCoords.x.toFixed(1);

    return svgCoords;
}

// helper function to check if coords are in bounds. Returns boolean
function inBounds(coords) {
    return Math.abs(coords.x) <= 60 && Math.abs(coords.y) <= 60;
}

function plotCircle(coords) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("r", 1.5);
    circle.setAttribute("cx", coords.x);
    circle.setAttribute("cy", -coords.y);
    circle.setAttribute("fill", "red");

    circle.addEventListener("click", editShot);
    svg.appendChild(circle);
    circlesList.push(circle);
}

// function that shows what coordinate the mouse is at
function displayCoords(e) {
    const svgCoords = getSvgCoords(e);

    if (inBounds(svgCoords)) {
        coordsLog.innerText = 
        "X: " + svgCoords.x +
        " Y: " + svgCoords.y 
    } 
    else {
        coordsLog.innerText = " "
    }
}

// logging 
function logCoords(e) {
    if (e.target.tagName == "circle") return;
    let svgCoords = getSvgCoords(e);

    if (inBounds(svgCoords)) {
        coordsSaved.innerText += 
        "X: " + svgCoords.x +
        " Y: " + svgCoords.y +
        "\n"
        plotCircle(svgCoords);
        coordsList.push([svgCoords.x, svgCoords.y])
    }   
}

// Edit shot by popping up a form
function editShot(e) {
    document.getElementById("myForm").style.display = "block";
}