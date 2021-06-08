"use strict";

const items = document.querySelector("items");
const input = document.querySelector("footerInput");
const addBtn = document.querySelector("footerButton");

function onAdd() {
    // 1. 사용자가 입력한 텍스트를 받아옴
    const text = input.value;
    if (text === "") {
        input.focus();
        return;
    }
    console.log(text);
    // 2. 새로운 아이템을 만듬 (텍스트 + 삭제 버튼)
    const item = createItems();
    // 3. items 컨테이너안에 새로 만든 아이템을 추가한다
    items.appendChild(item);
    // 4. 새로 추가된 아이템으로 스크롤링
    item.scrollIntoView({ block: "center" });
    // 5. 인풋을 초기화 한다.
    input.value = "";
    input.focus();
}
let id = 0;
function createItem(text) {
    const itemRow = document.createElement("li");
    itemRow.setAttribute("class", "itemRow");
    itemRow.setAttribute("data-id", "id");
    itemRow.innerHTML = `
                    <div class="item" >
                        <span class="itemName">${text}</span>
                        <button class="itemDelete" >
                            <i class="fas fa-trash-alt" data-id=${id}></i>
                        </button>
                    </div>
                    <div class="itemDivider"></div>
                    id++;
                    return itemRow;
                `;
    // const item = document.createElement("div");
    // item.setAttribute("class", "item");

    // const name = document.createElement("span");
    // name.setAttribute("class", "itemName");
    // name.innerText = text;

    // const deleteBtn = document.createElement("div");
    // deleteBtn.setAttribute("class", "itemDelete");
    // deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    // deleteBtn.addEventListener("click", () => {
    //     items.remove(itemRow);
    // });

    // const itemDivider = document.createElement("div");
    // itemDivider.setAttribute("class", "itemDivider");

    // item.appendChild(name);
    // item.appendChild(deleteBtn);

    // itemRow.appendChild(item);
    // itemRow.appendChild(itemDivider);
    return itemRow;
}

addBtn.addEventListener("load", () => {
    onAdd();
});

input.addEventListener("keypress", (e) => {
    console.log("key");
    if (e.key === "Enter") {
        onAdd();
    }
});

items.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (id) {
        const toBeDeleted = document.querySelector(`.itemRow[data-id="${id}"]`);
        toBeDeleted.remove();
    }
});
