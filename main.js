// get coordinate of mouse 
const coordsLog = document.getElementById("coords");
let coordsSaved = document.getElementById("coords-list");
const svg = document.querySelector("svg");
const shotForm = document.getElementById("myForm");

shotForm.addEventListener("submit", submitShot);
document.addEventListener("mousemove", displayCoords);
svg.addEventListener("click", logCoords);

const coordsList = [];
const circlesList = [];
let pendingCoords = null;
let editingShot = false;

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

    circle.addEventListener("click", (e) => editShot(e, coords));
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

// logging, the meat of this program
function logCoords(e) {
    if (e.target.tagName == "circle") return;
    let svgCoords = getSvgCoords(e);

    if (inBounds(svgCoords)) {
        editShot(e, svgCoords);
    }   
}

// Edit shot by popping up a form
function editShot(e, svgCoords) {
    if (e.target.tagName == "circle") {
        editingShot = true;
    }

    pendingCoords = svgCoords;
    shotForm.style.display = "block";
    document.querySelector("input[name=xval]").placeholder = svgCoords.x;
    document.querySelector("input[name=yval]").placeholder = svgCoords.y;
}

function submitShot(e) {
    e.preventDefault();
    const x = document.querySelector("input[name=xval]").value || pendingCoords.x;
    const y = document.querySelector("input[name=yval]").value || pendingCoords.y;  

    coordsSaved.innerText += 
        "X: " + x +
        " Y: " + y +
        "\n"
    plotCircle({x: x, y: y});
    coordsList.push([x, y])

    console.log("submitting");  
    shotForm.style.display = "none";
}