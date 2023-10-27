export function toggleTaskCompleted(task, taskItem, tasks) {
   
    task.isCompleted = !task.isCompleted;

    const circleIcon = taskItem.querySelector(".bi-circle");
    const checkCircle = taskItem.querySelector(".bi-check-circle-fill");
    const span = taskItem.querySelector("span");

    circleIcon.classList.toggle("display-none");
    checkCircle.classList.toggle("display-none");
    span.classList.toggle("completed");

    localStorage.setItem("tasks", JSON.stringify(tasks));
}