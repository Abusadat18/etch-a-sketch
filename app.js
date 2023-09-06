const container = document.querySelector(".flex-container");
const input = document.querySelector(".slider");
const btns = document.querySelectorAll(".btn");
const getMode = document.querySelector(".active");
const colorPicker = document.querySelector(".colorPicker");
const rangeText = document.querySelector(".range-text");

let numberOfSquare = 16;
let mode = getMode.dataset.mode;
let colorChosen; 
let prevMouseDownListner;
let prevMouseUpListner;

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
    rangeText.textContent = `Grid-Size : ${numberOfSquare} x ${numberOfSquare}`;
    console.log(numberOfSquare);
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
    
    boxes.forEach((box) => {
        if (mode === "single") {
            
            if (prevMouseDownListner && prevMouseUpListner) {
                box.removeEventListener("mousedown", prevMouseDownListner);
                box.removeEventListener("mouseup", prevMouseUpListner);
            }
    
            box.addEventListener("mousedown", singleColorMouseDown);
            box.addEventListener("mouseup", singleColorMouseUp);
            prevMouseDownListner = singleColorMouseDown;
            prevMouseUpListner = singleColorMouseUp;
        }

        else if (mode === "select") {
            box.removeEventListener("mousedown", prevMouseDownListner);
            box.removeEventListener("mouseup", prevMouseUpListner);
            box.addEventListener("mousedown", chosenColorMouseDown);
            box.addEventListener("mouseup", chosenColorMouseUp);
            prevMouseDownListner = chosenColorMouseDown;
            prevMouseUpListner = chosenColorMouseUp;
        }

        else if (mode === "rainbow") {
            box.removeEventListener("mousedown", prevMouseDownListner);
            box.removeEventListener("mouseup", prevMouseUpListner);
            box.addEventListener("mousedown", rainbowMouseDown);
            box.addEventListener("mouseup", rainbowMouseUp);
            prevMouseDownListner = rainbowMouseDown;
            prevMouseUpListner = rainbowMouseUp;
        }

        else if (mode === "erase") {
            box.removeEventListener("mousedown", prevMouseDownListner);
            box.removeEventListener("mouseup", prevMouseUpListner);
            box.addEventListener("mousedown", eraseMouseDown);
            box.addEventListener("mouseup", eraseMouseUp);
            prevMouseDownListner = eraseMouseDown;
            prevMouseUpListner = eraseMouseUp;
        }

        else if (mode === "clear") {
            box.style.backgroundColor = "white";
            box.removeEventListener("mousedown", prevMouseDownListner);
            box.removeEventListener("mouseup", prevMouseUpListner);
            box.addEventListener("mousedown", eraseMouseDown);
            box.addEventListener("mouseup", eraseMouseUp);
            prevMouseDownListner = eraseMouseDown;
            prevMouseUpListner = eraseMouseUp;
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

