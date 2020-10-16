let red_clr;
let blk_clr;
let wht_clr;
let rowLength;
let boxWidth = 50;
let board;
let boxesRows;
let boxesColumns;
let prevXPos;
let prevYPos;
let mouseClickEnabled = true;
let mouseDragEnabled = false;
let startGameButtonDiv;
let lengthInputDiv;
let gameHeaderDiv;
let widthPDiv;
let saveImageButtonDiv;
let mouseDraggedRadioDiv;

function setup() {

    startGameButtonDiv = document.getElementById("start_game_button");
    gameStartDiv = document.getElementById("game_start");
    canvasDiv = document.getElementById("canvas");
    lengthInputDiv = document.getElementById("length_input");
    gameHeaderDiv = document.getElementById("game_header");
    widthPDiv = document.getElementById("width_p");
    saveImageButtonDiv = document.getElementById("save_image");
    mouseDraggedRadioDiv = document.getElementById("mouse_dragged_radio");

    startGameButtonDiv.addEventListener("click", setupGame);
    saveImageButtonDiv.addEventListener("click", saveImage);
}

function setupGame() {

    gameHeaderDiv.style.display = "block";
    gameStartDiv.style.display = "none";
    canvasDiv.style.display = "block";
    gameHeaderDiv.style.display = "block";

    if (lengthInputDiv.value != null && lengthInputDiv.value > 3) {
        rowLength = lengthInputDiv.value;
    }
    else if (lengthInputDiv.value > 30) {
        rowLength = 30;
    } else {
        rowLength = 15;
    }
    widthPDiv.innerHTML = "Grid width: " + rowLength;

    if (mouseDraggedRadioDiv.checked) {
        mouseDragEnabled = true;
        mouseClickEnabled = false;
    } else {
        mouseDragEnabled = false;
        mouseClickEnabled = true;
    }

    let gameCanvas = createCanvas((rowLength + 3) * boxWidth, (rowLength + 3) * boxWidth);
    gameCanvas.parent(canvasDiv);

    red_clr = color(122, 122, 122);
    blk_clr = color(0);
    wht_clr = color(255);
    background(255);
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

function mouseClicked() {

    if (mouseClickEnabled) {
        let xPos = Math.floor(mouseX / boxWidth);
        let yPos = Math.floor(mouseY / boxWidth);

        if (xPos >= 0 && xPos < rowLength &&
            yPos >= 0 && yPos < rowLength) {
            evaluateChange(xPos, yPos);
        }
    }
}

function mouseDragged() {

    if (mouseDragEnabled) {
        let xPos = Math.floor(mouseX / boxWidth);
        let yPos = Math.floor(mouseY / boxWidth);

        if (prevXPos !== xPos || prevYPos !== yPos) {

        if (xPos >= 0 && xPos < rowLength &&
            yPos >= 0 && yPos < rowLength) {
            evaluateChange(xPos, yPos);
        }
    }
    prevXPos = xPos;
    prevYPos = yPos;
    }
}

function evaluateChange(xPos, yPos) {
    if (board[xPos][yPos]) {
        drawWhite(xPos, yPos);
        board[xPos][yPos] = false;
        evaluateRow(yPos);
        evaluateColumn(xPos);
        updateBoxes(xPos, yPos);
    } else {
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
    rect(x * boxWidth, y * boxWidth, boxWidth * 3, boxWidth);
    fill(blk_clr);
    stroke(blk_clr);
    textAlign(CENTER, CENTER);
    let textString = parseTextforBox(true, y);
    text(textString , x * boxWidth, y * boxWidth, boxWidth * 3, boxWidth);
    this.clicked = false;
}

function drawNumberBoxColumn(x, y) {

    fill(wht_clr);
    stroke(blk_clr);
    rect(x * boxWidth, y * boxWidth, boxWidth, boxWidth * 3);
    fill(blk_clr);
    stroke(blk_clr);
    textAlign(CENTER, CENTER);
    let textString = parseTextforBox(false, x);
    text(textString, x * boxWidth, y * boxWidth, boxWidth, boxWidth * 3);
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
}