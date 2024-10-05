//Todo Eleman Ekleme

//Eleman Seçimi

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
// const items = ["Todo 1","Todo 2","Todo 3","Todo 4","Todo 5"];
let todos;


//load items
loadItems();

eventListeners();
console.log(btnDeleteAll);

function eventListeners() {
    //submit
    form.addEventListener("submit", addNewItem);
    //delete a item
    taskList.addEventListener("click", deleteItem);
    btnDeleteAll.addEventListener("click", deleteAllItems);
}
function loadItems() {
    todos = getItemsFromLS();
    todos.forEach(function (item) {
        createItem(item);
    })
}
//get ıtems from local storage
function getItemsFromLS() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        //arraya dönüştürmek
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos;
}
// local storage veri gönderme kaydetmek
function setItemToLS(newTodo) {
    todo = getItemsFromLS();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function createItem(newTodo) {

    //li oluşturma
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    //liyi input alnaı girmeyi bağlamak
    li.appendChild(document.createTextNode(newTodo));

    // a oluştutmak
    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a);
    taskList.append(li);
}
function addNewItem(e) {
    if (input.value === '') {
        alert("add new item");

    }
    //create ıtem
    createItem(input.value);

    setItemToLS(input.value);


    input.value = "";
    e.preventDefault();
}
//element silme
function deleteItem(e) {
    //e tıklana ögeyi temsil eder
    if (e.target.className === "fas fa-times" && confirm("are you sure for delete")) {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    }
    e.preventDefault();
}

function deleteTodoFromStorage(deletetodo) {
    let todos = getItemsFromLS();

    todos.forEach(function (todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}
//tüm elemanları silmek
function deleteAllItems(e) {
    if (confirm("are you sure delete all items") && e.target.className === "btn btn-outline-primary btn-sm delete-all float-right") {
        // taskList.childNodes.forEach(function (item) {
        //     // console.log(item);
        //     if(item.nodeType === 1){
        //         item.remove();
        //     }
        // })
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();

    }
    //taskList.innerHTML="";
}
