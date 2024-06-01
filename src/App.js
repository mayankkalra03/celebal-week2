import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const localTasks = localStorage.getItem('tasks');
      return localTasks ? JSON.parse(localTasks) : [];
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error);
      return [];
    }
  });
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
    }
  }, [tasks]);

  const addTask = (taskText) => {
    const newTask = { id: Date.now(), text: taskText, completed: false };
    setTasks(currentTasks => [...currentTasks, newTask]);
  };

  const editTask = (id, newText) => {
    setTasks(currentTasks =>
      currentTasks.map(task => 
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks(currentTasks => currentTasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(currentTasks => currentTasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOrder === 'newest') return b.id - a.id;
    if (sortOrder === 'oldest') return a.id - b.id;
    return 0;
  });

  return (
    <div className="container mx-auto p-4 w-[70%]">
      <h1 className="text-3xl text-blue-500 font-bold mb-14 text-center">To-Do App</h1>
      
      <div className="mb-4 flex justify-between">
        <div>
          <button onClick={() => setFilter('all')} className={`px-4 py-2 ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}>All</button>
          <button onClick={() => setFilter('completed')} className={`px-4 py-2 ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded ml-2`}>Completed</button>
          <button onClick={() => setFilter('pending')} className={`px-4 py-2 ${filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded ml-2`}>Pending</button>
        </div>
        
        <div>
          <button onClick={() => setSortOrder('newest')} className={`px-4 py-2 ${sortOrder === 'newest' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}>Newest</button>
          <button onClick={() => setSortOrder('oldest')} className={`px-4 py-2 ${sortOrder === 'oldest' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded ml-2`}>Oldest</button>
          <button onClick={() => setSortOrder('custom')} className={`px-4 py-2 ${sortOrder === 'custom' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded ml-2`}>Custom Sort</button>
        </div>
      </div>
      <div className="mb-4">
          <input
            type="text"
            placeholder="Add a task"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                addTask(e.target.value);
                e.target.value = '';
              }
            }}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
      <TaskList tasks={sortedTasks} removeTask={removeTask} toggleTaskCompletion={toggleTaskCompletion} setTasks={setTasks} customOrder={sortOrder === 'custom'} editTask={editTask} />
    </div>
  );
}

export default App;
