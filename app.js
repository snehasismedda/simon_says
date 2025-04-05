let gamesequence = [];
let usersequence = [];

let btns = ["orange", "purple", "red", "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log('Game started');
        started = true;
        level = 0;
        gamesequence = [];
        usersequence = [];
        levelUp();
    }
});

let allbtns = document.querySelectorAll(".btn");

allbtns.forEach((btn) => {
    btn.addEventListener("click", btnpress);
});


function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 500);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 500);
}

function levelUp() {
    usersequence = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let btn= document.querySelector(`.${randColor}`);
    gamesequence.push(randColor);
    gameFlash(btn);

    //playSequence();
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        const color = gamesequence[i];
        const btn = document.querySelector(`.${color}`);
        gameFlash(btn);
        i++;
        if (i >= gamesequence.length) {
            clearInterval(interval);
        }
    }, 600); 
}



function btnpress() {
    let btn = this;
    userFlash(btn);

    let usercolor = btn.getAttribute("id");
    usersequence.push(usercolor);
    console.log("User sequence: ", usersequence);

    checkAns(usersequence.length - 1);
}

function checkAns(idx) {
    if (usersequence[idx] === gamesequence[idx]) {
        if (usersequence.length === gamesequence.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `GAME OVER! Your score was <b>${level - 1}</b><br>Press any key to restart`;
        document.querySelector("body").classList.add("game-over");
        setTimeout(() => {
            document.querySelector("body").classList.remove("game-over");
        }, 200);
        resetGame();
    }
}

function resetGame() {
    started = false;
    gamesequence = [];
    usersequence = [];
    level = 0;
}
