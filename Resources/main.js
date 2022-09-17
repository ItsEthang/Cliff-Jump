import Jumper from './jumper.js'
import Platform from './platform.js'

const STRAFE_SPD = 1;
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
        //jumper.fall(delta, [platform.rect()]);
        //jumper2.fall(delta, [platform.rect()]);
        jumper.sway(delta, jumper2.rect());
        jumper2.sway(delta, jumper.rect());
        //platform.move(delta);
        //move();

        if (isLose()) {
            handleLose();
        }
    }

    lastTime = time;
    window.requestAnimationFrame(update);
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

document.onkeydown = function(e) {
	if(e.code == 'ArrowLeft') jumper.lefting = true;
	if(e.code == 'ArrowRight') jumper.righting = true;
    if(e.code == 'KeyA') jumper2.lefting = true;
	if(e.code == 'KeyD') jumper2.righting = true;
}

document.onkeyup = function(e) {
	if(e.code == 'ArrowLeft') jumper.lefting = false;
	if(e.code == 'ArrowRight') jumper.righting = false;
    if(e.code == 'KeyA') jumper2.lefting = false;
	if(e.code == 'KeyD') jumper2.righting = false;
}


window.requestAnimationFrame(update);