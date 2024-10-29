import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./component/Header";
import {Outlet} from 'react-router-dom'

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer  autoClose ={2000}/>
      <div className="main">
        <Outlet/>
      </div>
    </>
  );
};

export default App;
