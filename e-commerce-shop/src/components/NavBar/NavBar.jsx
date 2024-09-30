import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./NavBar.css";
import { doLogOut } from "../../redux/authSlice";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from "@mui/material"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Dropdown from "antd/es/dropdown/dropdown";

const NavBar = () => {
  const user = useSelector((state) => state.auth);
  const fvts = useSelector((state) => state.wishlist);
  
  const dispatch = useDispatch();

  const navigate = useNavigate();

 

  const handleLogout = () => {
    dispatch(doLogOut());
    navigate("/login");
  };


  const items = fvts.map((fvt) => {
    return {
      key: fvt.id,
      label: (
        <p
          style={{
            borderBottom: "1px solid black",
            margin: "8px",
            width: "100px",
          }}
          onClick={() => {
            navigate(`/product/${fvt.productId}`)
          }

          }
        >
          {fvt.name}
        </p>
      ),
    };
  });

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
          <>
           
           <Link to="/orders" className="orderLink">
              <ShoppingCartIcon color="wheat" />
              <span>Orders</span>
              </Link>
            
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
              style={{
                width: "200px",
              }}
            >
              <Badge badgeContent={fvts.length} color="success">
                <FavoriteBorderIcon style={{ color: "red" }} />
              </Badge>
            </Dropdown>

          <button onClick={handleLogout} to="/login" className="logout-btn">
            Logout
          </button>
          </>
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
