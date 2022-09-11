import Jumper from './jumper.js'
import Platform from './platform.js'

const STRAFE_SPD = 1;
const jumper = new Jumper(document.getElementById('jumper'));
const platform = new Platform(document.getElementById('platform'));
let lefting;
let righting;

let lastTime;
//get the timespan between frames.
function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime;
        //taking delay into account, 
        //then use it to update the objects' positions
        jumper.fall(delta, [platform.rect()]);
        platform.move(delta);
        move();

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
    return rect.bottom >= window.innerHeight;
}

function handleLose() {
    jumper.reset();
    platform.reset();
    console.log('game over');
}

//move the jumper left & right
function move() {
	
	if(lefting && (jumper.rect().left > 0)) { 
		jumper.left -= STRAFE_SPD;
	}
	if(righting && (jumper.rect().right < window.innerWidth)) {
		jumper.left += STRAFE_SPD;	
	}
	
}

document.onkeydown = function(e) {
	if(e.code == 'ArrowLeft') lefting = true;
	if(e.code == 'ArrowRight') righting = true;
}

document.onkeyup = function(e) {
	if(e.code == 'ArrowLeft') lefting = false;
	if(e.code == 'ArrowRight') righting = false;
}


window.requestAnimationFrame(update);