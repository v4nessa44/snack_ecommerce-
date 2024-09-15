import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home'
import NavBar from './components/NavBar/NavBar';
import Login from './pages/Login/Login';
import Products from './pages/Products/Products';


function App() {
  

  return (
    <div>
     <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<h1>Ok</h1>} />
      </Routes>
      

    </div>
  )
}

export default App
