// define the UI variable
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM load event listeners
  document.addEventListener("DOMContentLoaded", getTask);
  // add task listeners
  form.addEventListener("submit", addTask);
  // remove listener
  taskList.addEventListener("click", removeTask);
  // clear task
  clearBtn.addEventListener("click", clearTasks);
  // filter
  console.log(filter);
  filter.addEventListener("keyup", filterTask);
}

// get task from LS
function getTask(e) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    //   creat a li element
    const li = document.createElement("li");
    // add class
    li.className = "collection-item";
    // creat text node amd append li
    li.appendChild(document.createTextNode(task));
    // creat a link
    const link = document.createElement("a");
    // add class
    link.className = "delete-item secondary-content";
    // add icon html
    link.innerHTML = '<i class ="fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
  });
}

// add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("add a task");
  }
  //   creat a li element
  const li = document.createElement("li");
  // add class
  li.className = "collection-item";
  // creat text node amd append li
  li.appendChild(document.createTextNode(taskInput.value));
  // creat a link
  const link = document.createElement("a");
  // add class
  link.className = "delete-item secondary-content";
  // add icon html
  link.innerHTML = '<i class ="fa fa-remove"></i>';
  // append link to li
  li.appendChild(link);
  // append li to ul
  taskList.appendChild(li);
  // storage LS
  storeTaskInLocalStorage(taskInput.value);
  // Clear input
  taskInput.value = "";

  e.preventDefault();
}
// local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure")) {
      e.target.parentElement.parentElement.remove();

      // remove from LS
      removeTaskFormLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// remove from ls
function removeTaskFormLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear task
function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // clear from Ls
  clearTaskFormLocalStorege();
}

// clear task from Ls
function clearTaskFormLocalStorege() {
  localStorage.clear();
}

// filter
function filterTask(e) {
  console.log(e.target.value);
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
