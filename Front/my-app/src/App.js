import React, { useState, useEffect } from 'react';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import DeleteUserPrompt from './components/DeleteUserPrompt';
import axios from 'axios';
import './App.css'
function App() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://usermanagement-zczb.onrender.com/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUserSelect = (id, isChecked) => {
    if (isChecked) {
      setSelectedUsers([...selectedUsers, id]);
    } else {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    }
  };

  const handleUserDelete = async () => {
    if (userToDelete) {
      try {
        await axios.delete(`https://backend-0j6o.onrender.com/api/users/${userToDelete}`);
        setUsers(users.filter((user) => user._id !== userToDelete));
        setUserToDelete(null);
        setShowDeletePrompt(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUserAdd = async (user) => {
    try {
      const response = await axios.post('https://backend-0j6o.onrender.com/api/users', user);
      setUsers([...users, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserExport = async () => {
    try {
      const response = await axios.post('https://backend-0j6o.onrender.com/api/users/export', { ids: selectedUsers }, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <h1>User Management</h1>
     <div>
       <button onClick={() => setShowForm(true)}>SIGN UP</button>
      <button onClick={handleUserExport} disabled={selectedUsers.length === 0}>
        EXPORT
      </button>
     </div>
      <UserTable
        users={users}
        onUserSelect={handleUserSelect}
        onDeleteUser={(userId) => {
          setUserToDelete(userId);
          setShowDeletePrompt(true);
        }}
      />
      {showForm && (
        <UserForm
          onCancel={() => setShowForm(false)}
          onAddUser={handleUserAdd}
        />
      )}
      {showDeletePrompt && (
        <DeleteUserPrompt
          onCancel={() => setShowDeletePrompt(false)}
          onDelete={handleUserDelete}
        />
      )}
    </div>
  );
}

export default App;
