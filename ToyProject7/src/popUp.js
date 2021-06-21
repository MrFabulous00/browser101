"use strict";

export default class PopUp {
    constructor() {
        this.popUp = document.querySelector(".pop-up");
        this.popUpMessage = document.querySelector(".pop-up__message");
        this.popUpRefreshBtn = document.querySelector(".pop-up__refresh");

        this.popUpRefreshBtn.addEventListener("click", () => {
            this._hide();
            this.onClick && this.onClick();
        });
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }

    showWithText(text) {
        this.popUpMessage.innerText = text;
        this.popUp.classList.remove("hide");
    }

    _hide() {
        this.popUp.classList.add("hide");
    }
}
