class Game {

    constructor(width, boxWidthPixel, image) {
        this.width = width;
        this.boxWidthPixel = boxWidthPixel;
        if (image === null) {
            this.grid = new GridDrawing(width, boxWidthPixel);
            this.areWeSolving = false;
        } else {
            this.grid = new GridSolving(width, boxWidthPixel, image);
            this.areWeSolving = true;
        }

        this.prevXPos = -1;
        this.prevYPos = -1;

        this.grid.setupNumberBoxes();
        this.grid.setupGrid();
    }

    mousePressed(firstOne) {

        if (firstOne) {
            let xPos = Math.floor(mouseX / this.boxWidthPixel);
            let yPos = Math.floor(mouseY / this.boxWidthPixel);

            if (xPos >= 0 && xPos < this.width &&
                yPos >= 0 && yPos < this.width) {
                this.grid.evaluateChange(xPos, yPos);
            }
        }
    }

    mouseClicked() {
        this.prevXPos = -1;
        this.prevYPos = -1;
        this.lockColumn = -1;
        this.lockRow = -1;
        this.grid.lockBlack = false;
        this.grid.lockWhite = false;
    }

    mouseDragged() {

        let xPos = Math.floor(mouseX / this.boxWidthPixel);
        let yPos = Math.floor(mouseY / this.boxWidthPixel);

        if (this.prevYPos === -1 && this.prevXPos === -1) {
            this.mousePressed(true);

        } else if (this.prevXPos !== xPos && this.prevYPos === yPos && this.lockColumn === -1 && (this.lockRow === -1 || this.lockRow === yPos)) {

            this.lockRow = yPos;
            if (xPos >= 0 && xPos < this.width &&
                yPos >= 0 && yPos < this.width) {
                this.grid.evaluateChange(xPos, yPos);
            }

        } else if (this.prevXPos === xPos && this.prevYPos !== yPos && this.lockRow === -1 && (this.lockColumn === -1 || this.lockColumn === xPos)) {

            this.lockColumn = xPos;
            if (xPos >= 0 && xPos < this.width &&
                yPos >= 0 && yPos < this.width) {
                this.grid.evaluateChange(xPos, yPos);
            }

        }
        this.prevXPos = xPos;
        this.prevYPos = yPos;
    }



}