import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import Products from './pages/Products';
import './styles.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
