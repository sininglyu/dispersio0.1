// get coordinate of mouse 
let coordsLog = document.getElementById("coords");
let coordsSaved = document.getElementById("coords-list");
let svg = document.querySelector("svg");

document.addEventListener("mousemove", displayCoords);
document.addEventListener("click", logCoords);

const coordsList = [];

// helper function to get svgCoords. Returns a point
function getSvgCoords(e) {
    const pt = new DOMPoint(e.clientX, e.clientY);

    // get transformation of screen to svg, inverse to get svg to screen
    const svgCoords = pt.matrixTransform(svg.getScreenCTM().inverse());
    svgCoords.y = - svgCoords.y.toFixed(1);
    svgCoords.x = svgCoords.x.toFixed(1);


    return svgCoords
}

// function that shows what coordinate the mouse is at
function displayCoords(e) {
    const svgCoords = getSvgCoords(e);

    if (svgCoords.x <= 60 && svgCoords.x >= -60 && svgCoords.y >= -60 && svgCoords.y <= 60) {
        coordsLog.innerText = 
        "X: " + svgCoords.x +
        " Y: " + svgCoords.y 
    } 
    else {
        coordsLog.innerText = ""
    }
}

// logging 
function logCoords(e) {
    let svgCoords = getSvgCoords(e);

    coordsSaved.innerText += 
    "X: " + svgCoords.x +
    " Y: " + svgCoords.y +
    "\n"
}
