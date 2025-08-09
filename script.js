// Run the script after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage when the page loads
    loadTasks();

    // Function to add a new task
    function addTask(taskText, save = true) {
        // If no taskText was passed, get it from the input
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // Prevent adding empty tasks
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create the list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove task when button clicked
        removeBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            removeFromLocalStorage(taskText);
        });

        // Append remove button to the task item
        li.appendChild(removeBtn);

        // Add the task item to the list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';

        // Save task to localStorage only if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => addTask(task, false)); // false = don't save again
    }

    // Function to remove a task from localStorage
    function removeFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', () => addTask());

    // Event listener for pressing "Enter" in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});