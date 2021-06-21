"use strict";

const carrotSize = 80;
const carrotCount = 5;
const bugCount = 5;

const field = document.querySelector(".gameField");
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector(".gameButton");
const gameTimer = document.querySelector(".gameTimer");
const gameScore = document.querySelector(".gameScore");
const GameDurationSec = 5;

const popUp = document.querySelector(".popUp");
const popUpText = document.querySelector(".popUpMessage");
const popUpRefresh = document.querySelector(".popUpRefresh");

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener("click", onFieldClick);

gameBtn.addEventListener("click", () => {
    console.log("log");
    if (started) {
        stopGame();
    } else {
        startGame();
    }
});

popUpRefresh.addEventListener("click", () => {
    startGame();
    hidePopUp();
});

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound);
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    showPopUpWithText("Replay❓");
    playSound(alertSound);
    stopSound(bgSound);
}

function finishGame(win) {
    started = false;
    hideGameButton();
    if (win) {
        playSound(winSound);
    } else {
        playSound(bugSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    showPopUpWithText(win ? "YOU WIN✨" : "YOU LOSE💧");
}

function showStopButton() {
    const icon = gameBtn.querySelector(".fas");
    icon.classList.add("fas-stop");
    icon.classList.remove("fa-play");
    gameBtn.style.visibility = "visible";
}

function hideGameButton() {
    gameBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
    gameTimer.style.visibility = "visible";
    gameScore.style.visibility = "visible";
}

function startGameTimer() {
    let remainingTimeSec = GameDurationSec;
    updateTimeText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(carrotCount === score);
            return;
        }
        updateTimeText(--remainingTimeSec);
    }, 1000);
}

function stopGameTimer() {
    clearInterval(timer);
    hideGameButton();
    showPopUpWithText("Replay❓");
}

function updateTimeText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerHTML = `${minutes}:${seconds}`;
}

function showPopUpWithText(Text) {
    popUpText.innerHTML = Text;
    popUp.classList.remove("popUpHide");
}

function hidePopUp() {
    popUp.classList.add("popUpHide");
}

function initGame() {
    score = 0;
    field.innerHTML = "";
    gameScore.innerHTML = carrotCount;
    // 벌레와 당근을 생성한 뒤 field에 추가해줌

    addItem("carrot", carrotCount, "img/carrot.png");
    addItem("bug", bugCount, "img/bug.png");
}

function onFieldClick(event) {
    if (!started) {
        return;
    }
    const target = event.target;
    if (target.matches(".carrot")) {
        // 당근!!
        target.remove();
        score++;
        playSound(carrotSound);
        updateScoreBoard();
        if (score === carrotCount) {
            finishGame(true);
        }
    } else if (target.matches("bug")) {
        // 벌레!!

        finishGame(false);
    }
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}

function updateScoreBoard() {
    gameScore.innerHTML = carrotCount - score;
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - carrotSize;
    const y2 = fieldRect.height - carrotSize;
    for (let i = 0; i < count; i++) {
        const item = document.createElement("img");
        item.setAttribute("class", className);
        item.setAttribute("src", imgPath);
        item.style.position = "absolute";
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
