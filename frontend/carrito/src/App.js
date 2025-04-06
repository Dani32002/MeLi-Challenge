import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './screens/Products';
import Cart from './screens/Cart';
import React, { createContext, useState } from 'react';
import Login from './screens/Login';
import Register from './screens/Register';

export const AppStateContext = createContext();

function App() {

  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  return (
    <>
      <AppStateContext.Provider value={{ user, setUser, products, setProducts }}>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/user" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </BrowserRouter>
      </AppStateContext.Provider>
      
    </> 
  );
}

export default App;
