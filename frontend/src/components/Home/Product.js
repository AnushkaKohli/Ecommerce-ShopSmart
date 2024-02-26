import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { BsCart4 } from 'react-icons/bs';

const Product = ({product}) => {
  const options = {
    edit: false,
    color: "#c4c3c2",
    activeColor: "#fcba03",
    size:window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true
  }
  return (
    <Link className='productCard' to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name}/>
      <p>{product.name}</p>
        <ReactStars {...options} /> 
        <div> ({product.numOfReviews} Reviews)</div>
      <span>{`₹${product.price}`}</span>
      <button><BsCart4 className='cartIcon'/>Add to Cart</button>
    </Link>
  )
}

export default Product;