let tasks = [];
let completedTasks = 0;

function addTask() {
  const taskInput = document.getElementById("task-input");
  const priorityLevel = document.getElementById("priority-level").value;
  const reminder = document.getElementById("reminder").value;

  if (taskInput.value.trim() === "") {
    alert("Task cannot be empty!");
    return;
  }

  const task = {
    text: taskInput.value,
    priority: priorityLevel,
    reminderTime: reminder,
    completed: false
  };

  tasks.push(task);
  taskInput.value = ""; // Clear input field
  updateTaskList();
}

function updateTaskList() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Clear the list

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.textContent = `${task.text}`;
    taskItem.classList.add(`${task.priority}-priority`);
    
    if (task.completed) {
      taskItem.classList.add("completed");
    }

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.classList.add("complete");
    completeBtn.onclick = () => completeTask(index);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove");
    removeBtn.onclick = () => removeTask(index);

    taskItem.appendChild(completeBtn);
    taskItem.appendChild(removeBtn);

    taskList.appendChild(taskItem);

    if (task.reminderTime) {
      scheduleReminder(task.reminderTime, task.text);
    }
  });

  updateProgress();
}

function completeTask(index) {
  tasks[index].completed = true;
  completedTasks++;
  updateTaskList();
}

function removeTask(index) {
  tasks.splice(index, 1);
  updateTaskList();
}

function updateProgress() {
  const totalTasks = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const progress = totalTasks === 0 ? 0 : Math.round((completed / totalTasks) * 100);
  
  document.getElementById("progress-bar").value = progress;
  document.getElementById("progress-text").textContent = progress;
}

function scheduleReminder(reminderTime, taskText) {
  const reminderDate = new Date(reminderTime);
  const now = new Date();

  const timeDifference = reminderDate - now;

  if (timeDifference > 0) {
    setTimeout(() => {
      alert(`Reminder: ${taskText}`);
    }, timeDifference);
  }
}

function changeTheme() {
  const theme = document.getElementById("theme").value;
  if (theme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}
