let red_clr;
let blk_clr;
let wht_clr;
let n = 15;
let boxWidth = 50;
let board;
let boxesRows;
let boxesColumns;
let prevXPos;
let prevYPos;

function setup() {
    red_clr = color(122, 122, 122);
    blk_clr = color(0);
    wht_clr = color(255);
    background(255);
    createCanvas((n + 3) * boxWidth, (n + 3) * boxWidth);

    board = [];
    setupNumberBoxes();

    for (let x = 0; x < n; x++) {
        let column = [];
        for (let y = 0; y < n; y++) {
            drawWhite(x, y);
            column.push(false);
            if (y === n-1) {
                drawNumberBoxColumn(x, n);
            }
            if (x === n-1) {
                drawNumberBoxRow(n, y);
            }
        }
        board.push(column);
    }

}

function mouseClicked() {
    let xPos = Math.floor(mouseX / boxWidth);
    let yPos = Math.floor(mouseY / boxWidth);

    if (xPos >= 0 && xPos < n &&
        yPos >= 0 && yPos < n) {
        evaluateChange(xPos, yPos);
    }
}

function mouseDragged() {
    let xPos = Math.floor(mouseX / boxWidth);
    let yPos = Math.floor(mouseY / boxWidth);

    if (prevXPos !== xPos || prevYPos !== yPos) {

        if (xPos >= 0 && xPos < n &&
            yPos >= 0 && yPos < n) {
            evaluateChange(xPos, yPos);
        }
    }

    prevXPos = xPos;
    prevYPos = yPos;
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

// function updateBoxes(x, y, num) {
//     boxesColumns[x] += num;
//     boxesRows[y] += num;
//     drawNumberBoxColumn(x, n);
//     drawNumberBoxRow(n, y);
//
// }

function updateBoxes(x, y) {
    drawNumberBoxColumn(x, n);
    drawNumberBoxRow(n, y);

}

function evaluateRow(index) {
    let numbers = [];
    let sequence = 0;
    for (let i = 0; i < n; i++) {
        if (board[i][index]) {
            sequence += 1;
        } else {
            if (sequence > 0) {
                numbers.push(sequence);
            }
            sequence = 0;
        }
        if (i === n-1 && sequence > 0) {
            numbers.push(sequence);
        }
    }
    boxesRows[index] = numbers;
    // console.log("row: " + index + " ; " + boxesRows[index]);
}

function evaluateColumn(index) {
    let numbers = [];
    let sequence = 0;
    for (let i = 0; i < n; i++) {
        if (board[index][i]) {
            sequence += 1;
        } else {
            if (sequence > 0) {
                numbers.push(sequence);
            }
            sequence = 0;
        }
        if (i === n-1 && sequence > 0) {
            numbers.push(sequence);
        }
    }
    boxesColumns[index] = numbers;
    // console.log("column: " + index + " ; " + boxesColumns[index]);
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

    for (let i = 0; i < n; i++) {
        boxesColumns.push([]);
        boxesRows.push([]);
    }
}