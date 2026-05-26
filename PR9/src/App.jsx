import React, { useState } from "react";
import "./App.css";

export default function App() {
    // Стейт для тексту в інпуті
    const [text, setText] = useState("");
    
    // Стейт для масиву об'єктів задач
    const [tasks, setTasks] = useState([
        { id: 1, text: "Ознайомитися з основами React та інструментом Vite", done: true },
        { id: 2, text: "Освоїти передачу даних через пропси", done: false },
        { id: 3, text: "Реалізувати комплексне завдання з фільтрацією", done: false }
    ]);
    
    // Стейт для активного фільтру: "all" | "active" | "done"
    const [filter, setFilter] = useState("all");

    // Додавання нової задачі
    const addTask = (e) => {
        e.preventDefault(); // Запобігання перезавантаженню сторінки форми
        if (!text.trim()) {
            alert("Введіть текст завдання!");
            return;
        }
        
        const newTask = {
            id: Date.now(),
            text: text.trim(),
            done: false
        };

        setTasks([...tasks, newTask]);
        setText(""); // Очищення поля вводу
    };

    // Перемикання стану виконання (виконано / невиконано)
    const toggleTask = (id) => {
        setTasks(
            tasks.map(task => 
                task.id === id ? { ...task, done: !task.done } : task
            )
        );
    };

    // Видалення задачі за ідентифікатором
    const removeTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    // Обчислення масиву задач, які проходять поточний фільтр
    const getFilteredTasks = () => {
        if (filter === "active") {
            return tasks.filter(t => !t.done);
        }
        if (filter === "done") {
            return tasks.filter(t => t.done);
        }
        return tasks; // "all"
    };

    const filteredTasks = getFilteredTasks();

    return (
        <div className="todo-wrapper">
            <header className="todo-header">
                <h1>Практична робота №9</h1>
                <p>Інтерактивний Менеджер Завдань (Mini ToDo)</p>
            </header>

            {/* Контейнер форми введення */}
            <form onSubmit={addTask} className="todo-form">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Що плануєте зробити?..."
                    className="todo-input"
                />
                <button type="submit" className="todo-submit-btn">Додати</button>
            </form>

            {/* Панель перемикання режимів фільтрації */}
            <div className="filter-navigation">
                <button 
                    onClick={() => setFilter("all")}
                    className={`nav-btn ${filter === "all" ? "active-nav" : ""}`}
                >
                    Всі ({tasks.length})
                </button>
                <button 
                    onClick={() => setFilter("active")}
                    className={`nav-btn ${filter === "active" ? "active-nav" : ""}`}
                >
                    Активні ({tasks.filter(t => !t.done).length})
                </button>
                <button 
                    onClick={() => setFilter("done")}
                    className={`nav-btn ${filter === "done" ? "active-nav" : ""}`}
                >
                    Виконані ({tasks.filter(t => t.done).length})
                </button>
            </div>

            {/* Блок відображення списку */}
            <main className="todo-main">
                {filteredTasks.length === 0 ? (
                    <p className="empty-list-text">Список порожній у цій категорії.</p>
                ) : (
                    <ul className="task-list">
                        {filteredTasks.map(task => (
                            <li key={task.id} className={`task-item ${task.done ? "completed-task" : ""}`}>
                                <span
                                    onClick={() => toggleTask(task.id)}
                                    className="task-text"
                                >
                                    {task.text}
                                </span>
                                <button 
                                    onClick={() => removeTask(task.id)}
                                    className="task-remove-btn"
                                >
                                    &times;
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
}
