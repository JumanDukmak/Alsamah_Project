import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        files: [],
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
        },

        getProductsSuccess: (state, action) => {
            state.isLoading = false;
            state.products = action.payload.products;
            state.error = null;
        },

        getProductsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
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
    uploadFileFailure
} = productSlice.actions;
export default productSlice.reducer;
