class Grid {

    constructor(width, boxWidthPixel, image) {
        this.width = width;
        this.board = [];
        this.rowNumbers = [];
        this.columnNumbers = [];
        this.rowNumbersResult = [];
        this.columnNumbersResult = [];
        this.boxWidthPixel = boxWidthPixel;
        this.maxNumbersInNumberBox = Math.ceil(width / 2);
        this.image = image;
        this.lockWhite = -1;
        this.lockBlack = -1;
    }

    // 0 -> white box
    // 1 -> black box
    // 2 -> sign "X"

    setupGrid() {
        for (let x = 0; x < this.width; x++) {
            let column = [];
            for (let y = 0; y < this.width; y++) {
                column.push(0);
                this.drawWhite(x, y);
                if (y === this.width-1) {
                    this.drawNumberBoxColumn(x, this.width);
                }
                if (x === this.width-1) {
                    this.drawNumberBoxRow(this.width, y);
                }
            }
            this.board.push(column);
        }
    }

    setupNumberBoxes() {
        for (let i = 0; i < this.width; i++) {
            this.rowNumbers.push([]);
            this.columnNumbers.push([]);
        }
        if (this.image !== null) {
            this.rowNumbersResult = this.image.rowNumbers;
            this.columnNumbersResult = this.image.columnNumbers;
        } else {
            this.rowNumbersResult = [];
            this.columnNumbersResult = [];
        }
    }

    evaluateRow(index) {
        let numbers = [];
        let sequence = 0;
        for (let i = 0; i < this.width; i++) {
            if (this.board[i][index]) {
                sequence += 1;
            } else {
                if (sequence > 0) {
                    numbers.push(sequence);
                }
                sequence = 0;
            }
            if (i === this.width-1 && sequence > 0) {
                numbers.push(sequence);
            }
        }
        this.rowNumbers[index] = numbers;
        return numbers;
    }

    evaluateColumn(index) {
        let numbers = [];
        let sequence = 0;
        for (let i = 0; i < this.width; i++) {
            if (this.board[index][i]) {
                sequence += 1;
            } else {
                if (sequence > 0) {
                    numbers.push(sequence);
                }
                sequence = 0;
            }
            if (i === this.width-1 && sequence > 0) {
                numbers.push(sequence);
            }
        }
        this.columnNumbers[index] = numbers;
        return numbers;
    }


    // change this.board[][] boolean to integer 0,1,2
    // 0 as white
    // 1 as black
    // 2 as X sign
    // create lock for X sign too

    evaluateChange(xPos, yPos) {
        if (this.board[xPos][yPos] && !this.lockBlack) {
            this.lockWhite = true;
            this.drawWhite(xPos, yPos);
            this.board[xPos][yPos] = false;
            this.evaluateRow(yPos);
            this.evaluateColumn(xPos);
            this.updateBoxes(xPos, yPos);

        } else if (!this.board[xPos][yPos] && !this.lockWhite) {
            this.lockBlack = true;
            this.drawBlack(xPos, yPos);
            this.board[xPos][yPos] = true;
            this.evaluateRow(yPos);
            this.evaluateColumn(xPos);
            this.updateBoxes(xPos, yPos);
        }
    }

    updateBoxes(x, y) {
        drawNumberBoxColumn(x, this.width);
        drawNumberBoxRow(this.width, y);
    }

    drawWhite(x, y) {
        fill(wht_clr);
        stroke(blk_clr);
        rect(x * this.boxWidthPixel, y * this.boxWidthPixel, this.boxWidthPixel, this.boxWidthPixel);
    }

    drawBlack(x, y) {
        fill(blk_clr);
        stroke(blk_clr);
        rect(x * this.boxWidthPixel, y * this.boxWidthPixel, this.boxWidthPixel, this.boxWidthPixel);
    }

    drawXSign(x, y) {
        fill(red_clr);
        stroke(blk_clr);
        rect(x * this.boxWidthPixel, y * this.boxWidthPixel, this.boxWidthPixel, this.boxWidthPixel);
    }

    drawNumberBoxRow(x, y) {
        fill(wht_clr);
        stroke(blk_clr);
        rect(x * this.boxWidthPixel, y * this.boxWidthPixel, this.maxNumbersInNumberBox * 16, this.boxWidthPixel);

        fill(blk_clr);
        stroke(blk_clr);
        textAlign(CENTER, CENTER);
        let textString = this.parseTextforBox(true, y);
        text(textString , x * this.boxWidthPixel, y * this.boxWidthPixel, this.maxNumbersInNumberBox * 16, this.boxWidthPixel);
    }

    drawNumberBoxColumn(x, y) {
        fill(wht_clr);
        stroke(blk_clr);
        rect(x * this.boxWidthPixel, y * this.boxWidthPixel, this.boxWidthPixel, this.maxNumbersInNumberBox * 16);

        fill(blk_clr);
        stroke(blk_clr);
        textAlign(CENTER, CENTER);
        let textString = this.parseTextforBox(false, x);
        text(textString, x * this.boxWidthPixel, y * this.boxWidthPixel, this.boxWidthPixel, this.maxNumbersInNumberBox * 16);
    }

    parseTextforBox(isHorizontal, index) {
        let stringResult = "";

        if (isHorizontal) {
            for (let i = 0; i < this.rowNumbers[index].length; i++) {
                if (i > 0) stringResult += "  ";
                stringResult += "" + this.rowNumbers[index][i] + "";
            }
        } else {
            for (let i = 0; i < this.columnNumbers[index].length; i++) {
                if (i > 0) stringResult += "\n";
                stringResult += "" + this.columnNumbers[index][i];
            }
        }
        return stringResult;
    }
}