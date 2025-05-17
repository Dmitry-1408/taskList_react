import { useState } from "react";

function App() {
  /* пустой массив который будет заполняться автоматически */
  const [tasks, setTasks] = useState([]);
  /* сортировка по типу */
  const [sortType, setSortType] = useState("date"); //priority
  /* сортировка по дате */
  const [sortOrder, setSortOrder] = useState("asc"); //desc (asc возрастание, desc убывание)
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

  /* функция которая будет правильно формировать массив */
  function addTask(task) {
    setTasks([...tasks, { ...task, complited: false, id: Date.now() }]);
  }

  /* кнопка delete */
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  /* кнопка complete */
  function completeTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, complited: true } : task
      )
    );
  }

  function sortTask(tasks) {
    return tasks.slice().sort((a, b) => {
      if (sortType === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return sortOrder == "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      } else {
        return sortOrder === "asc"
          ? new Date(a.deadLine) - new Date(b.deadLine)
          : new Date(b.deadLine) - new Date(a.deadLine);
      }
    });
  }

  /* функция сортировки */
  function toggleSortOrder(type) {
    if (sortType === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortType(type);
      setSortOrder("asc");
    }
  }

  const activeTasks = sortTask(tasks.filter((task) => !task.complited));
  const complitedTasks = tasks.filter((task) => task.complited);

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
        {openSection.tasklist && <TaskForm addTask={addTask} />}
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
          <button
            className={`sort-button ${sortType === "date" ? "active" : ""}`}
            onClick={() => toggleSortOrder("date")}
          >
            By Date{" "}
            {sortType === "date" && (sortOrder === "asc" ? "\u2191" : "\u2193")}
          </button>
          <button
            className={`sort-button ${sortType === "priority" ? "active" : ""}`}
            onClick={() => toggleSortOrder("priority")}
          >
            By Priority{" "}
            {sortType === "priority" &&
              (sortOrder === "asc" ? "\u2191" : "\u2193")}
          </button>
        </div>
        {openSection.task && (
          <TaskList
            completeTask={completeTask}
            deleteTask={deleteTask}
            activeTasks={activeTasks}
          />
        )}
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
        {openSection.complitedTasks && (
          <CompletedTaskList
            deleteTask={deleteTask}
            complitedTasks={complitedTasks}
          />
        )}
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
}

/* 1 task */
function TaskForm({ addTask }) {
  /* создание массива task из формы */
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadLine, setDeadLine] = useState("");

  /* функция отправки формы */
  function handleSubmit(e) {
    e.preventDefault(); /*  отменяет стандартную отправку формы */
    if (title.trim() && deadLine) {
      addTask({ title, priority, deadLine });
    } /* отправляет в массив */
    setTitle("");
    setPriority("Low");
    setDeadLine("");
  }

  return (
    <form action="" className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="Task title"
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="datetime-local"
        value={deadLine}
        required
        onChange={(e) => setDeadLine(e.target.value)}
      />
      <button type="submit">Add task</button>
    </form>
  );
}

/* 2 task */
function TaskList({ activeTasks, deleteTask, completeTask }) {
  console.log(activeTasks);
  return (
    <ul className="task-list">
      {activeTasks.map((task) => (
        <TaskItem
          completeTask={completeTask}
          deleteTask={deleteTask}
          task={task}
          key={task.id}
        />
      ))}
    </ul>
  );
}

/* 3 task */
function CompletedTaskList({ complitedTasks, deleteTask }) {
  return (
    <ul className="completed-task-list">
      {complitedTasks.map((task) => (
        <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
      ))}
    </ul>
  );
}

function TaskItem({ task, deleteTask, completeTask }) {
  const { title, priority, deadLine, id, complited } = task;

  return (
    <li className={`task-item ${priority.toLowerCase()}`}>
      <div className="task-info">
        <div>
          {title} <strong>{priority}</strong>
        </div>
        <div className="task-deadline">
          Due: {new Date(deadLine).toLocaleString()}
        </div>
      </div>
      <div className="task-buttons">
        {!complited && (
          <button className="complete-button" onClick={() => completeTask(id)}>
            Complete
          </button>
        )}
        <button className="delete-button" onClick={() => deleteTask(id)}>
          Delete
        </button>
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
