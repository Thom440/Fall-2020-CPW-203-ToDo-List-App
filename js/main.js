var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addItem = document.getElementById("add-item");
    addItem.onclick = main;
    loadSavedItems();
};
function loadSavedItems() {
    var itemArray = getToDoItems();
    for (var i = 0; i < itemArray.length; i++) {
        displayToDoItem(itemArray[i]);
    }
}
function main() {
    clearSpans();
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
    }
}
function clearSpans() {
    var title = getById("title");
    title.nextElementSibling.innerHTML = "*";
    var date = getById("due-date");
    date.nextElementSibling.innerHTML = "*";
}
function isValid() {
    var isValid = true;
    if (!validateTitle()) {
        isValid = false;
    }
    if (!validateDate()) {
        isValid = false;
    }
    return isValid;
}
function validateTitle() {
    var title = getById("title");
    var todoTitle = title.value;
    if (todoTitle.trim() == "") {
        title.nextElementSibling.innerHTML = "Title is Required";
        return false;
    }
    return true;
}
function validateDate() {
    var date = getById("due-date");
    var dueDate = date.value;
    var pattern = /[A-Za-z]{3} [A-Za-z]{3} \d{2} \d{4}/;
    console.log(pattern.test(dueDate));
    if (pattern.test(dueDate)) {
        return true;
    }
    else {
        date.nextElementSibling.innerHTML = "Use drop down calendar to enter date";
        return false;
    }
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
    var dueDate = new Date(item.dueDate.toString());
    date.innerText = dueDate.toDateString();
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
function saveToDo(item) {
    var currentItems = getToDoItems();
    if (currentItems == null) {
        currentItems = new Array();
    }
    currentItems.push(item);
    var currentItemsString = JSON.stringify(currentItems);
    localStorage.setItem(todokey, currentItemsString);
}
var todokey = "todo";
function getToDoItems() {
    var itemString = localStorage.getItem(todokey);
    var item = JSON.parse(itemString);
    return item;
}
