"use strict";
import { Field, ItemType } from "./field.js";
import * as sound from "./sound.js";

export class GameBuilder {
    gameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }

    carrotCount(num) {
        this.carrotCount = num;
        return this;
    }

    bugCount(num) {
        this.bugCount = num;
        return this;
    }

    build() {
        return new Game(
            this.gameDuration, //
            this.carrotCount,
            this.bugCount
        );
    }
}

export const Reason = Object.freeze({
    win: "win",
    lose: "lose",
    cancel: "cancel",
});

class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.field = new Field(this.carrotCount, this.bugCount);
        this.field.setItemClickListener((item) => this.onItemClick(item));
        this.timerIndicator = document.querySelector(".game__timer");
        this.scoreText = document.querySelector(".game__score");
        this.gameBtn = document.querySelector(".game__button");
        this.gameBtn.addEventListener("click", () => {
            if (this.started) {
                this.stop(Reason.cancel);
                sound.playAlert();
            } else {
                this.start();
            }
        });

        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }

    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }

    start() {
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground();
    }

    stop(reason) {
        this.started = false;
        this.hideStartButton();
        this.stopGameTimer();
        sound.stopBackground();
        if (reason === Reason.win) {
            sound.playWin();
        } else if (reason === Reason.lose) {
            sound.playLost();
        }
        this.onGameStop && this.onGameStop(reason);
    }

    initGame() {
        this.score = 0;
        this.updateScoreBoard(this.score);
        this.field.init();
    }

    onItemClick(item) {
        if (!this.started) {
            return;
        }
        if (item === ItemType.carrot) {
            this.score++;
            this.updateScoreBoard(this.score);

            if (this.score === this.carrotCount) {
                this.stop(Reason.win);
            }
        } else {
            this.stop(Reason.lose);
        }
    }

    startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);

        this.timer = setInterval(() => {
            if (remainingTimeSec <= 0) {
                clearInterval(this.timer);

                if (this.started) {
                    this.stop(
                        this.score === this.carrotCount
                            ? Reason.win
                            : Reason.lose
                    );
                }

                return;
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }

    stopGameTimer() {
        clearInterval(this.timer);
    }

    updateScoreBoard(newScore) {
        this.scoreText.innerText = this.carrotCount - newScore;
    }

    showStartButton() {
        const icon = this.gameBtn.querySelector(".fas");
        icon.classList.remove("fa-stop");
        this.gameBtn.style.visibility = "visible";
    }

    showStopButton() {
        const icon = this.gameBtn.querySelector(".fas");
        icon.classList.add("fa-stop");
        this.gameBtn.style.visibility = "visible";
    }

    hideStartButton() {
        this.gameBtn.style.visibility = "hidden";
    }

    showTimerAndScore() {
        this.timerIndicator.style.visibility = "visible";
        this.scoreText.style.visibility = "visible";
    }

    hideTimerAndScore() {
        this.timerIndicator.style.visibility = "hidden";
        this.scoreText.style.visibility = "hidden";
    }

    updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.timerIndicator.innerHTML = `${minutes}:${seconds}`;
    }

    resetScoreText() {
        this.scoreText.innerText = this.carrotCount;
    }
}
