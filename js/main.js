var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addItem = document.getElementById("add-item");
    addItem.onclick = main;
};
function main() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
    }
}
function isValid() {
    return true;
}
function getToDoItem() {
    var item = new ToDoItem;
    item.title = getById("title").value;
    item.dueDate = new Date(getById("due-date").value);
    return item;
}
function displayToDoItem(item) {
    var text = setTitle(item);
    var date = setDate(item);
    var checkBox = setCheckBox();
    checkBox.onclick = markAsComplete;
    var dialogue = document.createElement("p");
    dialogue.innerText = "Check when completed";
    var itemDiv = document.createElement("div");
    itemDiv.classList.add("todo");
    itemDiv.appendChild(text);
    itemDiv.appendChild(date);
    itemDiv.appendChild(checkBox);
    itemDiv.appendChild(dialogue);
    document.getElementById("incomplete").appendChild(itemDiv);
}
function markAsComplete() {
    console.log(this);
    console.log(this.parentElement);
    var itemDiv = this.parentElement;
    itemDiv.classList.add("complete");
    console.log(itemDiv);
    var completedItems = getById("complete");
    console.log(completedItems);
    completedItems.appendChild(itemDiv);
}
function setCheckBox() {
    var checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.classList.add("checkbox");
    return checkBox;
}
function setDate(item) {
    var date = document.createElement("p");
    date.innerText = item.dueDate.toDateString();
    return date;
}
function setTitle(item) {
    var text = document.createElement("h3");
    text.innerText = item.title;
    return text;
}
function getById(id) {
    return document.getElementById(id);
}
