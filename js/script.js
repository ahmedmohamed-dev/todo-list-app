let tasks = [];

loadTasksFromStorage();
renderTasks();

function loadTasksFromStorage() {
  const retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = retrievedTasks ?? [];
}

function saveTasksToStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const tasksContainer = document.getElementById("tasks");

  tasksContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    const content = `
      <div class="task ${task.isDone ? "done" : ""}">
        
        <div class="task-info">
          <h2>${task.title}</h2>

          <div class="task-date">
            <span class="material-symbols-outlined">
              calendar_month
            </span>

            <span>${task.date}</span>
          </div>
        </div>

        <div class="task-actions">

          <button
            onclick="deleteTask(${index})"
            class="btn delete-btn"
          >
            <span class="material-symbols-outlined">
              delete
            </span>
          </button>

          ${
            task.isDone
              ? `
                <button
                  onclick="toggleTaskCompletion(${index})"
                  class="btn cancel-btn"
                >
                  <span class="material-symbols-outlined">
                    cancel
                  </span>
                </button>
              `
              : `
                <button
                  onclick="toggleTaskCompletion(${index})"
                  class="btn complete-btn"
                >
                  <span class="material-symbols-outlined">
                    check
                  </span>
                </button>
              `
          }

          <button
            onclick="editTask(${index})"
            class="btn edit-btn"
          >
            <span class="material-symbols-outlined">
              edit
            </span>
          </button>

        </div>

      </div>
    `;

    tasksContainer.innerHTML += content;
  });
}

document.getElementById("add-task-btn").addEventListener("click", () => {
  const taskTitle = prompt("Enter task title");

  if (!taskTitle) return;

  const now = new Date();

  const newTask = {
    title: taskTitle,
    date: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
    isDone: false,
  };

  tasks.push(newTask);

  saveTasksToStorage();
  renderTasks();
});

function deleteTask(index) {
  const task = tasks[index];

  const isConfirmed = confirm(
    `Are you sure you want to delete "${task.title}" ?`,
  );

  if (!isConfirmed) return;

  tasks.splice(index, 1);

  saveTasksToStorage();
  renderTasks();
}

function editTask(index) {
  const task = tasks[index];

  const updatedTitle = prompt("Edit task title", task.title);

  if (!updatedTitle) return;

  task.title = updatedTitle;

  saveTasksToStorage();
  renderTasks();
}

function toggleTaskCompletion(index) {
  tasks[index].isDone = !tasks[index].isDone;

  saveTasksToStorage();
  renderTasks();
}
