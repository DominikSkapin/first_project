class MyStorage {
    constructor(name) {
        this.name = name;
        this.images = [];
    }

    saveImageToStorage(imageName, width, rowNumbers, columnNumbers) {
        let image = new MyImage(imageName, width, rowNumbers, columnNumbers);
        this.images = this.loadImagesFromStorage();

        console.log("pushing image to image storage \"" + this.name + "\" : ");
        console.log(image);
        this.images.push(image);

        console.log("all images in \"" + this.name + "\" : ");
        console.log(this.images);

        localStorage.setItem(this.name, JSON.stringify(this.images));
    }

    loadImagesFromStorage() {
        // console.log(JSON.parse(localStorage.getItem(IMAGE_STORAGE)));
        return JSON.parse(localStorage.getItem(this.name));
    }

    clearImageStorage() {
        localStorage.removeItem(this.name);
        this.images = [];
        console.log("cleared");
        console.log(JSON.parse(localStorage.getItem(this.name)));
    }
}