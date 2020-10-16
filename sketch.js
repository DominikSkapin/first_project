let red_clr;
let blk_clr;
let n = 15;
let boxWidth = 50;
let board;

function setup() {
    red_clr = color(122, 122, 122);
    blk_clr = color(0, 0, 0);
    background(255);
    createCanvas(n * boxWidth, n * boxWidth);

    board = [];

    for (let x = 0; x < n; x++) {
        let column = [];
        for (let y = 0; y < n; y++) {
            drawWhite(x, y);
            column.push(false);
        }
        board.push(column);
    }

}

function mouseClicked() {
    let xPos = Math.floor(mouseX / boxWidth);
    let yPos = Math.floor(mouseY / boxWidth);

    if (xPos >= 0 && xPos < n * boxWidth &&
        yPos >= 0 && yPos < n * boxWidth) {
        if (board[xPos][yPos]) {
            drawWhite(xPos, yPos);
            board[xPos][yPos] = false;
        } else {
            drawBlack(xPos, yPos);
            board[xPos][yPos] = true;
        }
    }
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