import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, removeTask, toggleTaskCompletion, setTasks, customOrder, editTask }) => {
  const moveTask = (id, direction) => {
    const index = tasks.findIndex(task => task.id === id);
    if (index < 0 || index + direction < 0 || index + direction >= tasks.length) return;

    const newTasks = [...tasks];
    const taskToMove = newTasks[index];
    newTasks.splice(index, 1);  // Remove the task from its current position
    newTasks.splice(index + direction, 0, taskToMove);  // Insert the task at the new position

    setTasks(newTasks);
  };

  return (
    <div>
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          removeTask={removeTask}
          toggleTaskCompletion={toggleTaskCompletion}
          moveUp={() => moveTask(task.id, -1)}
          moveDown={() => moveTask(task.id, 1)}
          canMoveUp={index > 0}
          canMoveDown={index < tasks.length - 1}
          customOrder={customOrder}
          editTask={editTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
