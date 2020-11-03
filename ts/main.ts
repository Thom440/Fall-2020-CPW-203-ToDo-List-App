class ToDoItem {
    title:string;
    dueDate:Date;
    isCompleted:boolean;
}

window.onload = function() {
    let addItem = document.getElementById("add-item");
    addItem.onclick = main;
}

function main() {
    if (isValid()) {
        let item = getToDoItem();
        if (item.isCompleted) {
            displayCompletedItem(item);
        }
        else {
            displayToDoItem(item);
        }
        
    }
}

/**
 * Check form data is valid
 */
function isValid():boolean {
    return true;
}

/**
 * Get all input off form and wrap in a ToDoItem object
 */
function getToDoItem():ToDoItem {
    let item = new ToDoItem;
    item.title = getById("title").value;
    item.dueDate = new Date(getById("due-date").value);
    item.isCompleted = getById("is-complete").checked;
    return item;
}

/**
 * Display ToDoItem on webpage
 */
function displayToDoItem(item:ToDoItem):void {
    let text = setTitle(item);

    let date = setDate(item);

    let checkBox = setCheckBox();

    let dialogue = document.createElement("p");
    dialogue.innerText = "Check when completed";

    let itemDiv = document.createElement("div");
    // if (item.isCompleted) {
    //     itemDiv.classList.add("completed");
    // }

    itemDiv.appendChild(text);
    itemDiv.appendChild(date);
    itemDiv.appendChild(checkBox);
    itemDiv.appendChild(dialogue);

    document.getElementById("incomplete").appendChild(itemDiv);

}

function setCheckBox() {
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.classList.add("checkbox");
    return checkBox;
}

function setDate(item: ToDoItem) {
    let date = document.createElement("p");
    date.innerText = item.dueDate.toDateString();
    return date;
}

function setTitle(item: ToDoItem) {
    let text = document.createElement("h3");
    text.innerText = item.title;
    return text;
}

function displayCompletedItem(item:ToDoItem):void {
    let text = setTitle(item);

    let date = setDate(item);

    let itemDiv = document.createElement("div");

    itemDiv.appendChild(text);
    itemDiv.appendChild(date);

    document.getElementById("complete").appendChild(itemDiv);
}

function getById(id):HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}

// Task: Allow user to mark item complete
// Store items in web storage