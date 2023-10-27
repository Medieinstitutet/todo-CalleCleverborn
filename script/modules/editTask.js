export function editTask(task, taskItem, tasks) {
    const newText = prompt("Edit the task:", task.text);
    if (newText !== null && newText !== '') {
        task.text = newText;
        
        const span = taskItem.querySelector("span");
        span.textContent = newText;
        
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}