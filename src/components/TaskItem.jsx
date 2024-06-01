import React, { useState } from 'react';

const TaskItem = ({ task, removeTask, toggleTaskCompletion, moveUp, moveDown, canMoveUp, canMoveDown, customOrder, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing && newText.trim()) {
      editTask(task.id, newText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div 
  className={`flex items-center justify-between mb-2 p-2 border border-gray-300 rounded ${task.completed ? 'bg-green-200' : ''}`} 
>
  <div className="flex items-center">
    {isEditing ? (
      <input
        type="text"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        onBlur={handleEdit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleEdit();
        }}
        className="p-2 border border-gray-300 rounded"
      />
    ) : (
      <>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => {
            e.stopPropagation();
            toggleTaskCompletion(task.id);
          }}
          className="mr-2"
        />
        <span className={task.completed ? 'line-through' : ''}>{task.text}</span>
      </>
    )}
  </div>
  <div>
    {!task.completed && (
      <button onClick={(e) => { e.stopPropagation(); handleEdit(); }} className="px-2 py-1 bg-gray-500 text-white rounded mr-1">
        <i className="fas fa-edit"></i>
      </button>
    )}
    <button onClick={(e) => { e.stopPropagation(); removeTask(task.id); }} className="px-2 py-1 mx-2 bg-red-500 text-white rounded">
      <i className="fas fa-trash-alt"></i>
    </button>
    {customOrder && (
      <>
        <button onClick={(e) => { e.stopPropagation(); moveUp(); }} disabled={!canMoveUp} className={`px-2 py-1 ${canMoveUp ? 'bg-blue-500' : 'bg-gray-200'} text-white rounded mr-1`}>↑</button>
        <button onClick={(e) => { e.stopPropagation(); moveDown(); }} disabled={!canMoveDown} className={`px-2 py-1 ${canMoveDown ? 'bg-blue-500' : 'bg-gray-200'} text-white rounded mr-1`}>↓</button>
      </>
    )}
  </div>
</div>

  );
};

export default TaskItem;