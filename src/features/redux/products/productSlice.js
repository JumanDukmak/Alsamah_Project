import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        files: [],
        meta: [],
        product: null,
        isLoading: false,
        done: false,
        id: 0,
        error: null,
        message: null,
    },

    reducers: {
        //add products slice
        addProductsFetch: (state) => {
            state.isLoading = true;
            state.done = false;
            state.error = null;
            state.message = null;
        },

        addProductsSuccess: (state, action) => {
            state.isLoading = false;
            state.products.push(action.payload.data);
            state.done = true;
            state.message = action.payload.message;
            state.error = null;
        },
        
        addProductsFailuer: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
            state.done = false;
            state.message = null;
        },

        resetData: (state) => {
            state.message = null;
            state.error = null;
        },

        //get products slice
        getProductsFetch: (state) => {
            state.isLoading = true;
            state.error = null;
            state.products = [];
        },

        getProductsSuccess: (state, action) => {
            state.isLoading = false;
            state.products = action.payload.products;
            state.meta = action.payload.meta;
            state.error = null;
        },

        getProductsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
            state.products = [];
        },

        //uploud file to add products from excel
        uploadFileFetch: (state) => {
            state.isLoading = true;
            state.error = null;
            state.message = null;
            state.done = false;
        },
        
        uploadFileSuccess: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.files.push(action.payload.data);
            state.done = true;
            state.message = action.payload.message;
        },
        
        uploadFileFailure: (state, action) => {
            state.isLoading = false;
            state.message = null;
            state.error = action.payload.error;
            state.done = false;
        },

        //get product card slice
        getProductCardFetch: (state) => {
            state.isLoading = true;
            state.error = null;
            state.product = null;
        },

        getProductCardSuccess: (state, action) => {
            state.isLoading = false;
            state.product = action.payload.products;
            state.materialProduct=action.payload.products.InitialMaterials
            state.error = null;
        },

        getProductCardFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
            state.product = null;
        },
       



       







    },






});

export const { 
    addProductsFetch, 
    addProductsSuccess, 
    addProductsFailuer,
    resetData,
    getProductsFetch,
    getProductsSuccess,
    getProductsFailure,
    uploadFileFetch,
    uploadFileSuccess,
    uploadFileFailure,
    getProductCardFetch,
    getProductCardSuccess,
    getProductCardFailure,
    
} = productSlice.actions;
export default productSlice.reducer;
