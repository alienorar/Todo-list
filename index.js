const tasks_value = document.querySelector("#task_value")
const create_btn = document.querySelector("#create_btn")
const tasks_list = document.querySelector("#tasks_list")
const delete_all = document.querySelector("#delete_all")
const total_tasks = document.querySelector("#total_tasks")

let tasksArr = JSON.parse(localStorage.getItem("tasksArr")) || []

document.addEventListener("DOMContentLoaded", function () {
    delete_all.addEventListener("click", deleteAll)
    create_btn.addEventListener("click", addTasks)
    displayTasks()
    tasks_value.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addTasks()
        }
    })
})


function addTasks() {
    let new_tasks = tasks_value.value.trim()
    if (new_tasks !== "") {
        tasksArr.push({ name: new_tasks, disabled: false })
        tasks_value.value = ""
        displayTasks()
        saveStorage()
    }

}

function deleteAll() {
    tasksArr = []
    displayTasks()
    saveStorage()
}

function displayTasks() {
    tasks_list.innerHTML = ""
    tasksArr.forEach((item, index) => {
        let li = document.createElement("li")
        li.innerHTML = `<div class="flex justify-between"><div><input type="checkbox" class="todo_checkbox" ${item.disabled ? "checked" : ""}>
        <span id="task_name"  class=" ${item.disabled ? "disabled" : ""}"> ${item.name}</span></div>
      <div class ="flex gap-2">    <button type="submit" id="edit-button" class="outline-none"><span><i class="fa-solid fa-pen text-yellow-300"></i></span></button>
    <button type="submit" id="end-editing" class="outline-none hidden"><span><i class="fa-regular fa-bookmark"></i></span></button>
  <button type="submit" id="delete_item" class="outline-none"><span><i class="fa-solid fa-trash-can"></i></span></button>
  
  
  </div>
        </div>`

        tasks_list.appendChild(li)
        li.querySelector(".todo_checkbox").addEventListener("change", function () {
            checkTasks(index)

        })

        li.querySelector("#edit-button").addEventListener("click", function () {
            li.querySelector("#task_name").contentEditable = true;
            li.querySelector("#task_name").style.backgroundColor = "#dddbdb";
            li.querySelector("#end-editing").style.display = "block"
            li.querySelector("#end-editing").addEventListener("click", function () {
                li.querySelector("#task_name").contentEditable = false;
                li.querySelector("#task_name").style.backgroundColor = "inherit";
            });
        });



    });
    total_tasks.innerText = `Total:${tasksArr.length}`
}

function saveStorage() {
    localStorage.setItem("tasksArr", JSON.stringify(tasksArr))
}
function checkTasks(index) {
    tasksArr[index].disabled = !tasksArr[index].disabled
    saveStorage()
    displayTasks()

}
