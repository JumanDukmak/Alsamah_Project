import { createSlice } from "@reduxjs/toolkit";

const productInventorySlice = createSlice({
    name: "productsInventory",
    initialState: {
        productsInventory: [],
        isLoading: false,
        done: false,
        error: null,
        message: null,
    },

    reducers: {
        addProductsInventoryFetch: (state) => {
            state.isLoading = true;
            state.done = false;
            state.error = null;
            state.message = null;
        },

        addProductsInventorySuccess: (state, action) => {
            state.isLoading = false;
            state.productsInventory.push(action.payload.data);
            state.done = true;
            state.message = action.payload.message;
            state.error = null;
        },
        
        addProductsInventoryFailuer: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
            state.done = false;
            state.message = null;
        },

        resetData_ProductsInventory: (state) => {
            state.message = null;
            state.error = null;
        },

        getProductsInventoryFetch: (state) => {
            state.isLoading = true;
            state.error = null;
            state.productsInventory = [];
        },

        getProductsInventorySuccess: (state, action) => {
            state.isLoading = false;
            state.productsInventory = action.payload.data;
            state.error = null;
        },

        getProductsInventoryFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
            state.productsInventory = [];
        },

        updateProductsInventoryFetch: (state) => {
            state.isLoading = true;
            state.message = null;
            state.error = null;
        },

        updateProductsInventorySuccess: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message;
            state.error = null;
            const index = state.productsInventory.findIndex(
                (data) => data.id == action.payload.data.id
            );

            if (index !== -1) {
                state.productsInventory[index] = action.payload.data;
            }
        },

        updateProductsInventoryFailure: (state, action) => {
            state.isLoading = false;
            state.message = null;
            state.error = action.payload.error;
        },

        uploadProductsInventoryFileFetch: (state) => {
            state.isLoading = true;
            state.error = null;
            state.message = null;
            state.done = false;
        },
        
        uploadProductsInventoryFileSuccess: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.productsInventory.push(action.payload.data);
            state.done = true;
            state.message = action.payload.message;
        },
        
        uploadProductsInventoryFileFailure: (state, action) => {
            state.isLoading = false;
            state.message = null;
            state.error = action.payload.error;
            state.done = false;
        },
    },
});

export const { 
    addProductsInventoryFetch, 
    addProductsInventorySuccess, 
    addProductsInventoryFailuer,
    resetData_ProductsInventory,
    getProductsInventoryFetch,
    getProductsInventorySuccess,
    getProductsInventoryFailure,
    uploadProductsInventoryFileFetch,
    uploadProductsInventoryFileSuccess,
    uploadProductsInventoryFileFailure,
    updateProductsInventoryFetch,
    updateProductsInventorySuccess,
    updateProductsInventoryFailure
} = productInventorySlice.actions;
export default productInventorySlice.reducer;
