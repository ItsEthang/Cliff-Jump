const VEL = 0.0015;
const ACCEL = 0.001;
const HORI_ACCEL = 0.0005;

export default class Jumper {
    constructor(jumperElem) {
        this.jumperElem = jumperElem;
        this.reset();
        this._lefting = false;
        this._righting = false;
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

    get lefting() {
        return this._lefting;
    }

    set lefting(val) {
        if (typeof val == "boolean"){
            this._lefting = val;
        } else {
            console.log("Non-boolean type.");
        }
    }

    get righting() {
        return this._righting;
    }

    set righting(val) {
        if (typeof val == "boolean"){
            this._righting = val;
        } else {
            console.log("Non-boolean type");
        }
    }



   //This function returns the position properties' values
   rect() {
    return this.jumperElem.getBoundingClientRect();
    }   

    reset() {
        this.top  = 0;
        this.direction = {y:-1};
        this.velocity = 0;
        this.strafeVel = 0;
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

    sway(delta, jumperRect) {
        //getting the position values
        const rect = this.rect();
        //update the jumper's horizontal position
        //only if the jumper is within frame.
   
        //strafing left
        if (this._lefting && rect.left > 0 && !this._righting) {
            this.strafeVel -= HORI_ACCEL;
            console.log(this.strafeVel);
            this.left += this.strafeVel * delta;
        }
        //strafing right
        if (this._righting && rect.right < window.innerWidth && !this._lefting) {
            this.strafeVel += HORI_ACCEL;
            console.log(this.strafeVel);
            this.left += this.strafeVel * delta;
        }

        if (!this._righting && !this.lefting) {
            this.strafeVel = 0;
        }

        if (this._righting && this._lefting && rect.left > 0 && rect.right < window.innerWidth) {
            const sign  = Math.sign(this.strafeVel);
            if (sign > 0) {
                this.strafeVel -= HORI_ACCEL;
                //this.left += this.strafeVel * delta;
            } 

            if (sign < 0) {
                this.strafeVel += HORI_ACCEL;
                //this.left += this.strafeVel * delta;
            }
        }
        
   
        // //check for platform collisions
        // if (Collision(jumperRect, rect)) {
        //     //decrease velocity to simulate absorbed impact
        //    this.velocity -= 0.001;
        //    //reverse the velocity on collision
        //    this.velocity *= -1;
        // }
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