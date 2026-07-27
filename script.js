// =====================================
// Modern Todo App
// Part 1
// =====================================

// Elements

const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const taskDate = document.getElementById("taskDate");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

// Task Array

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// =====================================
// Save Tasks
// =====================================

function saveTasks(){

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// =====================================
// Update Statistics
// =====================================

function updateStats(){

    totalTasks.textContent = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    completedTasks.textContent = completed;

    pendingTasks.textContent = tasks.length - completed;

}

// =====================================
// Empty State
// =====================================

function updateEmptyState(){

    if(tasks.length === 0){

        emptyState.style.display = "block";

    }

    else{

        emptyState.style.display = "none";

    }

}

// =====================================
// Render Tasks
// =====================================

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.className = `task ${task.completed ? "completed" : ""}`;

        li.innerHTML = `

<div class="task-left">

<input
type="checkbox"
${task.completed ? "checked" : ""}
data-index="${index}"
class="completeTask">

<div>

<div class="task-left">

<div>

<div class="task-title">

${task.title}

</div>

<div class="task-date">

📅 ${task.date || "No Date"}

</div>

</div>

</div>

<div class="actions">

<span class="priority ${task.priority.toLowerCase()}">

${task.priority}

</span>

${
task.completed

?

`<button class="undo" data-index="${index}">
Undo
</button>`

:

`<button class="complete" data-index="${index}">
Complete
</button>`
}

<button
class="delete"
data-index="${index}">

Delete

</button>

</div>

</button>



</div>

`;

        taskList.appendChild(li);

    });

    updateStats();

    updateEmptyState();

    saveTasks();

}
// =====================================
// Complete / Undo 
// =====================================

taskList.addEventListener("click", function(e){

    // COMPLETE

    if(e.target.classList.contains("complete")){

        const index = e.target.dataset.index;

        tasks[index].completed = true;

        renderTasks();

    }

    // UNDO

    if(e.target.classList.contains("undo")){

        const index = e.target.dataset.index;

        tasks[index].completed = false;

        renderTasks();

    }

    

});

// =====================================
// Add Task
// =====================================

function addTask(){

    const title = taskInput.value.trim();

    if(title===""){

        alert("Please enter a task.");

        return;

    }

    tasks.push({

        title,

        priority:priority.value,

        date:taskDate.value,

        completed:false

    });

    taskInput.value="";

    taskDate.value="";

    priority.value="High";

    renderTasks();

}

// =====================================
// Button Click
// =====================================

addBtn.addEventListener("click",addTask);

// =====================================
// Press Enter
// =====================================

taskInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        addTask();

    }

});

// =====================================
// Initial Load
// =====================================

renderTasks();
// =====================================
// COMPLETE TASK
// =====================================

taskList.addEventListener("change", (e) => {

    if (!e.target.classList.contains("completeTask")) return;

    const index = e.target.dataset.index;

    tasks[index].completed = e.target.checked;

    renderTasks();

});

// =====================================
// DELETE & EDIT
// =====================================

taskList.addEventListener("click", (e) => {

    // Delete Task

    if (e.target.closest(".delete")) {

        const index = e.target.closest(".delete").dataset.index;

        if (confirm("Delete this task?")) {

            tasks.splice(index, 1);

            renderTasks();

        }

    }

    // Edit Task

    if (e.target.closest(".edit")) {

        const index = e.target.closest(".edit").dataset.index;

        const newTask = prompt("Edit Task", tasks[index].title);

        if (newTask && newTask.trim() !== "") {

            tasks[index].title = newTask.trim();

            renderTasks();

        }

    }

});

// =====================================
// SEARCH TASK
// =====================================

const search = document.getElementById("search");

search.addEventListener("input", () => {

    const keyword = search.value.toLowerCase();

    document.querySelectorAll(".task").forEach(task => {

        const title = task
            .querySelector(".task-title")
            .textContent
            .toLowerCase();

        task.style.display = title.includes(keyword)
            ? "flex"
            : "none";

    });

});

// =====================================
// FILTER TASK
// =====================================

const filter = document.getElementById("filter");

filter.addEventListener("change", () => {

    const value = filter.value;

    document.querySelectorAll(".task").forEach(task => {

        const completed = task.classList.contains("completed");

        switch (value) {

            case "completed":

                task.style.display = completed ? "flex" : "none";

                break;

            case "pending":

                task.style.display = !completed ? "flex" : "none";

                break;

            default:

                task.style.display = "flex";

        }

    });

});

// =====================================
// SORT BY PRIORITY
// =====================================

function sortTasks() {

    const order = {

        High: 1,

        Medium: 2,

        Low: 3

    };

    tasks.sort((a, b) => order[a.priority] - order[b.priority]);

}

sortTasks();

renderTasks();

// =====================================
// AUTO SAVE
// =====================================

window.addEventListener("beforeunload", () => {

    saveTasks();

});

// =====================================
// SMALL BUTTON ANIMATION
// =====================================

document.addEventListener("click", (e) => {

    const button = e.target.closest("button");

    if (!button) return;

    button.animate(

        [

            { transform: "scale(1)" },

            { transform: "scale(.92)" },

            { transform: "scale(1)" }

        ],

        {

            duration: 180

        }

    );

});