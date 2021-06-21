"use strict";

import PopUp from "./popUp";
import Field from "./field";
import * as sound from "./sound";

const carrotCount = 20;
const bugCount = 20;
const GameDurationSec = 20;

const gameBtn = document.querySelector(".gameButton");
const gameTimer = document.querySelector(".gameTimer");
const gameScore = document.querySelector(".gameScore");

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
    startGame();
});

const gameField = new Field(carrotCount, bugCount);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
    if (!started) {
        return;
    }

    if (item === "carrot") {
        score++;
        updateScoreBoard();
        if (score === carrotCount) {
            finishGame(true);
        }
    } else if (item === "bug") {
        finishGame(false);
    }
}

field.addEventListener("click", onFieldClick);
gameBtn.addEventListener("click", () => {
    console.log("log");
    if (started) {
        stopGame();
    } else {
        startGame();
    }
});

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    sound.playBackground(bgSound);
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    gameFinishBanner.showWithText("Replay❓");
    sound.playAlert();
    sound.stopBackground();
}

function finishGame(win) {
    started = false;
    hideGameButton();
    if (win) {
        sound.playWin();
    } else {
        sound.playBug();
    }
    stopGameTimer();
    stopSound(bgSound);
    gameFinishBanner.showWithText(win ? "YOU WIN✨" : "YOU LOSE💧");
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

function initGame() {
    score = 0;
    gameScore.innerHTML = carrotCount;
    gameField.init();
}

function updateScoreBoard() {
    gameScore.innerHTML = carrotCount - score;
}
