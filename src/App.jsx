import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput.jsx';
import TaskList from './components/TaskList.jsx';
import FilterBar from './components/FilterBar.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const addTask = (title) => {
    const newTask = { id: Date.now(), title, completed: false };
    setTasks([newTask, ...tasks]);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task)
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <div className="task-manager">
        <h1>📝 Task Manager</h1>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <TaskInput addTask={addTask} />
        <FilterBar filter={filter} setFilter={setFilter} />
        <TaskList tasks={filteredTasks} onToggle={toggleComplete} onDelete={deleteTask} />
      </div>
    </div>
  );
}

export default App;

