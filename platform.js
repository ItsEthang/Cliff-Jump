const VEL = 0.005;
const MAX_VEL = 0.095;

export default class Platform {
    constructor(platElem) {
        this.platElem = platElem;
        this.reset();
    }

    //get left property value of the platform
    get left() {
        return parseFloat(getComputedStyle(this.platElem).getPropertyValue('--left'));
    }

    //set left property value of the platform
    set left(val) {
        this.platElem.style.setProperty('--left', val);
    }

    //This function returns the position properties' values
    rect() {
        return this.platElem.getBoundingClientRect();
    }  

    reset() {
        this.left = 50;
        this.direction = {x:-1};
        this.velocity = VEL;
    }
    
    //move the platform
    move(delta) {
        //random acceleration
        let accel = Math.random() / 250;
        //returns 1 or 0
        let coin = Math.round(Math.random());
        //reverse acceleration on 0
        if (coin == 0) {
            accel *= -1
        } 

        //update platform's position
        this.left -= this.direction.x * this.velocity * delta;
        //velocity should not exceed maximum velocity
        if (this.velocity + accel > MAX_VEL || this.velocity + accel < (MAX_VEL * -1)) {
            this.velocity += 0;
        } else {
            this.velocity += accel;
        }
        
        const rect = this.rect();
        //reverse the direction when platform hits the edges
        if (rect.right >= window.innerWidth || rect.left <= 0) {
            this.direction.x *= -1;
        }
    }

}