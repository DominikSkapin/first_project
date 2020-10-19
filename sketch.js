//constants and global definitions
const IMAGE_STORAGE = "images";
let red_clr;
let blk_clr;
let wht_clr;
let rowLength;
let maxNumbersInRowColumn;
let boxWidth = 20;
let board;
let boxesRows;
let boxesColumns;
let prevXPos;
let prevYPos;
let lockRow;
let lockColumn;
let lockWhite;
let lockBlack;
let images;
let startGameButtonDiv;
let lengthInputDiv;
let gameHeaderDiv;
let widthPDiv;
let saveImageButtonDiv;
let loadImageButtonDiv;
let clearStorageButtonDiv;

function setup() {

    startGameButtonDiv = document.getElementById("start_game_button");
    gameStartDiv = document.getElementById("game_start");
    canvasDiv = document.getElementById("canvas");
    lengthInputDiv = document.getElementById("length_input");
    gameHeaderDiv = document.getElementById("game_header");
    widthPDiv = document.getElementById("width_p");
    saveImageButtonDiv = document.getElementById("save_image_button");
    loadImageButtonDiv = document.getElementById("load_image_button");
    clearStorageButtonDiv = document.getElementById("clear_storage_button");
    startGameButtonDiv.addEventListener("click", setupGame);
}

function setupGame() {

    if (loadImagesFromStorage() != null) {
        images = loadImagesFromStorage();
    } else {
        images = [];
    }

    gameHeaderDiv.style.display = "block";
    gameStartDiv.style.display = "none";
    canvasDiv.style.display = "block";
    gameHeaderDiv.style.display = "block";
    saveImageButtonDiv.addEventListener("click", saveImage);
    loadImageButtonDiv.addEventListener("click", loadImagesFromStorage);
    clearStorageButtonDiv.addEventListener("click", clearImageStorage);

    if (lengthInputDiv.value != null && lengthInputDiv.value > 3) {
        rowLength = parseInt(lengthInputDiv.value);
    }
    else if (lengthInputDiv.value > 30) {
        rowLength = 30;
    } else {
        rowLength = 15;
    }
    widthPDiv.innerHTML = "Grid width: " + rowLength;
    maxNumbersInRowColumn = Math.ceil(rowLength / 2);

    let gameCanvas = createCanvas((maxNumbersInRowColumn * 16) * boxWidth, (maxNumbersInRowColumn * 16) * boxWidth);
    gameCanvas.parent(canvasDiv);

    background(255);
    red_clr = color(255,99,71);
    blk_clr = color(0);
    wht_clr = color(255);
    prevXPos = -1;
    prevYPos = -1;
    board = [];
    setupNumberBoxes();

    for (let x = 0; x < rowLength; x++) {
        let column = [];
        for (let y = 0; y < rowLength; y++) {
            drawWhite(x, y);
            column.push(false);
            if (y === rowLength-1) {
                drawNumberBoxColumn(x, rowLength);
            }
            if (x === rowLength-1) {
                drawNumberBoxRow(rowLength, y);
            }
        }
        board.push(column);
    }

}

function mousePressed(firstOne) {

    if (firstOne) {
        let xPos = Math.floor(mouseX / boxWidth);
        let yPos = Math.floor(mouseY / boxWidth);

        if (xPos >= 0 && xPos < rowLength &&
            yPos >= 0 && yPos < rowLength) {
            evaluateChange(xPos, yPos);
        }
    }
}

function mouseClicked() {
    prevXPos = -1;
    prevYPos = -1;
    lockColumn = -1;
    lockRow = -1;
    lockBlack = false;
    lockWhite = false;
}

function mouseDragged() {

    let xPos = Math.floor(mouseX / boxWidth);
    let yPos = Math.floor(mouseY / boxWidth);

    if (prevYPos === -1 && prevXPos === -1) {
        mousePressed(true);

    } else if (prevXPos !== xPos && prevYPos === yPos && lockColumn === -1 && (lockRow === -1 || lockRow === yPos)) {

        lockRow = yPos;
        if (xPos >= 0 && xPos < rowLength &&
            yPos >= 0 && yPos < rowLength) {
            evaluateChange(xPos, yPos);
        }

    } else if (prevXPos === xPos && prevYPos !== yPos && lockRow === -1 && (lockColumn === -1 || lockColumn === xPos)) {

        lockColumn = xPos;
        if (xPos >= 0 && xPos < rowLength &&
            yPos >= 0 && yPos < rowLength) {
            evaluateChange(xPos, yPos);
        }

    }
    prevXPos = xPos;
    prevYPos = yPos;
}

