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
        if (item.isCompleted) {
            displayCompletedItem(item);
        }
        else {
            displayToDoItem(item);
        }
    }
}
function isValid() {
    return true;
}
function getToDoItem() {
    var item = new ToDoItem;
    item.title = getById("title").value;
    item.dueDate = new Date(getById("due-date").value);
    item.isCompleted = getById("is-complete").checked;
    return item;
}
function displayToDoItem(item) {
    var text = setTitle(item);
    var date = setDate(item);
    var checkBox = setCheckBox();
    var dialogue = document.createElement("p");
    dialogue.innerText = "Check when completed";
    var itemDiv = document.createElement("div");
    itemDiv.appendChild(text);
    itemDiv.appendChild(date);
    itemDiv.appendChild(checkBox);
    itemDiv.appendChild(dialogue);
    document.getElementById("incomplete").appendChild(itemDiv);
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
function displayCompletedItem(item) {
    var text = setTitle(item);
    var date = setDate(item);
    var itemDiv = document.createElement("div");
    itemDiv.appendChild(text);
    itemDiv.appendChild(date);
    document.getElementById("complete").appendChild(itemDiv);
}
function getById(id) {
    return document.getElementById(id);
}
