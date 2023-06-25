import React, { Fragment } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import "./Home.css";
import Product from "./Product.js";

//Temporary
const product = {
  name: "Camera",
  images: [{url: "https://cdn.shopify.com/s/files/1/0374/7024/0899/products/Mini12_1.jpg?v=1680022735"}],
  price: "₹7499",
  _id:"instax"
};

const Home = () => {
  return (
    <Fragment>
        <div className="banner">
            <h1>Welcome to ShopSmart</h1>
            <p>Get on board for an exclusive journey to find the best products for you!</p>

            <a href="#container">
                <button>
                    Shop Now <FiShoppingCart/>
                </button>
            </a>
        </div>
        <h2 className="homeHeading">Popular Products</h2>
        <div className="container" id='container'>
          <Product product={product} />
        </div>
    </Fragment>
  )
}

export default Home