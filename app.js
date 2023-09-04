const container = document.querySelector(".flex-container");
const input = document.querySelector(".grid-size");
const btns = document.querySelectorAll(".btn");
const getMode = document.querySelector(".active");
const colorPicker = document.querySelector(".colorPicker");

let numberOfSquare = 16;
let mode = getMode.dataset.mode;
let colorChosen; 

input.addEventListener("input", getInput);

btns.forEach((item) => {
    item.addEventListener("click", activeBtn);
})

colorPicker.addEventListener("input", function (e) {
    colorChosen = e.target.value;
    
})

// ************************
// Setting up rgb

function randomValue() {
    return Math.floor(Math.random()*257); 
}

function setRGB() {
    let red = randomValue();
    let green = randomValue();
    let blue = randomValue();
    
    return `rgb(${red},${green},${blue})`
}

// *************************

startGame();

function startGame() {
    emptyDiv();
    makeGrid(numberOfSquare);
    setBoxHover(mode);
}

function getInput(e) {
    numberOfSquare = e.target.value;
    startGame();
}

function activeBtn(e) {
    btns.forEach((item) => {
        item.classList.remove("active");
    })
    e.currentTarget.classList.add("active");
    mode = e.currentTarget.dataset.mode;
   
    setBoxHover(mode);
}


function emptyDiv() {
    container.innerHTML = "";
}

function makeGrid(numberOfSquare) {
    let boxWidth = 450 / numberOfSquare;
    
    for (let i = 0; i < numberOfSquare * numberOfSquare; i++){
        let box = document.createElement("div");
        box.style.cssText = `width: ${boxWidth}px; height: ${boxWidth}px;`;
        box.classList.add("box");
        container.appendChild(box);
    }
}

function setBoxHover(mode) {
    const boxes = document.querySelectorAll(".box");
    let eventListenFunc;
    boxes.forEach((box) => {

        if (mode === "single") {
            box.addEventListener("mousedown", singleColorMouseDown);
            box.addEventListener("mouseup", singleColorMouseUp);
            eventListenFunc = "single";
        }

        else if (mode === "select") {
            box.addEventListener("mousedown", chosenColorMouseDown);
            box.addEventListener("mouseup", chosenColorMouseUp);
            eventListenFunc = setChosenColor; 
        }

        else if (mode === "rainbow") {
            box.addEventListener("mousedown", rainbowMouseDown);
            box.addEventListener("mouseup", rainbowMouseUp);
            eventListenFunc = setRainbow;
        }

        else if (mode === "erase") {
            box.addEventListener("mousedown", eraseMouseDown);
            box.addEventListener("mouseup", eraseMouseUp);
        }

        else if (mode === "clear") {
            box.style.backgroundColor = "white";
        }
    })
}

// *********************************************************

function singleColorMouseDown(e) {
    const boxes = document.querySelectorAll(".box");
    e.currentTarget.style.backgroundColor = "black";
    boxes.forEach((item) => {
        item.addEventListener("mouseover", setSingleColor);
    })
}

function singleColorMouseUp(e) {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((item) => {
        item.removeEventListener("mouseover", setSingleColor);
    })
}

function setSingleColor(e) {
    e.target.style.backgroundColor = "black";
}

// *********************************************************
// *********************************************************
 
function chosenColorMouseDown(e) {
    const boxes = document.querySelectorAll(".box");
    e.currentTarget.style.backgroundColor = colorChosen;
    boxes.forEach((item) => {
        item.addEventListener("mouseover", setChosenColor);
    })
}

function chosenColorMouseUp(e) {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((item) => {
        item.removeEventListener("mouseover", setChosenColor);
    })
}

function setChosenColor(e) {
    e.target.style.backgroundColor = colorChosen;
}

// *********************************************************
// *********************************************************

function rainbowMouseDown(e) {
    const boxes = document.querySelectorAll(".box");
    e.currentTarget.style.backgroundColor = `${setRGB()}`;
    boxes.forEach((item) => {
        item.addEventListener("mouseover", setRainbow);
    })
}

function rainbowMouseUp(e) {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((item) => {
        item.removeEventListener("mouseover", setRainbow);
    })
}

function setRainbow(e) {
    e.target.style.backgroundColor = `${setRGB()}`;
}

// *********************************************************
// *********************************************************
function eraseMouseDown(e) {
    const boxes = document.querySelectorAll(".box");
    e.currentTarget.style.backgroundColor = "white";
    boxes.forEach((item) => {
        item.addEventListener("mouseover", setEraseColor);
    })
}
function eraseMouseUp(e) {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((item) => {
        item.removeEventListener("mouseover", setEraseColor);
    })
}

function setEraseColor(e) {
    e.target.style.backgroundColor = "white";
}
// *********************************************************
// *********************************************************

