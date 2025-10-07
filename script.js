const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// 🔁 Încarcă task-urile salvate din localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

// ➕ Adaugă un task nou
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  addTask(taskText);
  saveTask(taskText);
  taskInput.value = "";
});

// 🧩 Funcție pentru a adăuga un task în listă
function addTask(taskText, completed = false) {
  const li = document.createElement("li");
  li.textContent = taskText;

  if (completed) li.classList.add("completed");

  // ✅ Mark as done
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateStorage();
  });

  // ❌ Buton de ștergere
  const delBtn = document.createElement("button");
  delBtn.textContent = "✕";
  delBtn.classList.add("delete-btn");
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    updateStorage();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

// 💾 Salvează un task nou în localStorage
function saveTask(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 🔄 Actualizează starea (după ștergere / bifare)
function updateStorage() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach((li) => {
    tasks.push({
      text: li.childNodes[0].textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 📦 Încarcă toate task-urile salvate
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((t) => addTask(t.text, t.completed));
}