// ================================
// DRAG WINDOWS
// ================================

const windows = document.querySelectorAll(".movable");

let highestZIndex = 10;

windows.forEach(function (window) {
  dragElement(window);
});

function dragElement(elmnt) {
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;

  // Find the header INSIDE this particular window
  const header = elmnt.querySelector(".movableHeader");

  header.onmousedown = dragMouseDown;

  // Bring window to front when clicked
  elmnt.addEventListener("mousedown", function () {
    highestZIndex++;
    elmnt.style.zIndex = highestZIndex;
  });

  function dragMouseDown(e) {
    e = e || window.event;

    e.preventDefault();

    // Bring window to front
    highestZIndex++;
    elmnt.style.zIndex = highestZIndex;

    pos3 = e.clientX;
    pos4 = e.clientY;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();

    // Calculate mouse movement
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;

    pos3 = e.clientX;
    pos4 = e.clientY;

    // Calculate new position
    let newTop = elmnt.offsetTop - pos2;
    let newLeft = elmnt.offsetLeft - pos1;

    // Get footer
    const footer = document.getElementById("footer");

    const footerTop = footer.getBoundingClientRect().top;

    // ================================
    // VERTICAL LIMITS
    // ================================

    // Don't allow window below footer
    const maxTop = footerTop - elmnt.offsetHeight;

    newTop = Math.min(newTop, maxTop);

    // Don't allow window above screen
    newTop = Math.max(newTop, 0);

    // ================================
    // HORIZONTAL LIMITS
    // ================================

    // Don't allow window to go too far left
    newLeft = Math.max(newLeft, 0);

    // Don't allow window to go beyond right side
    const maxLeft = window.innerWidth - elmnt.offsetWidth;

    newLeft = Math.min(newLeft, maxLeft);

    // Apply position
    elmnt.style.top = newTop + "px";
    elmnt.style.left = newLeft + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// ================================
// TODO LIST + PERSISTENCE
// ================================

const addTodoButtons = document.querySelectorAll(".addTodo");

// Load saved todos
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Create a todo on the screen
function createTodo(todo, todoMain) {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todoItem");

  // Create label
  const label = document.createElement("label");

  // Create checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;

  // Create custom checkbox
  const icon = document.createElement("i");

  // Create editable text
  const text = document.createElement("span");
  text.contentEditable = "true";
  text.textContent = todo.text;

  // Put checkbox + icon inside label
  label.appendChild(checkbox);
  label.appendChild(icon);

  // Put label + text inside todoItem
  todoItem.appendChild(label);
  todoItem.appendChild(text);

  // Add todo to page
  todoMain.appendChild(todoItem);

  // ================================
  // CHECKBOX
  // ================================

  checkbox.addEventListener("change", function () {
    todo.completed = checkbox.checked;

    saveTodos();
  });

  // ================================
  // TEXT EDITING
  // ================================

  text.addEventListener("input", function () {
    todo.text = text.textContent;

    saveTodos();
  });
}

// ================================
// LOAD SAVED TODOS
// ================================

addTodoButtons.forEach(function (button) {
  const todoMain = button.closest(".todoMain");

  // Display saved todos
  todos.forEach(function (todo) {
    createTodo(todo, todoMain);
  });

  // ================================
  // ADD TODO BUTTON
  // ================================

  button.addEventListener("click", function () {
    const newTodo = {
      text: "To-Do",
      completed: false,
    };

    // Add to our array
    todos.push(newTodo);

    // Save immediately
    saveTodos();

    // Display it
    createTodo(newTodo, todoMain);

    // Find the newly created text
    const items = todoMain.querySelectorAll(".todoItem");
    const newItem = items[items.length - 1];

    const text = newItem.querySelector("span");

    // Focus text
    text.focus();

    // Select "To-Do"
    const selection = window.getSelection();
    const range = document.createRange();

    range.selectNodeContents(text);

    selection.removeAllRanges();
    selection.addRange(range);
  });
});

// ================================
// CLOSE WINDOWS
// ================================

windows.forEach(function (window) {
  const closeButton = window.querySelector(".close");

  closeButton.addEventListener("click", function () {
    window.style.display = "none";
  });
});

// ================================
// TASKBAR
// ================================

const todoIcon = document.querySelector(".todoIcon");
const notepadIcon = document.querySelector(".notepadIcon");
const photosIcon = document.querySelector(".photosIcon");

const todoWindow = document.querySelector(".todoWindow");
const notepadWindow = document.querySelector(".notepadWindow");
const photosWindow = document.querySelector(".photosWindow");

todoIcon.onclick = function () {
  todoWindow.style.display = "block";
};

notepadIcon.onclick = function () {
  notepadWindow.style.display = "block";
};

photosIcon.onclick = function () {
  photosWindow.style.display = "block";
};

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}

function updateClock() {
  const clock = document.getElementById("clock");

  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours || 12;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  clock.textContent = hours + ":" + minutes + " " + ampm;
}

updateClock();
setInterval(updateClock, 1000);

const notePad = document.querySelector(".notepadText");

notePad.value = localStorage.getItem("notepad") || "";

notePad.addEventListener("input", function () {
  localStorage.setItem("notepad", notePad.value);
});
