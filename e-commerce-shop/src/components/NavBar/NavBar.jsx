import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./NavBar.css";
import { doLogOut } from "../../redux/authSlice";

const NavBar = () => {
  const user = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(doLogOut());
    navigate("/login");
  };

  return (
    <nav>
      <div className="logo">
        <span>
          <i className="fa-duotone fa-solid fa-burger"></i>
        </span>
        <span>Snack_Attack</span>
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        {user.login ? (
          <button onClick={handleLogout} to="/login" className="logout-btn">
            Logout
          </button>
        ) : (
          <Link to="/login" className="highlight">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
