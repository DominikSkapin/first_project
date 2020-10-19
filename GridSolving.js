class GridSolving {

    constructor(width, boxWidthPixel, image) {
        this.width = width;
        this.board = [];
        this.rowNumbers = [];
        this.columnNumbers = [];
        this.rowNumbersResult = [];
        this.columnNumbersResult = [];
        this.boxWidthPixel = boxWidthPixel;
        this.maxNumbersInNumberBox = maxNumbersInNumberBox;
        this.image = image;
    }

    // 0 -> white box
    // 1 -> black box
    // 2 -> cross sign 'X'

    setupGrid() {
        for (let x = 0; x < this.width; x++) {
            let column = [];
            for (let y = 0; y < this.width; y++) {
                column.push(0);
            }
            this.board.push(column);
        }
    }

    setupNumberBoxes() {
        for (let i = 0; i < this.width; i++) {
            this.rowNumbers.push([]);
            this.columnNumbers.push([]);
        }
        this.rowNumbersResult = this.image.rowNumbers;
        this.columnNumbersResult = this.image.columnNumbers;
    }

    //return true if result row and current row are the same

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
        return this.rowNumbers[index].equals(this.rowNumbersResult[index]);
    }

    //return true if result column and current column are the same

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
        return this.columnNumbers[index].equals(this.columnNumbersResult[index]);
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
            for (let i = 0; i < this.grid.ro[index].length; i++) {
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
}