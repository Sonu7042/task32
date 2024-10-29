import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "./Api";

const Home = () => {
  const [user, setUser] = useState([]);
  const navigate= useNavigate()


  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/login") 
    }
    else{
      navigate('/')
    }
  }, [])

 
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios(`${api}`, {
          headers:{
            "Content-Type": "application/json",
            token: localStorage.getItem("token")
          }

        })
        
        setUser(response.data);
      };

      fetchData();
    }, []);
  
 

  return (
    <div className="fetchDataDiv">
      <h1>Logged Users</h1>
      
      {user.map((item, index) => {
        return (
          <div className="dataWrapper" key={index}>
            <div>LoggedIn</div>
            <div>{item.username}</div>
          </div>
        );
      })}
    </div>
  );
};


export default Home;
