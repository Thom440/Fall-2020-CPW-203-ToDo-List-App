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
    item.isCompleted = getById("complete").checked;
    return item;
}
function displayToDoItem(item) {
    var text = document.createElement("h3");
    text.innerText = item.title;
    var date = document.createElement("p");
    date.innerText = item.dueDate.toDateString();
    var itemDiv = document.createElement("div");
    if (item.isCompleted) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(text);
    itemDiv.appendChild(date);
    document.getElementById("incomplete").appendChild(itemDiv);
}
function getById(id) {
    return document.getElementById(id);
}
