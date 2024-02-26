import {combineReducers, applyMiddleware, compose} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';

import { 
    productDetailsReducer, 
    productsReducer 
} from './reducers/productReducer';

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer
});

let initialState = {};

const middlewareEnhancer = applyMiddleware(thunk);
const composedEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose(middlewareEnhancer);      

const store = configureStore(
    {reducer: reducer},
    initialState,
    composedEnhancers
);

export default store;
