import React from 'react';

function DeleteUserPrompt({ onCancel, onDelete }) {
  return (
    <div className="prompt-popup">
      <div className="prompt-content">
        <p>Are you sure you want to delete this user?</p>
        <button onClick={onDelete}>DELETE</button>
        <button onClick={onCancel}>CANCEL</button>
      </div>
    </div>
  );
}

export default DeleteUserPrompt;
