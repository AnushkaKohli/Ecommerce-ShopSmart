import React, { Fragment, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if(error){
      return alert.error(error)
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ShopSmart" />

          <div className="banner">
            <h1>Welcome to ShopSmart</h1>
            <p>
              Get on board for an exclusive journey to find the best products
              for you!
            </p>

            <a href="#container">
              <button>
                Shop Now <FiShoppingCart />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Popular Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
