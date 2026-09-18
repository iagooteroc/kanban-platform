const tasks = [
  { id: 1, title: "Learn Docker", status: "todo" },
  { id: 2, title: "Build Kanban app", status: "progress" },
  { id: 3, title: "Create Git repository", status: "done" }
];

const columns = ["todo", "progress", "done"];

const board = document.getElementById("board");
const modal = document.getElementById("task-modal");
const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskStatus = document.getElementById("task-status");

function renderBoard() {
  columns.forEach((status) => {
    const list = document.getElementById(`${status}-tasks`);
    const count = document.getElementById(`${status}-count`);

    const columnTasks = tasks.filter((task) => task.status === status);

    count.textContent = columnTasks.length;

    if (columnTasks.length === 0) {
      list.innerHTML = '<div class="empty-state">No tasks here</div>';
      return;
    }

    list.innerHTML = columnTasks
      .map(
        (task) => `
          <article class="task-card">
            <p class="task-title">${escapeHtml(task.title)}</p>
            <div class="task-actions">
              ${moveButtons(task)}
              <button class="delete-btn" data-action="delete" data-id="${task.id}">
                Delete
              </button>
            </div>
          </article>
        `
      )
      .join("");
  });
}

function moveButtons(task) {
  const index = columns.indexOf(task.status);
  const buttons = [];

  if (index > 0) {
    buttons.push(
      `<button data-action="move" data-direction="back" data-id="${task.id}">
        ← Back
      </button>`
    );
  }

  if (index < columns.length - 1) {
    buttons.push(
      `<button data-action="move" data-direction="forward" data-id="${task.id}">
        Move →
      </button>`
    );
  }

  return buttons.join("");
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };

    return entities[character];
  });
}

function openModal() {
  modal.classList.remove("hidden");
  taskTitle.focus();
}

function closeModal() {
  modal.classList.add("hidden");
  taskForm.reset();
}

document.getElementById("add-task-btn").addEventListener("click", openModal);
document.getElementById("close-modal-btn").addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = taskTitle.value.trim();

  if (!title) return;

  tasks.push({
    id: Date.now(),
    title,
    status: taskStatus.value
  });

  renderBoard();
  closeModal();
});

board.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");

  if (!button) return;

  const id = Number(button.dataset.id);
  const task = tasks.find((item) => item.id === id);

  if (!task) return;

  if (button.dataset.action === "delete") {
    const index = tasks.findIndex((item) => item.id === id);
    tasks.splice(index, 1);
  }

  if (button.dataset.action === "move") {
    const currentIndex = columns.indexOf(task.status);
    const direction = button.dataset.direction === "forward" ? 1 : -1;
    const nextIndex = currentIndex + direction;

    if (nextIndex >= 0 && nextIndex < columns.length) {
      task.status = columns[nextIndex];
    }
  }

  renderBoard();
});

renderBoard();