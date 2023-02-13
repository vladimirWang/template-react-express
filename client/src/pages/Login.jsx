import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '@/api/user.js';
import { AuthContext } from '../context/authContext';

function Login() {
  const ctx = useContext(AuthContext);
  const { userLogin, currentUser } = ctx;
  console.log(ctx, '----user');
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await userLogin(inputs);
      navigate('/');
    } catch (err) {
      console.error(err.message, '---登录异常');
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="auth">
      <h1>Login</h1>
      <form action="">
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          value={inputs.username}
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />
        <button onClick={handleLogin}>login</button>
        <p>This is an error!</p>
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
}
export default Login;
