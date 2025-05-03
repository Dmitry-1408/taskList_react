import { useState } from "react";

function App() {
  /* useState на закрытие крестиком */
  const [openSection, setOpenSection] = useState({
    tasklist: false,
    task: true,
    complitedTasks: true,
  });

  /* универсальная функция открытия/закрытия */
  function toggleSection(section) {
    setOpenSection((prev) => ({ ...prev, [section]: !prev[section] }));
  }

  /* логика работы приложения */
  return (
    <div className="app">
      {/* 1 task */}
      <div className="task-container">
        <h1>Task List with Priority</h1>
        <button
          className={`close-button ${openSection.tasklist ? "open" : ""}`}
          onClick={() => toggleSection("tasklist")}
        >
          +
        </button>
        {/* при нажатии на крестик открытие/закрытие */}
        {openSection.tasklist && <TaskForm />}
      </div>

      {/* 2 task */}
      <div className="task-container">
        <h2>Tasks:</h2>
        <button
          className={`close-button ${openSection.task ? "open" : ""}`}
          onClick={() => toggleSection("task")}
        >
          +
        </button>
        <div className="sort-controls">
          <button className="sort-button">By Date</button>
          <button className="sort-button">By Priority</button>
        </div>
        {openSection.task && <TaskList />}
      </div>

      {/* 3 task */}
      <div className="completed-task-container">
        <h2>Completed Tasks</h2>
        <button
          className={`close-button ${openSection.complitedTasks ? "open" : ""}`}
          onClick={() => toggleSection("complitedTasks")}
        >
          +
        </button>
        {openSection.complitedTasks && <CompletedTaskList />}
        
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
}

/* 1 task */
function TaskForm() {
  return (
    <form action="" className="task-form">
      <input type="text" value={""} placeholder="Task title" required />
      <select value={""}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Lov">Lov</option>
      </select>
      <input type="datetime-local" value={""} required />
      <button type="submit">Add task</button>
    </form>
  );
}

/* 2 task */
function TaskList() {
  return (
    <ul className="task-list">
      <TaskItem />
    </ul>
  );
}

/* 3 task */
function CompletedTaskList() {
  return (
    <ul className="completed-task-list">
      <TaskItem />
    </ul>
  );
}

function TaskItem() {
  return (
    <li className="task-item">
      <div className="task-info">
        <div>
          Title <strong>Medium</strong>
        </div>
        <div className="task-deadline">Due: {new Date().toLocaleString()}</div>
      </div>
      <div className="task-buttons">
        <button className="complete-button">Complete</button>
        <button className="delete-button">Delete</button>
      </div>
    </li>
  );
}

/* footer */
function Footer() {
  return (
    <footer className="footer">
      <p>
        Technologies and React concepts used: React, JSX, props, useState,
        component composition, conditional rendering, array methods (map,
        filter), and event handling.
      </p>
    </footer>
  );
}

export default App;
