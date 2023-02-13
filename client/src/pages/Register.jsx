import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { login, register } from '@/api/user.js';

function Register() {
  const [inputs, setInputs] = useState({
    username: 'rose',
    password: '6666',
    email: '12311@qq.com'
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(inputs);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="auth">
      <h1>Register</h1>
      <form action="" autoComplete="off">
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          value={inputs.username}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          value={inputs.email}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={inputs.password}
        />
        <button onClick={handleRegister}>register</button>
        <p>This is an error!</p>
        <span>
          Don't you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
}
export default Register;
