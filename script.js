// Wait until the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load tasks from localStorage
    loadTasks();

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Remove whitespace

        // Prevent adding empty tasks
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create the task element
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create the remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // Remove task on click
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            saveTasks(); // Update localStorage after removal
        };

        // Append remove button to task item
        li.appendChild(removeBtn);

        // Append task to the list
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";

        // Save updated tasks to localStorage
        saveTasks();
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll("li").forEach(li => {
            // Remove button text from saved task
            const taskText = li.childNodes[0].nodeValue.trim();
            tasks.push(taskText);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(taskText => {
            const li = document.createElement("li");
            li.textContent = taskText;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.className = "remove-btn";
            removeBtn.onclick = function () {
                taskList.removeChild(li);
                saveTasks();
            };

            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }

    // Event listener for Add Task button
    addButton.addEventListener("click", addTask);

    // Event listener for Enter key in input field
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});