function evaluateChange(xPos, yPos) {
    if (board[xPos][yPos] && !lockBlack) {
        if (lockRow === -1 && lockColumn === -1) {
            lockWhite = true;
        }
        drawWhite(xPos, yPos);
        board[xPos][yPos] = false;
        evaluateRow(yPos);
        evaluateColumn(xPos);
        updateBoxes(xPos, yPos);
    } else if (!board[xPos][yPos] && !lockWhite) {
        if (lockRow === -1 && lockColumn === -1) {
            lockBlack = true;
        }
        drawBlack(xPos, yPos);
        board[xPos][yPos] = true;
        evaluateRow(yPos);
        evaluateColumn(xPos);
        updateBoxes(xPos, yPos);
    }
}

function updateBoxes(x, y) {
    drawNumberBoxColumn(x, rowLength);
    drawNumberBoxRow(rowLength, y);

}

function evaluateRow(index) {
    let numbers = [];
    let sequence = 0;
    for (let i = 0; i < rowLength; i++) {
        if (board[i][index]) {
            sequence += 1;
        } else {
            if (sequence > 0) {
                numbers.push(sequence);
            }
            sequence = 0;
        }
        if (i === rowLength-1 && sequence > 0) {
            numbers.push(sequence);
        }
    }
    boxesRows[index] = numbers;
}

function evaluateColumn(index) {
    let numbers = [];
    let sequence = 0;
    for (let i = 0; i < rowLength; i++) {
        if (board[index][i]) {
            sequence += 1;
        } else {
            if (sequence > 0) {
                numbers.push(sequence);
            }
            sequence = 0;
        }
        if (i === rowLength-1 && sequence > 0) {
            numbers.push(sequence);
        }
    }
    boxesColumns[index] = numbers;
}

function drawWhite(x, y) {

    fill(red_clr);
    stroke(blk_clr);
    rect(x * boxWidth, y * boxWidth, boxWidth, boxWidth);
    this.clicked = false;
}

function drawBlack(x, y) {

    fill(blk_clr);
    stroke(blk_clr);
    rect(x * boxWidth, y * boxWidth, boxWidth, boxWidth);
    this.clicked = false;
}

function drawNumberBoxRow(x, y) {

    fill(wht_clr);
    stroke(blk_clr);
    rect(x * boxWidth, y * boxWidth, maxNumbersInRowColumn * 16, boxWidth);
    fill(blk_clr);
    stroke(blk_clr);
    textAlign(CENTER, CENTER);
    let textString = parseTextforBox(true, y);
    text(textString , x * boxWidth, y * boxWidth, maxNumbersInRowColumn * 16, boxWidth);
    this.clicked = false;
}

function drawNumberBoxColumn(x, y) {

    fill(wht_clr);
    stroke(blk_clr);
    rect(x * boxWidth, y * boxWidth, boxWidth, maxNumbersInRowColumn * 16);
    fill(blk_clr);
    stroke(blk_clr);
    textAlign(CENTER, CENTER);
    let textString = parseTextforBox(false, x);
    text(textString, x * boxWidth, y * boxWidth, boxWidth, maxNumbersInRowColumn * 16);
    this.clicked = false;
}

function parseTextforBox(isHorizontal, index) {

    let stringResult = "";

    if (isHorizontal) {
        for (let i = 0; i < boxesRows[index].length; i++) {
            if (i > 0) stringResult += "  ";
            stringResult += "" + boxesRows[index][i] + "";
        }
    } else {
        for (let i = 0; i < boxesColumns[index].length; i++) {
            if (i > 0) stringResult += "\n";
            stringResult += "" + boxesColumns[index][i];
        }
    }
    return stringResult;
}

function setupNumberBoxes() {

    boxesColumns = [];
    boxesRows = [];

    for (let i = 0; i < rowLength; i++) {
        boxesColumns.push([]);
        boxesRows.push([]);
    }
}

function saveImage() {
    let image = {
        name : "first_image",
        width : rowLength,
        rows : boxesRows,
        columns : boxesColumns
    };
    images.push(image);
    console.log("pushing image:");
    console.log(image);
    console.log("all images:");
    console.log(images);
    localStorage.setItem(IMAGE_STORAGE, JSON.stringify(images));
}

function loadImagesFromStorage() {
    console.log(JSON.parse(localStorage.getItem(IMAGE_STORAGE)));
    return JSON.parse(localStorage.getItem(IMAGE_STORAGE));
}

function clearImageStorage() {
    localStorage.clear();
    images = [];
    console.log("cleared");
    console.log(JSON.parse(localStorage.getItem(IMAGE_STORAGE)));
}