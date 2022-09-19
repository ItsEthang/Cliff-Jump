const VEL = 0.0015;
const ACCEL = 0.001;
const HORI_ACCEL = 0.002;

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
        //note: use this to compare player's strafe velocity for bouncing mechanic.
        //note: use the difference between the strafe velocity to decide which player reverse direction.
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
        //setting overflow limit
        const ovfLimit = parseFloat(getComputedStyle(this.jumperElem).getPropertyValue('--width'))/2;
        //update the jumper's horizontal position
        //only if the jumper is within frame.
        //strafing left
        if (this._lefting && rect.left > 0 && !this._righting) {
            //resetting the strafe speed
            if (this.strafeVel > 0) {
                this.strafeVel = 0;
            }
            this.strafeVel -= HORI_ACCEL;
            //console.log(this.strafeVel);
            if ((this.left + this.strafeVel * delta) >= ovfLimit) {
                this.left += this.strafeVel * delta;
                console.log(`movLeft Pos ${this.left}`);
            } else {
                this.left = 2;
                console.log(`movleft endPos ${this.left}`);
            }
            
        }
        //strafing right
        if (this._righting && rect.right < window.innerWidth && !this._lefting) {
            //resetting the strafe speed
            if (this.strafeVel < 0) {
                this.strafeVel = 0;
            }
            this.strafeVel += HORI_ACCEL;
            //console.log(this.strafeVel);
            if ((this.left + this.strafeVel * delta) <= (window.innerWidth * 0.98)) {
                this.left += this.strafeVel * delta;
                console.log(`movRight Pos ${this.left}`);
            } else {
                this.left = window.innerWidth * 0.98;
                console.log(`movRight endPos ${this.left}`);
            } 
        }
        //no control is pressed
        if ((!this._righting && !this.lefting)) {
            this.strafeVel = 0;
        }
        //when both left and right controls are pressed, deceleration
        if (this._righting && this._lefting && rect.left > 0 && rect.right < window.innerWidth) {
            const sign  = Math.sign(this.strafeVel);
            if (sign > 0) {
                this.strafeVel -= HORI_ACCEL;
                //this.left += this.strafeVel * delta;
                this.left += this.strafeVel * delta;
                console.log(`decelVel ${this.strafeVel}`);
            } 

            if (sign < 0) {
                this.strafeVel += HORI_ACCEL;
                //this.left += this.strafeVel * delta;
                this.left += this.strafeVel * delta;
                console.log(`decelVel ${this.strafeVel}`);
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