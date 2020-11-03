class ToDoItem {
    title:string;
    dueDate:Date;
    //isCompleted:boolean;
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
    date.innerText = item.dueDate.toDateString();
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