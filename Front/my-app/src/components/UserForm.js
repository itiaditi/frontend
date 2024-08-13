import React, { useState } from 'react';

function UserForm({ onCancel, onAddUser }) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddUser({ email, firstName, lastName, password });
  };

  return (
    <div className="form-popup">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">SIGN UP</button>
        <button type="button" onClick={onCancel}>
          CANCEL
        </button>
      </form>
    </div>
  );
}

export default UserForm;
