// =========================================
// TO-DO APPLICATION - STEP 2
// Add and display tasks
// =========================================

const todoForm = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

const filterButtons = document.querySelectorAll(".filter-button");

let currentFilter = "all";

// Get saved tasks from localStorage
let todoTasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

// Save tasks to localStorage
function saveTodoTasks() {
    localStorage.setItem("todoTasks", JSON.stringify(todoTasks));
}

// Display tasks on the page
function renderTodoTasks() {

    taskList.innerHTML = "";

    const remainingTasks = todoTasks.filter(function(task) {
    return !task.completed;
}).length;

taskCount.textContent =
    remainingTasks + (remainingTasks === 1 ? " task remaining" : " tasks remaining");

const filteredTasks = todoTasks.filter(function(task) {

    if (currentFilter === "active") {
        return !task.completed;
    }

    if (currentFilter === "completed") {
        return task.completed;
    }

    return true;
});

filteredTasks.forEach(function(task) {

        const li = document.createElement("li");

        li.className = "todo-item";

        li.dataset.id = task.id;

        if (task.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");

        span.className = "todo-text";

        span.textContent = task.text;

        const completeButton = document.createElement("button");

        completeButton.type = "button";

        completeButton.className = "complete-button";

        completeButton.dataset.action = "complete";

        completeButton.textContent = task.completed
            ? "Undo"
            : "Complete";

        const editButton = document.createElement("button");

editButton.type = "button";

editButton.className = "edit-button";

editButton.dataset.action = "edit";

editButton.textContent = "Edit";

const deleteButton = document.createElement("button");

deleteButton.type = "button";

deleteButton.className = "delete-button";

deleteButton.dataset.action = "delete";

deleteButton.textContent = "Delete";

        li.appendChild(span);

        li.appendChild(completeButton);

        li.appendChild(editButton);

        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

// Add a new task
todoForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    todoTasks.push(newTask);

    saveTodoTasks();

    renderTodoTasks();

    todoForm.reset();

    taskInput.focus();
});

// Handle task buttons using event delegation
taskList.addEventListener("click", function(event) {

    const button = event.target.closest("button[data-action]");

    if (!button) {
        return;
    }

    const li = button.closest(".todo-item");

    if (!li) {
        return;
    }

    const taskId = Number(li.dataset.id);

    const task = todoTasks.find(function(item) {
        return item.id === taskId;
    });

    if (!task) {
        return;
    }

    if (button.dataset.action === "complete") {

        task.completed = !task.completed;

        saveTodoTasks();

        renderTodoTasks();
    }

    if (button.dataset.action === "edit") {

    const newText = window.prompt(
        "Edit task:",
        task.text
    );

    if (newText === null) {
        return;
    }

    const trimmedText = newText.trim();

    if (trimmedText === "") {
        return;
    }

    task.text = trimmedText;

    saveTodoTasks();

    renderTodoTasks();
}

if (button.dataset.action === "delete") {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
        return;
    }

    todoTasks = todoTasks.filter(function(item) {
        return item.id !== taskId;
    });

    saveTodoTasks();

    renderTodoTasks();
}
});

// Handle task filters
filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        currentFilter = button.dataset.filter;

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        renderTodoTasks();
    });
});

// Display saved tasks when the page loads
renderTodoTasks();