import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import WebFont from 'webfontloader';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetails from "./components/Product/ProductDetails";

function App() {
  React.useEffect(() => {
    WebFont.load({
      google:{
        families: ["Roboto", "Droid Sans", "Chilanka", "Satisfy", "Merriweather", "Roboto Slab"]
      }
    });
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/product/:id" exact element={<ProductDetails/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
