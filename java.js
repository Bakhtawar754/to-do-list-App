let tasks = [];
let completedTasks = 0;

function updateProgress() {
  const progressBar = document.querySelector(".progress-bar");
  const taskCounter = document.getElementById("taskCounter");
  const totalTasks = tasks.length;
  completedTasks = tasks.filter(task => task.completed).length;

  taskCounter.textContent = `${completedTasks} / ${totalTasks}`;
  progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : "0%";
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    renderTasks();
    updateProgress();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
  updateProgress();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
  updateProgress();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = "task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("click", () => toggleTask(index));

    const taskText = document.createElement("p");
    taskText.textContent = task.text;
    taskText.style.textDecoration = task.completed ? "line-through" : "none";

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "&#128465;"; // Trash bin icon
    deleteButton.addEventListener("click", () => deleteTask(index));

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
  });
}
