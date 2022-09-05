document.addEventListener('DOMContentLoaded', () => {
    //grabbing and creating elements.
    const grid = document.querySelector('.grid');
    const startBtn = document.querySelector('.startBtn');
    const jumper = document.createElement('div');
    //game over? 
    let gameOver = false;
    //Jumper variables
    let jumperLeft;
    let jumperBtm;
    //trampolines
    let trampLeft;
    let trampCnt = 1;
    let tramps = [];
    //jumping and falling timers
    let jumping;
    let falling;
    
    function createJumper() {
        jumperLeft = Math.random() * 28;
        jumperBtm = 46.5;

        grid.appendChild(jumper);
        jumper.classList.add('jumper');
        jumper.style.left = jumperLeft + 'rem';
        jumper.style.bottom = jumperBtm + 'rem';
    }

    class Tramp {
        constructor() {
            //randomizing trampoline left distance
            this.left = Math.random() * 25;
            this.bottom = 0;
            this.visual = document.createElement('div');
            //Adding the trampoline to the grid
            const visual = this.visual;
            visual.classList.add('tramp');
            visual.style.left = this.left + 'rem';
            visual.style.bottom = this.bottom;
            grid.appendChild(visual);
        }
    }

    function createTramps() {
        for (let i = 0; i < trampCnt; i++) {
            let newTramp = new Tramp();
            tramps.push(newTramp);
        }
    }

    function moveTramps() {
        tramps.forEach(tramp => {
            setInterval(function () {
                trampLeft = Math.random() * 25;
                tramp.visual.style.left = trampLeft + 'rem';
            }, 1000)
        })
        
    }

    //BUG: if the jumper land on the overlapping trampolines, jump() 
    //function will be called many times!
    function jump() {
        //stop falling
        clearInterval(falling);

        jumping = setInterval(function() {
            jumperBtm += 1;
            jumper.style.bottom = jumperBtm + 'rem';
            //Once the jumper reach a certain height, it falls
            if (jumperBtm > 42) {
                fall();
            }
        }, 30);
    }

    function fall() {
        //stop jumping
        clearInterval(jumping);
        falling = setInterval(function() {
            jumperBtm -= 0.5;
            jumper.style.bottom = jumperBtm + 'rem';
            //once the jumper hits the bottom, game over
            if (jumperBtm <= 0) {
                Gg();
            }
            
            tramps.forEach(tramp => {
                //checking if the jumper land on the trampoline
                //BUG: Right now it is only checking the initial bottom and left value of the trampolines :(
                if (
                    (jumperBtm <= tramp.bottom + 1) &&
                    ((jumperLeft + 2) >= tramp.left) &&
                    (jumperLeft <= (tramp.left + 5))) {
                    console.log('landed');
                    jump();
                }
            })
        }, 30);
    }

    function control(e) {
 
        if (e.key == 'ArrowLeft') {
            moveLeft();
        } else if (e.key == 'ArrowRight') {
            moveRight();
        }
    }

    function moveLeft() {
        if (jumperLeft >= 0) {
            jumperLeft -= 2;
            jumper.style.left = jumperLeft + 'rem';
        }
    }

    function moveRight() {
        if (jumperLeft <= 28) {
            jumperLeft += 2;
            jumper.style.left = jumperLeft + 'rem';
        }
    }

    function Gg() {
        gameOver = true;
        console.log('game over');
        clearInterval(falling);
        clearInterval(jumping);
    }

    function start() {
        if (!gameOver) {
            startBtn.style.display = 'none';
            createJumper();
            createTramps();
            moveTramps();
            fall();
            document.addEventListener('keydown', control);
        }
    }
    startBtn.addEventListener('click', start);
    //start();
})