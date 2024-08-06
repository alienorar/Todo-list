let todos = [{
    id: 1,
    todo: "uxlash",
    createdAt: "data",
    isCompleted: false,

},]

const tBody = document.querySelector("tbody")
const elText = document.querySelector(".name_inpt")
const elBtn = document.querySelector("#btn")
const elForm = document.querySelector("form")

elBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    console.log(elText.value);
    const date = new Date()
    let createdAt = date.getFullYear() + "+" + date.getMonth() + "+" + date.getDate() + "+" + date.getHours() + ":" + date.getMinutes()
    let newTodos = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        todo: elText.value,
        createdAt: createdAt,
        isCompleted: false,
    }
    todos.push(newTodos)
    domgachiqarator(todos)
    elForm.reset()
})

function domgachiqarator(todo = []) {
    tBody.innerHTML = ""
    todo.forEach((todo) => {
        tBody.innerHTML +=
            `<tr>
        <td>${todo.todo}</td>
        <td>${todo.createdAt}</td>
        <td class = "text-right pr-4">
        <button id="${todo.id}" class ="edit py-1 px-3 bg-orange-700 rounded -[10px] text-white">Edit</button>
        <button id="${todo.id}" class ="edit py-1 px-3 bg-orange-700 rounded -[10px] text-white">Delete</button>
        </td>
        
        </tr>`
    })
    !todos.length ? tBody.innerHTML = "todolar yuq 😒" : ""
}
domgachiqarator(todos)


tBody.addEventListener("click", (evt) => {
    evt.preventDefault()
    if (evt.target.matches(".delete")) {
        let id = evt.target.id

        let findIndex = todos.findIndex(val => val.id == id)
        todos.splice(findIndex, 1)
        domgachiqarator(todos)
    }
})




const tasks_list = document.getElementById("tasks_list")
const createBtn = document.getElementById("createBtn")
const tasks_value = document.getElementById("tasks_value")
let tasksArr = JSON.parse(localStorage.getItem("key")) || []
const total_count = document.getElementById("total_count")
const deleteBtn = document.getElementById("delete")

document.addEventListener("DOMContentLoaded", function () {
    createBtn.addEventListener("click", addTask)
    deleteBtn.addEventListener("click", deleteTask)
    tasks_value.addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
            addTask()
            deleteTask()
        }
    })
    displayTasks()

})

function addTask() {
    let new_task = tasks_value.value.trim()
    if (new_task !== "") {
        tasksArr.push({ name: new_task, disabled: false })
        displayTasks()
        saveStorage()

        tasks_value.value = ""
    }
}



function displayTasks() {
    tasks_list.innerHTML = ""
    tasksArr.forEach(item => {
        total_count.innerHTML = `Total: ${tasksArr.length}`
        let li = document.createElement("li")
        li.innerHTML = `<div class= "d-flex gap-1 align-items-center"><input type = "checkbox" id="toggleTask"> <span>${item.name}</span></div>`
        tasks_list.appendChild(li)
    });
}

function saveStorage() {
    localStorage.setItem("key", JSON.stringify(tasksArr))
}

function deleteTask() {
    tasksArr = []
    saveStorage()
    displayTasks()
}

function toggleTask(index) {
    tasksArr[index].disabled = !tasksArr[index].disabled
    saveStorage()
    displayTasks()
}
