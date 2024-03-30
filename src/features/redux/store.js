import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas';
import productSlice from './products/productSlice';
import countriesSlice from './Country/countriesSlice';
import areasSlice from './Area/areasSlice';
import salesPersonSlice from './SalesPerson/salesPersonSlice';
import categoriesSlice from './Category/categoriesSlice';
import brandsSlice from './Brands/brandsSlice';
import shopsSlice from './Shops/shopsSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer:{
        products: productSlice,
        shops: shopsSlice,
        countries: countriesSlice,
        areas: areasSlice,
        salesPersons: salesPersonSlice,
        brands: brandsSlice,
        categories: categoriesSlice,
    },
    middleware: ()=>[sagaMiddleware],
})

sagaMiddleware.run(rootSaga);

