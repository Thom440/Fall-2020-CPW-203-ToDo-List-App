class ToDoItem {
    title:string;
    dueDate:Date;
    //isCompleted:boolean;
}

window.onload = function() {
    let addItem = document.getElementById("add-item");
    addItem.onclick = main;

    // Load Saved Item
    loadSavedItem();
}

function loadSavedItem() {
    let item = getToDo();
    displayToDoItem(item);
}

function main() {
    clearSpans();

    if (isValid()) {
        let item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
    }
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

    let itemDiv = document.createElement("div");
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
    let itemDiv = <HTMLElement>this.parentElement;
    itemDiv.classList.add("complete");
    console.log(itemDiv);

    let completedItems = getById("complete");
    console.log(completedItems);
    completedItems.appendChild(itemDiv);
    
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

function setTitle(item: ToDoItem) {
    let text = document.createElement("h3");
    text.innerText = item.title;
    return text;
}

// function displayCompletedItem(item:ToDoItem):void {
//     let text = setTitle(item);

//     let date = setDate(item);

//     let itemDiv = document.createElement("div");

//     itemDiv.appendChild(text);
//     itemDiv.appendChild(date);

//     document.getElementById("complete").appendChild(itemDiv);
// }

function getById(id):HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}
// Store items in web storage

function saveToDo(item:ToDoItem):void {
    // Convert ToDoItem into JSON string
    let itemString = JSON.stringify(item);

    // Save string
    localStorage.setItem(todokey, itemString);
}

const todokey = "todo";

/**
 * Get stored ToDo item or return null if none is found
 */
function getToDo():ToDoItem {
    let itemString = localStorage.getItem(todokey);
    let item:ToDoItem = JSON.parse(itemString);
    return item;
}