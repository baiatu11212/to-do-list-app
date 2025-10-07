const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Când pagina se încarcă, încărcăm task-urile salvate
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);
taskList.addEventListener("click", handleTaskAction);

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return; // dacă e gol, nu face nimic

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <div>
      <button class="complete">✔</button>
      <button class="delete">✖</button>
    </div>
  `;

  taskList.appendChild(li);
  saveTasks();
  taskInput.value = ""; // curățăm inputul
}

function handleTaskAction(e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove(); // șterge task-ul
  } else if (e.target.classList.contains("complete")) {
    e.target.parentElement.parentElement.classList.toggle("completed"); // marchează completat
  }
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
  const data = localStorage.getItem("tasks");
  if (data) taskList.innerHTML = data;
}