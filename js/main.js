var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
var CompletedItems = (function () {
    function CompletedItems() {
    }
    return CompletedItems;
}());
window.onload = function () {
    var addItem = document.getElementById("add-item");
    addItem.onclick = main;
    loadSavedItems();
};
function loadSavedItems() {
    var itemArray = getToDoItems();
    for (var i = 0; i < itemArray.length; i++) {
        console.log(itemArray[i]);
        displayToDoItem(itemArray[i]);
    }
    var itemArray2 = getCompleteItems();
    for (var i = 0; i < itemArray2.length; i++) {
        displayCompletedItem(itemArray2[i]);
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
    var completedItems = getById("complete");
    completedItems.appendChild(itemDiv);
    var title = itemDiv.firstChild.textContent;
    console.log(title);
    deleteObjectFromList(title);
    var completeItem = getComplete(itemDiv);
    saveComplete(completeItem);
}
function getComplete(itemDiv) {
    var completeItem = new CompletedItems;
    var title = itemDiv.firstChild;
    var date = title.nextElementSibling;
    console.log("testing " + date);
    completeItem.title = title.textContent;
    completeItem.dueDate = new Date(date.textContent);
    return completeItem;
}
function deleteObjectFromList(title) {
    var currentItems = getToDoItems();
    for (var i = 0; i < currentItems.length; i++) {
        if (currentItems[i].title == title) {
            currentItems.splice(i, 1);
        }
    }
    var currentItemsString = JSON.stringify(currentItems);
    localStorage.setItem(todokey, currentItemsString);
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
function setCompleteDate(completeItem) {
    var date = document.createElement("p");
    var dueDate = new Date(completeItem.dueDate.toString());
    date.innerText = dueDate.toDateString();
    return date;
}
function setTitle(item) {
    var text = document.createElement("h3");
    text.innerText = item.title;
    return text;
}
function displayCompletedItem(completeItem) {
    var text = setTitle(completeItem);
    var date = setCompleteDate(completeItem);
    var itemDiv = document.createElement("div");
    itemDiv.appendChild(text);
    itemDiv.appendChild(date);
    document.getElementById("complete").appendChild(itemDiv);
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
var completekey = "complete";
function getToDoItems() {
    var itemString = localStorage.getItem(todokey);
    var item = JSON.parse(itemString);
    return item;
}
function getCompleteItems() {
    var completedItemString = localStorage.getItem(completekey);
    var completedItems = JSON.parse(completedItemString);
    return completedItems;
}
function saveComplete(completeItem) {
    var completedItems = getCompleteItems();
    if (completedItems == null) {
        completedItems = new Array();
    }
    completedItems.push(completeItem);
    var completeItemsString = JSON.stringify(completedItems);
    localStorage.setItem(completekey, completeItemsString);
}
