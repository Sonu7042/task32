import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "./Api";

const Register = () => {
  const [user, setUser] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post(`${api}/register`, user);
      console.log(response);
      setUser({ username: "", password: "" });
  
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }

    }
    catch(error){
      toast.error("Already Exist User")
    }
   
  };




  return (
    <div className="registerForm">
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
