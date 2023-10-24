import "/style/style.css";


const addTask = document.querySelector("#button-addon2");
const listContainer = document.querySelector("#task-container");

const tasks = JSON.parse(localStorage.getItem("tasks")) || []
renderTasksFromLocalStorage();

function renderTasksFromLocalStorage() {
    tasks.forEach((task) => {
        renderTask(task);
    });
}

addTask.addEventListener("click", createTask);

function createTask() {
    const taskTextInput = document.querySelector(".form-control");
    const taskText = taskTextInput.value.trim(); 

    if (taskText !== '') {
        const task = {
            text: taskText,
            isCompleted: false,
            id: Date.now(),
        };
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTask(task);
        taskTextInput.value = '';
    } else {
        alert("Task cannot be empty")
    }
}

function renderTask(task) {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <i class="bi bi-circle ${task.isCompleted ? 'display-none' : ''}"></i>
        <i class="bi bi-check-circle-fill ${task.isCompleted ? '' : 'display-none'}"></i>
        <span class="${task.isCompleted ? 'completed' : ''}">${task.text}</span>
        <i class="bi bi-pencil-square edit-btn"></i>
        <i class="bi bi-chevron-up arrow-up-btn"></i>
        <i class="bi bi-chevron-down arrow-down-btn"></i>
        <i class="bi bi-x delete-btn"></i>
    `;
    listContainer.appendChild(taskItem);
    
    const circleIcon = taskItem.querySelector('.bi-circle');
    const checkCircle = taskItem.querySelector('.bi-check-circle-fill');
    const span = taskItem.querySelector('span');
    const deleteBtn = taskItem.querySelector('.delete-btn');
    const editBtn = taskItem.querySelector('.edit-btn');
    const arrowDownBtn = taskItem.querySelector('.arrow-down-btn');
    const arrowUpBtn = taskItem.querySelector('.arrow-up-btn');
    
    span.addEventListener('click', () => {
        toggleTaskCompletion(task, taskItem);
    });

    circleIcon.addEventListener('click', () => {
        toggleTaskCompletion(task, taskItem);
    });

    checkCircle.addEventListener('click', () => {
        toggleTaskCompletion(task, taskItem);
    });

    deleteBtn.addEventListener('click', () => {
        deleteTask(task);
        listContainer.removeChild(taskItem);
    });
    editBtn.addEventListener('click', () => {
        editTask(task, taskItem);
    });
    arrowUpBtn.addEventListener('click', () => {
        moveTaskUp(task);
    });
    arrowDownBtn.addEventListener('click', () => {
        moveTaskDown(task);
    });
}

function toggleTaskCompletion(task, taskItem) {
   
    task.isCompleted = !task.isCompleted;

    const circleIcon = taskItem.querySelector('.bi-circle');
    const checkCircle = taskItem.querySelector('.bi-check-circle-fill');
    const span = taskItem.querySelector('span');

    circleIcon.classList.toggle('display-none');
    checkCircle.classList.toggle('display-none');
    span.classList.toggle('completed');

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(task) {
    const taskIndex = tasks.findIndex((t) => t.id === task.id);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function editTask(task, taskItem) {
    const newText = prompt('Edit the task:', task.text);
    if (newText !== null && newText !== '') {
        task.text = newText;
        
        const span = taskItem.querySelector('span');
        span.textContent = newText;
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
function moveTaskUp(task) {
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

function moveTaskDown(task) {
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