"use strict";

export default class PopUp {
    constructor() {
        this.popUp = document.querySelector(".popUp");
        this.popUpText = document.querySelector(".popUpMessage");
        this.popUpRefresh = document.querySelector(".popUpRefresh");
        this.popUpRefresh.addEventLister("click", () => {
            this.onClick && this.onClick();
            this.hide();
        });
    }
    setClickLister(onClick) {
        this.onClick = onClick;
    }
    showWithText(Text) {
        this.popUpText.innerHTML = Text;
        this.popUp.classList.remove("popUpHide");
    }

    hide() {
        this.popUp.classList.add("popUpHide");
    }
}
