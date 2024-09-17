let users = [];
let currentUser = null;
let tasks = [];
let editingTaskIndex = null;

function showSignupForm() {
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
}

function showLoginForm() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (username && password) {
        const userExists = users.some(user => user.username === username);

        if (!userExists) {
            users.push({ username, password });
            alert('Sign-up successful! You can now log in.');
            showLoginForm();
        } else {
            alert('Username already exists. Please choose a different username.');
        }
    } else {
        alert('Please fill out all fields.');
    }
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        currentUser = user;
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('todo-app').style.display = 'block';
        loadUserTasks();
    } else {
        alert('Invalid username or password.');
    }
}

function logout() {
    currentUser = null;
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('todo-app').style.display = 'none';
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
}

function loadUserTasks() {
    // Placeholder to load tasks specific to the current user if needed
    displayTasks();
}

function addTask() {
    const taskInput = document.getElementById('task-input').value;
    const taskTime = document.getElementById('task-time').value;

    if (taskInput && taskTime) {
        const task = {
            description: taskInput,
            time: taskTime,
            completed: false
        };

        if (editingTaskIndex !== null) {
            tasks[editingTaskIndex] = task;
            editingTaskIndex = null;
        } else {
            tasks.push(task);
        }

        document.getElementById('task-input').value = '';
        document.getElementById('task-time').value = '';
        displayTasks();
    } else {
        alert('Please fill out the task details.');
    }
}

function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const taskDescription = document.createElement('span');
        taskDescription.textContent = `${task.description} - ${task.time}`;
        if (task.completed) {
            taskDescription.style.textDecoration = 'line-through';
        }

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit';
        editButton.onclick = () => editTask(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);

        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.onclick = () => toggleComplete(index);

        taskItem.appendChild(taskDescription);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        taskItem.appendChild(completeButton);
        taskList.appendChild(taskItem);
    });
}

function editTask(index) {
    document.getElementById('task-input').value = tasks[index].description;
    document.getElementById('task-time').value = tasks[index].time;
    editingTaskIndex = index;
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}
