class Photo{
    constructor(){
        this.w = 520;
        this.h = 390;
    }

    photo_setup(){
        createImage(520, 390);
    }

    photo_draw(){
        image(this, 0, 0, this.w, this.h);
        tint(170);
    }

}