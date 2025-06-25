const addBtn = document.getElementById("addtask-btn");
const newTaskInput = document.getElementById("new-task");
const taskList = document.getElementById("task-list");
const taskDetailSection = document.getElementById("taskdetail");
const backBtn = document.getElementById("back");
const saveBtn = document.getElementById("save-task-btn");

const taskTitleInput = document.getElementById("tasktitle");
const descInput = document.getElementById("description");
const dueDateInput = document.getElementById("due-date");
const priorityInput = document.getElementById("priority");

const allTasksFilter = document.getElementById("all-tasks-filter");
const completedTasksFilter = document.getElementById("completed-tasks-filter");

let tasks = []; 
let currentTaskId = null;


addBtn.addEventListener("click", () => {
  const title = newTaskInput.value.trim();
  if (title === "") return;

  const task = {
    id: Date.now(),
    title: title,
    description: "",
    dueDate: "",
    priority: "",
    completed: false,
  };

  tasks.push(task);
  newTaskInput.value = "";
  renderTasks();
});


function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  const filtered =
    filter === "completed" ? tasks.filter((t) => t.completed) : tasks;

  filtered.forEach((task) => {
    const item = document.createElement("div");
    item.className = "task-item";

    const label = document.createElement("label");
    label.textContent = task.title;
    if (task.completed) label.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      renderTasks(getCurrentFilter());
    });

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.addEventListener("click", () => openTaskDetail(task.id));

    const delBtn = document.createElement("button");
    delBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    delBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      renderTasks(getCurrentFilter());
    });

    item.appendChild(checkbox);
    item.appendChild(label);
    item.appendChild(editBtn);
    item.appendChild(delBtn);
    taskList.appendChild(item);
  });
}

function openTaskDetail(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  currentTaskId = id;
  taskTitleInput.value = task.title;
  descInput.value = task.description;
  dueDateInput.value = task.dueDate;
  priorityInput.value = task.priority;
  taskDetailSection.style.display = "block";
}


saveBtn.addEventListener("click", () => {
  const task = tasks.find((t) => t.id === currentTaskId);
  if (!task) return;

  task.title = taskTitleInput.value;
  task.description = descInput.value;
  task.dueDate = dueDateInput.value;
  task.priority = priorityInput.value;

  taskDetailSection.style.display = "none";
  renderTasks(getCurrentFilter());
});


backBtn.addEventListener("click", () => {
  taskDetailSection.style.display = "none";
});


allTasksFilter.addEventListener("click", () => {
  setFilter("all");
  renderTasks("all");
});

completedTasksFilter.addEventListener("click", () => {
  setFilter("completed");
  renderTasks("completed");
});

function setFilter(type) {
  document
    .querySelectorAll(".filter")
    .forEach((f) => f.classList.remove("selected"));
  if (type === "all") allTasksFilter.classList.add("selected");
  if (type === "completed") completedTasksFilter.classList.add("selected");
}

function getCurrentFilter() {
  return completedTasksFilter.classList.contains("selected")
    ? "completed"
    : "all";
}
