// get coordinate of mouse 
let coordsLog = document.getElementById("coords");
let svg = document.querySelector("svg");

document.addEventListener("mousemove", logKey);

function logKey(e) {
    const pt = new DOMPoint(e.clientX, e.clientY);
    const svgCoords = pt.matrixTransform(svg.getScreenCTM().inverse());
    svgCoords.y = - svgCoords.y;

    coordsLog.innerText = 
    "X: " + svgCoords.x +
    " Y: " + svgCoords.y 
}