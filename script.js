let tasks = [];

function LocalStorage() {
  const Tasks = JSON.parse(localStorage.getItem("Tasks"));
  if (Tasks) {
    tasks = Tasks;
  }
  loadTasks();
}

function loadTasks() {
  const tasksContainer = document.getElementById("tasks-container");
  if (!tasksContainer) return; 

  tasksContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "todo-item";

    const taskText = document.createElement("span");
    taskText.textContent = task;

    const delButton = document.createElement("button");
    delButton.className = "btn-del";
    delButton.type = "button";
    delButton.textContent = "Delete";
    delButton.addEventListener("click", () => deleteTask(index));

    taskDiv.appendChild(taskText);
    taskDiv.appendChild(delButton);
    tasksContainer.appendChild(taskDiv);
  });

  localStorage.setItem("Tasks", JSON.stringify(tasks));
}

function deleteTask(index) {
  if (index < 0 || index >= tasks.length) return;
  tasks.splice(index, 1);
  loadTasks();
}

function addTask() {
  const taskInputElement = document.getElementById("task-input");
  if (!taskInputElement) return;

  const task = taskInputElement.value.trim();
  if (!task) {
    alert("Please enter a task");
    return;
  }

  tasks.unshift(task);
  taskInputElement.value = "";
  loadTasks();
}

window.addEventListener("DOMContentLoaded", LocalStorage);