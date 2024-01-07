class Photo{
    constructor(){
        this.w = 625;
        this.h = 437;
        this.img = null;
    }

    photo_setup(){
        this.img = createImage(this.w, this.h);
    }

    photo_draw(){
        image(targetImage, 0, 0, this.w, this.h);
    }
}