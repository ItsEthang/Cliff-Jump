import Jumper from './jumper.js'
import Platform from './platform.js'

const jumper = new Jumper(document.getElementById('jumper'));
const jumper2 = new Jumper(document.getElementById('jumper2'));
const platform = new Platform(document.getElementById('platform'));
//horizontal direction conditionals for the jumpers.
let lastTime;
//get the timespan between frames.



function update(time) {

    if (lastTime != null) {
        const delta = time - lastTime;
        //taking delay into account, 
        //then use it to update the objects' positions
        // jumper.fall(delta, [platform.rect()]);
        // jumper2.fall(delta, [platform.rect()]);
        if (jumper.rect().left <= jumper2.rect().right &&
            jumper.rect().right >= jumper2.rect().left &&
            jumper.rect().top <= jumper2.rect().bottom &&
            jumper.rect().bottom >= jumper2.rect().top) {

            //if they collide, change direction of velocity 
            if (Math.abs(jumper.strafeVel) > Math.abs(jumper2.strafeVel)) {


                jumper2.left += jumper.strafeVel * 150;

                // if ((jumper2.left + jumper.strafeVel * 200) > window.width) {
                //     jumper2.left = window.width - 40;
                // }
                // else if ((jumper2.left + jumper.strafeVel * 200) < 0) {
                //     jumper2.left = 0 + 40;
                // } else {
                //     jumper2.left += jumper.strafeVel * 200;
                // }
                // Bump(jumper2, jumper.strafeVel, delta, new Date().getTime(), 20);

            } else if (Math.abs(jumper2.strafeVel) > Math.abs(jumper.strafeVel)) {

                jumper.left += jumper2.strafeVel * 150;

                // if ((jumper.left + jumper2.strafeVel * 200) > window.width) {
                //     jumper.left = window.width - 40;
                // }
                // else if ((jumper.left + jumper2.strafeVel * 200) < 0) {
                //     jumper.left = 0 + 40;
                // } else {
                //     jumper.left += jumper2.strafeVel * 200;
                // }
                // Bump(jumper, jumper2.strafeVel, delta, new Date().getTime(), 20);


            } else {
                jumper.strafeVel *= -1;
                jumper2.strafeVel *= -1;
                // BothBumped(jumper, jumper2, delta, new Date().getTime(), 5000);
                jumper.left += jumper.strafeVel * 200;
                jumper2.left += jumper.strafeVel * 200;
            }

        }
        jumper.sway(delta, jumper2.rect());
        jumper2.sway(delta, jumper.rect());
        //platform.move(delta);

        //strafe();

        if (isLose()) {
            handleLose();
        }
    }

    lastTime = time;
    window.requestAnimationFrame(update);
}

function Bump(jumper, jumper2Vel, delta, start, duration) {
    var timer = delta;
    var runtime = timer - start;

    jumper.left += jumper2Vel * timer;
    if (runtime < duration) {
        requestAnimationFrame(function (time) { // call requestAnimationFrame again with parameters
            Bump(jumper, jumper2Vel, time, start, duration);
        })
        // Bump(jumperLeft, bounceVel, delta, duration);
    }
}

function BothBumped(jumper, jumper2, delta, start, duration) {
    var timer = delta;
    var runtime = timer - start;

    jumper.strafeVel *= -1;
    jumper2.strafeVel *= -1;
    jumper.left += jumper.strafeVel * timer;
    jumper2.left += jumper2.strafeVel * timer;
    if (runtime < duration) {
        requestAnimationFrame(function (time) { // call requestAnimationFrame again with parameters
            BothBumped(jumper, jumper2, time, start, duration);
        })
        // BothBumped(jumperLeft, jumper1Vel, jumper2Left, jumper2Vel, delta, duration);
    }
}



//if jumper hits the bottom, game over
function isLose() {
    const rect = jumper.rect();
    const rect2 = jumper2.rect();
    return rect.bottom >= window.innerHeight || rect2.bottom >= window.innerHeight;
}

function handleLose() {
    jumper.reset();
    jumper2.reset();
    platform.reset();
    console.log('game over');
}

//move the jumper left & right
// function strafe() {

// 	if(jumper.lefting && (jumper.rect().left > 0)) { 
// 		jumper.left -= STRAFE_SPD;
// 	}
// 	if(jumper.righting && (jumper.rect().right < window.innerWidth)) {
// 		jumper.left += STRAFE_SPD;	
// 	}
//     if(jumper2.lefting && (jumper2.rect().left > 0)) { 
// 		jumper2.left -= STRAFE_SPD;
// 	}
// 	if(jumper2.righting && (jumper2.rect().right < window.innerWidth)) {
// 		jumper2.left += STRAFE_SPD;	
// 	}

// }

document.onkeydown = function (e) {
    if (e.code == 'ArrowLeft') jumper.lefting = true;
    if (e.code == 'ArrowRight') jumper.righting = true;
    if (e.code == 'KeyA') jumper2.lefting = true;
    if (e.code == 'KeyD') jumper2.righting = true;
}

document.onkeyup = function (e) {
    if (e.code == 'ArrowLeft') jumper.lefting = false;
    if (e.code == 'ArrowRight') jumper.righting = false;
    if (e.code == 'KeyA') jumper2.lefting = false;
    if (e.code == 'KeyD') jumper2.righting = false;
}


window.requestAnimationFrame(update);