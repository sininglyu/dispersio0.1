// get coordinate of mouse 
const coordsLog = document.getElementById("coords");
let coordsSaved = document.getElementById("coords-list");
const svg = document.querySelector("svg");
const shotForm = document.getElementById("myForm");

shotForm.addEventListener("submit", submitShot);
document.addEventListener("mousemove", displayCoords);
svg.addEventListener("click", logCoords);
document.getElementById("btn-cancel").addEventListener("click", closeForm);

const coordsList = [];
const circlesList = [];
let pendingCoords = null;
let editingShot = false;
let curShot = null;
let addingShot = false;

// helper function to get svgCoords. Returns a point
function getSvgCoords(e) {
    const pt = new DOMPoint(e.clientX, e.clientY);

    // get transformation of screen to svg, inverse to get svg to screen
    const svgCoords = pt.matrixTransform(svg.getScreenCTM().inverse());
    svgCoords.y = - svgCoords.y.toFixed(1);
    svgCoords.x = Number(svgCoords.x.toFixed(1));

    return svgCoords;
}

// helper function to check if coords are in bounds. Returns boolean
function inBounds(coords) {
    return Math.abs(coords.x) <= 60 && Math.abs(coords.y) <= 60;
}

function closeForm() {
    svg.removeChild(circlesList.pop());
    shotForm.style.display = "none";
    addingShot = false;
    shotForm.reset();
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
    if (!addingShot) {
        if (inBounds(svgCoords)) {
            addingShot = true;
            plotCircle(svgCoords);
            editShot(e, svgCoords);
        }   
    }
}

// Edit shot by popping up a form
function editShot(e, svgCoords) {
    editingShot = false;
    curShot = null;

    if (e.target.tagName == "circle") {
        editingShot = true;
        curShot = e.target;
    }

    pendingCoords = svgCoords;
    shotForm.style.display = "block";
    document.querySelector("input[name=xval]").placeholder = svgCoords.x;
    document.querySelector("input[name=yval]").placeholder = svgCoords.y;
}

function submitShot(e) {
    e.preventDefault();

    console.log("test");

    const x = document.querySelector("input[name=xval]").value || pendingCoords.x;
    const y = document.querySelector("input[name=yval]").value || pendingCoords.y;  

    if (editingShot) {
        plotCircle({x: x, y: y});

        let index = -1;

        for (let i = 0; i < coordsList.length; i++) {
            if (coordsList[i][0] == pendingCoords.x && coordsList[i][1] == pendingCoords.y) {
                index = i;
                break;
            }
        }

        console.log(index);

        if (index != -1) {
            coordsList[index] = [x, y];
            console.log(coordsList);
            coordsSaved.children[index].innerText = "X: " + x + " Y: " + y;
        }

        svg.removeChild(curShot);
        console.log("editing shot");  
        shotForm.style.display = "none";
        shotForm.reset();
        addingShot = false;
        return false;
    }

    const p = document.createElement("p");
    p.innerText = "X: " + x + " Y: " + y;
    coordsSaved.appendChild(p);

    svg.removeChild(circlesList.pop());
    plotCircle({x: x, y: y});
    coordsList.push([x, y])

    console.log("submitting");  
    shotForm.style.display = "none";
    addingShot = false;
    shotForm.reset();
}