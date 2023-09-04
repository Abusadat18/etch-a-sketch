const container = document.querySelector(".flex-container");
const input = document.querySelector(".grid-size");
let numberOfSquare = 16;
const btns = document.querySelectorAll(".btn");
const getMode = document.querySelector(".active");
let mode = getMode.dataset.mode;
const colorPicker = document.querySelector(".colorPicker");
let colorChosen; 

input.addEventListener("input", getInput);

btns.forEach((item) => {
    item.addEventListener("click", activeBtn,false);
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
            box.addEventListener("mousedown", function () {
                box.style.backgroundColor = "black";
                boxes.forEach((item) => {
                    item.addEventListener("mouseover", setSingleColor);
                })
            })

            box.addEventListener("mouseup", function () {
                boxes.forEach((item) => {
                    item.removeEventListener("mouseover", setSingleColor);
                })
            })

            eventListenFunc = setSingleColor;
        }

        else if (mode === "select") {
            // boxes.forEach((item) => {
            //     item.removeEventListener("mouseover", eventListenFunc);
            // })

            box.addEventListener("mousedown", function () {
                box.style.backgroundColor = colorChosen;
                boxes.forEach((item) => {
                    item.addEventListener("mouseover", setChosenColor);
                })
            })

            box.addEventListener("mouseup", function () {
                boxes.forEach((item) => {
                    item.removeEventListener("mouseover", setChosenColor);
                })
            })

            eventListenFunc = setChosenColor;
            
        }

        else if (mode === "rainbow") {
            boxes.forEach((item) => {
                item.removeEventListener("mouseover", eventListenFunc);
            })

            box.addEventListener("mousedown", function () {
                box.style.backgroundColor = `${setRGB()}`;
                boxes.forEach((item) => {
                    item.addEventListener("mouseover", setRainbow);
                })
            })

            box.addEventListener("mouseup", function () {
                boxes.forEach((item) => {
                    item.removeEventListener("mouseover", setRainbow);
                })
            })

            eventListenFunc = setRainbow;
        }

        else if (mode === "erase") {
            box.addEventListener("mouseover", function () {
                box.style.backgroundColor = "white";
            })
        }

        else if (mode === "clear") {
            box.style.backgroundColor = "white";
        }

    })
}

function setSingleColor(e) {
    e.target.style.backgroundColor = "black";
}
 
function setChosenColor(e) {
    e.target.style.backgroundColor = colorChosen;
}

function setRainbow(e) {
    e.target.style.backgroundColor = `${setRGB()}`;
}


