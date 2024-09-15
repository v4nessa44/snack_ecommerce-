import React from 'react';
import { Link } from "react-router-dom";
import "./Home.css"

const Home = () => {
  return (
      <div className="home">
          <div className="content">
              <h1>Snacks Just For You!</h1>
              <p>Buy anything from our store</p>
              <Link to="/products">Scroll for products</Link>

          </div>
          
    </div>
  )
}

export default Home