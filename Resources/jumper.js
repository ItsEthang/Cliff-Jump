const VEL = 0.0015;
const ACCEL = 0.001;

export default class Jumper {
    constructor(jumperElem) {
        this.jumperElem = jumperElem;
        this.reset();
    }

    //get left property of the jumper
    get left() {
        return parseFloat(getComputedStyle(this.jumperElem).getPropertyValue('--left'));
    }

    //set left property of the jumper
    set left(val) {
        this.jumperElem.style.setProperty('--left', val);
    }

    //get top property of the jumper
    get top() {
        return parseFloat(getComputedStyle(this.jumperElem).getPropertyValue('--top'));
    }

    //set top property of the jumper
    set top(val) {
        this.jumperElem.style.setProperty('--top', val);
    }



   //This function returns the position properties' values
   rect() {
    return this.jumperElem.getBoundingClientRect();
    }   

    reset() {
        this.top  = 0;
        this.direction = {y:-1};
        this.velocity = VEL;
    }

    fall(delta, platformRects) {
        //update the jumper's vertical position
        this.top -= this.direction.y * this.velocity * delta;
        //acceleration to simulate gravity
        this.velocity += ACCEL;
        //getting the position values
        const rect = this.rect();

        //check for platform collisions
        if (platformRects.some(r => Collision(r, rect))) {
            //decrease velocity to simulate absorbed impact
           this.velocity -= 0.001;
           //reverse the velocity on collision
           this.velocity *= -1;
        }
    }

}

//check collision
function Collision(rect1, rect2) {
    return (
        rect1.left <= rect2.right && 
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
        );
}
