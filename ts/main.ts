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
        displayToDoItem(item);
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
    item.isCompleted = getById("complete").checked;
    return item;
}

/**
 * Display ToDoItem on webpage
 */
function displayToDoItem(item:ToDoItem):void {
    let text = document.createElement("h3");
    text.innerText = item.title;

    let date = document.createElement("p");
    date.innerText = item.dueDate.toDateString();

    let itemDiv = document.createElement("div");
    if (item.isCompleted) {
        itemDiv.classList.add("completed");
    }

    itemDiv.appendChild(text);
    itemDiv.appendChild(date);

    document.getElementById("incomplete").appendChild(itemDiv);

}

function getById(id):HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}

// Task: Allow user to mark item complete
// Store items in web storage