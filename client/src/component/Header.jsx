import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const LogoutToken = () => {
    localStorage.removeItem("token");
    navigate('/login')
  };

  return (
    <header>
      <div className="btns">
        {!localStorage.getItem("token") ? (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        ) : (
          <button onClick={LogoutToken}>Logout</button>
        )}
      </div>
    </header>
  );
};

export default Header;
