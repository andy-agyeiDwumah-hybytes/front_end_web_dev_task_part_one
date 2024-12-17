let d = new Date();
// Returns date as YYYY-MM-DD
let formattedDate = d.toISOString().split('T')[0];
// Ensure that user can only pick dates from today
const dateInput = document.getElementById("task-deadline");
dateInput.setAttribute("min", formattedDate);

// Local storage key
const LOCALSTORAGEKEY = "tasks";

// Elements
const taskList = document.getElementById("task-list");
const form = document.getElementById("form");
const taskName = document.getElementById("task-name");
const taskDescription = document.getElementById("task-description");

// CRUD functionality
const removeTask = (task, li) => {
    // Remove from page
    taskList.removeChild(li);
    // Remove from local storage
    const tasks = JSON.parse(localStorage.getItem(LOCALSTORAGEKEY)) || [];
    const updatedTasks = tasks.filter(t => t.id !== task.id);
    localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(updatedTasks));
};

const addTaskToDom = task => {
    // Create task
    const li = document.createElement("li");
    const div = document.createElement("div");
    const button = document.createElement("button");
    const taskHeading = document.createElement("h3");
    const taskDeadline = document.createElement("p");
    const taskDescription = document.createElement("p");

    // Get task details
    const { name, description, date } = task;

    taskHeading.innerHTML = name;
    taskDescription.innerHTML = description;
    taskDescription.className = "description"
    taskDeadline.innerHTML = `<strong>Deadline: ${date}</strong>`;
    button.innerHTML = "Remove";
    button.className = "removeBtn";
    button.addEventListener("click", () => removeTask(task, li))

    div.appendChild(taskHeading);
    div.appendChild(taskDeadline);
    div.appendChild(taskDescription);
    div.appendChild(button);
    li.appendChild(div);
    taskList.appendChild(li);
}

const getTasks = () => {
    const tasks = JSON.parse(localStorage.getItem(LOCALSTORAGEKEY)) || [];
    tasks.forEach(task => addTaskToDom(task));
}

const saveTask = task => {
    const tasks = JSON.parse(localStorage.getItem(LOCALSTORAGEKEY)) || [];
    tasks.push(task);
    localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(tasks));
}

const addTask = e => {
    // Prevent page refresh
    e.preventDefault();

    // Get user data
    const taskForm = new FormData(form);
    const userTaskName = taskForm.get("task_name").trim();
    const userTaskDescription = taskForm.get("task_description").trim();
    const userTaskDate = taskForm.get("task_deadline");

    // Store as object
    const taskData = {
        id: d.toISOString(),
        name: userTaskName,
        description: userTaskDescription,
        date: userTaskDate
    }

    // Clear form fields
    form.reset();

    addTaskToDom(taskData);
    saveTask(taskData);
}

form.addEventListener("submit", addTask);
getTasks();