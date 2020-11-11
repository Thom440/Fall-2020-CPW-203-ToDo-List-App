class ToDoItem {
    title:string;
    dueDate:Date;
    //isCompleted:boolean;
}

class CompletedItems {
    title:string;
    dueDate:Date;
}

window.onload = function() {
    let addItem = document.getElementById("add-item");
    addItem.onclick = main;

    let clearCompleted = getById("clear-completed");
    clearCompleted.onclick = clearCompletedItems;

    // Load Saved Item
    loadSavedItems();
}

function clearCompletedItems() {
    let itemArray = getCompleteItems();
    if (itemArray.length > 0) {
        for (let i = itemArray.length - 1; i >= 0; i--) {
            itemArray.splice(i, 1);
        }
        let completeItemsString = JSON.stringify(itemArray);
        localStorage.setItem(completekey, completeItemsString);

        let parentDiv = getById("complete");
        while (parentDiv.hasChildNodes()) {
            parentDiv.removeChild(parentDiv.firstChild);
        }
    }
}

function loadSavedItems() {
    let itemArray = getToDoItems();
    for (let i = 0; i < itemArray.length; i++) {
        console.log(itemArray[i]);
        displayToDoItem(itemArray[i]);
    }
    let itemArray2 = getCompleteItems();
    for (let i = 0; i < itemArray2.length; i++) {
        displayCompletedItem(itemArray2[i]);
    }
    
}

function main() {
    clearSpans();

    if (isValid()) {
        let item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
        clearFields();
    }
}

function clearFields() {
    getById("title").value = "";
    getById("due-date").value = "";
}

function clearSpans() {
    let title = getById("title");
    title.nextElementSibling.innerHTML = "*";

    let date = getById("due-date");
    date.nextElementSibling.innerHTML = "*";
}

/**
 * Check form data is valid
 */
function isValid():boolean {
    let isValid = true;
    if (!validateTitle()) {
        isValid = false;
    }
    if (!validateDate()) {
        isValid = false;
    }
    return isValid;
}

function validateTitle():boolean {
    let title = getById("title");
    let todoTitle = title.value;

    if (todoTitle.trim() == "") {
        title.nextElementSibling.innerHTML = "Title is Required";
        return false;
    }
    return true;
}

function validateDate():boolean {
    let date = getById("due-date");
    let dueDate = date.value;
    let pattern = /[A-Za-z]{3} [A-Za-z]{3} \d{2} \d{4}/;
    console.log(pattern.test(dueDate));
    if (pattern.test(dueDate)) {
        return true;
    }
    else {
        date.nextElementSibling.innerHTML = "Use drop down calendar to enter date"
        return false;
    }
}

/**
 * Get all input off form and wrap in a ToDoItem object
 */
function getToDoItem():ToDoItem {
    let item = new ToDoItem;
    item.title = getById("title").value;
    item.dueDate = new Date(getById("due-date").value);
    //item.isCompleted = getById("is-complete").checked;
    return item;
}

/**
 * Display ToDoItem on webpage
 */
function displayToDoItem(item:ToDoItem):void {
    let text = setTitle(item);

    let date = setDate(item);

    let checkBox = setCheckBox();

    checkBox.onclick = markAsComplete;

    let dialogue = document.createElement("p");
    dialogue.innerText = "Check when completed";
    dialogue.classList.add("checkbox-text");

    let itemDiv = document.createElement("div");
    itemDiv.classList.add("todo");
    
    itemDiv.appendChild(text);
    itemDiv.appendChild(date);
    itemDiv.appendChild(checkBox);
    itemDiv.appendChild(dialogue);

    document.getElementById("incomplete").appendChild(itemDiv);

}

function markAsComplete() {
    let itemDiv = <HTMLElement>this.parentElement;
    
    let title = itemDiv.firstChild.textContent;
    
    deleteObjectFromList(title);

    let completeItem = getComplete(itemDiv);

    this.parentElement.remove();

    saveComplete(completeItem);
    displayCompletedItem(completeItem);
    
}

function getComplete(itemDiv) {
    let completeItem = new CompletedItems;
    let title = itemDiv.firstChild;
    let date = title.nextElementSibling;
    completeItem.title = title.textContent;
    completeItem.dueDate = new Date(date.textContent);
    // completeItem.dueDate = date;
    //item.isCompleted = getById("is-complete").checked;
    return completeItem;
}

function deleteObjectFromList(title: string) {
    let currentItems = getToDoItems();
    for (let i = 0; i < currentItems.length; i++) {
        if (currentItems[i].title == title) {
            currentItems.splice(i, 1);
        }
    }
    let currentItemsString = JSON.stringify(currentItems);
    localStorage.setItem(todokey, currentItemsString);
}

function setCheckBox() {
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.classList.add("checkbox");
    return checkBox;
}

function setDate(item: ToDoItem) {
    let date = document.createElement("p");
    // date.innerText = item.dueDate.toDateString();
    let dueDate = new Date(item.dueDate.toString());
    date.innerText = dueDate.toDateString();
    return date;
}

function setCompleteDate(completeItem:CompletedItems) {
    let date = document.createElement("p");
    let dueDate = new Date(completeItem.dueDate.toString());
    date.innerText = dueDate.toDateString();
    return date;
}

function setTitle(item: ToDoItem) {
    let text = document.createElement("h3");
    text.innerText = item.title;
    return text;
}

function displayCompletedItem(completeItem:CompletedItems):void {
    let text = setTitle(completeItem);

    let date = setCompleteDate(completeItem);
    

    let itemDiv = document.createElement("div");

    itemDiv.appendChild(text);
    itemDiv.appendChild(date);

    document.getElementById("complete").appendChild(itemDiv);
}

function getById(id):HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}
// Store items in web storage

function saveToDo(item:ToDoItem):void {
    let currentItems = getToDoItems();
    if (currentItems == null) {
        currentItems = new Array();
    }
    currentItems.push(item); // Add new item to the currentItems list

    let currentItemsString = JSON.stringify(currentItems);
    localStorage.setItem(todokey, currentItemsString);
}

const todokey = "todo";
const completekey = "complete"

/**
 * Get stored ToDo items or return null if none are found
 */
function getToDoItems():ToDoItem[] {
    let itemString = localStorage.getItem(todokey);
    let item:ToDoItem[] = JSON.parse(itemString);
    return item;
}

function getCompleteItems():CompletedItems[] {
    let completedItemString = localStorage.getItem(completekey);
    let completedItems:CompletedItems[] = JSON.parse(completedItemString);
    return completedItems;
}

function saveComplete(completeItem:CompletedItems):void {
    let completedItems = getCompleteItems();
    if (completedItems == null) {
        completedItems = new Array();
    }
    completedItems.push(completeItem);

    let completeItemsString = JSON.stringify(completedItems);
    localStorage.setItem(completekey, completeItemsString);
}