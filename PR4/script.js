"use strict";

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.querySelector("#addTask");
const taskList = document.getElementById("taskList");

// Функція додавання нового завдання
addTaskButton.addEventListener("click", function() {
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        const li = document.createElement("li");
        li.textContent = taskText;
        li.style.cursor = "pointer";
        li.title = "Натисніть, щоб видалити";
        
        taskList.appendChild(li);
        console.log(`Завдання додано: "${taskText}"`);
        taskInput.value = ""; 
    } else {
        alert("Будь ласка, введіть текст завдання!");
    }
});

// Додавання підтримки клавіші Enter
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTaskButton.click();
    }
});

// Делегування подій для динамічного видалення
taskList.addEventListener("click", function(event) {
    if (event.target.nodeName === "LI") {
        const deletedText = event.target.textContent;
        event.target.remove();
        console.log(`Завдання видалено: "${deletedText}"`);
    }
});
