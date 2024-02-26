import React, { Fragment, useEffect } from 'react';
import Carousel from "react-material-ui-carousel";
import {useSelector, useDispatch} from "react-redux";
import { useParams } from 'react-router-dom';
import {
    getProductDetails,
} from "../../actions/productAction";
import "./ProductDetails.css";

const ProductDetails = ({match} ) => {

    const dispatch = useDispatch();
    const {product, loading, error} = useSelector((state) => state.productDetails);
    const {id} = useParams();
    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id])

  return (
    <Fragment>
        <div className="ProductDetails">
            <div>
                <Carousel>
                    {product.images && 
                    product.images.map((item, i) => (
                        <img 
                            className='CaraouselImage'
                            key={item.url}
                            src={item.url}
                            alt={`Slide ${i}`}
                        />
                    ))}
                </Carousel>
            </div>
        </div>
    </Fragment>
  );
};

export default ProductDetails;