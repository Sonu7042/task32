import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "./Api";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${api}/login`, user);
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (err) {
      toast.error("wrong user")

    }
  };

  
  return (
    <div className="registerForm">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          onChange={handleOnChange}
          name="username"
          value={user.username}
          placeholder="Username"
          required
        />
        <input
          type="password"
          onChange={handleOnChange}
          name="password"
          value={user.password}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <p style={{ textAlign: "center", fontSize: "18px" }}>
          Don't have a account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            SignUp
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
