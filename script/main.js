import { deleteTask} from "./modules/deleteTask";
import { editTask } from "./modules/editTask";
import { toggleTaskCompleted } from "./modules/toggleTask";
import "/style/style.css";

const addTask = document.querySelector("#button-addon2");
const taskTextInput = document.querySelector(".form-control");
const listContainer = document.querySelector("#task-container");
const tasks = JSON.parse(localStorage.getItem("tasks")) || []

renderTasksFromLocalStorage();

function renderTasksFromLocalStorage() {
    tasks.forEach((task) => {
        renderTask(task);
    });
}

addTask.addEventListener("click", createTask);
taskTextInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        createTask();
    }
});

function createTask() {

    const taskText = taskTextInput.value.trim(); 

    if (taskText !== "") {
        const task = {
            text: taskText,
            isCompleted: false,
            id: Date.now(),
        };
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTask(task);
        taskTextInput.value = "";
    } else {
        alert("Task cannot be empty")
    }
}

function renderTask(task) {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <i class="bi bi-circle ${task.isCompleted ? "display-none" : ""}"></i>
        <i class="bi bi-check-circle-fill ${task.isCompleted ? "" : "display-none"}"></i>
        <span class="${task.isCompleted ? "completed" : ""}">${task.text}</span>
        <i class="bi bi-pencil-square edit-btn"></i>
        <i class="bi bi-chevron-up arrow-up-btn"></i>
        <i class="bi bi-chevron-down arrow-down-btn"></i>
        <i class="bi bi-x delete-btn"></i>
        `;
    listContainer.appendChild(taskItem);
    
    const circleIcon = taskItem.querySelector(".bi-circle");
    const checkCircle = taskItem.querySelector(".bi-check-circle-fill");
    const span = taskItem.querySelector("span");
    const deleteBtn = taskItem.querySelector(".delete-btn");
    const editBtn = taskItem.querySelector(".edit-btn");
    const arrowDownBtn = taskItem.querySelector(".arrow-down-btn");
    const arrowUpBtn = taskItem.querySelector(".arrow-up-btn");
    
    span.addEventListener("click", () => {
        toggleTaskCompleted(task, taskItem, tasks);
    });

    circleIcon.addEventListener("click", () => {
        toggleTaskCompleted(task, taskItem, tasks);
    });

    checkCircle.addEventListener("click", () => {
        toggleTaskCompleted(task, taskItem);
    });

    deleteBtn.addEventListener("click", () => {
        deleteTask(task, tasks);
        listContainer.removeChild(taskItem);
    });

    editBtn.addEventListener("click", () => {
        editTask(task, taskItem, tasks);
    });

    arrowUpBtn.addEventListener("click", () => {
        moveTaskUp(task, tasks);
    });
    
    arrowDownBtn.addEventListener("click", () => {
        moveTaskDown(task, tasks);
    });
}

function moveTaskUp(task, tasks) {
    const taskIndex = tasks.findIndex((t) => t.id === task.id);
    if (taskIndex > 0) {
    
        [tasks[taskIndex], tasks[taskIndex - 1]] = [tasks[taskIndex - 1], tasks[taskIndex]];

        listContainer.innerHTML = '';
        tasks.forEach((task) => {
            renderTask(task);
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function moveTaskDown(task, tasks) {
    const taskIndex = tasks.findIndex((t) => t.id === task.id);
    if (taskIndex < tasks.length - 1) {
    
        [tasks[taskIndex], tasks[taskIndex + 1]] = [tasks[taskIndex + 1], tasks[taskIndex]];

        listContainer.innerHTML = '';
        tasks.forEach((task) => {
            renderTask(task);
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}