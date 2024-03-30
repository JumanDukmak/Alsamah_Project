import { createSlice } from "@reduxjs/toolkit";

const brandsSlice = createSlice({
    name: 'brands',
    initialState: {
        brands: [],
        loading: false,
        error: null,
        message: null
    },

    reducers: {
        getBrandsStart: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
            state.brands = []
        },

        getBrandsSuccess: (state, action) => {
            state.loading = false;
            state.brands = action.payload.brands;
            state.message = null;
            state.error = null;
        },

        getBrandsFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.payload.error;
            console.log(`the error in slice is : ${action.payload.error}`)
            state.brands = []
        },

        resetData_brand: (state) => {
            state.message = null;
            state.error = null;
        },

        //-----------------------add-Country------------------------
        addBrandStart: (state) => {
            state.loading = true;
            state.message = null;
            state.error = null;
        },

        addBrandSuccess: (state, action) => {
            state.loading = false;
            state.brands.push(action.payload.data);
            state.message = action.payload.message;
            state.error = null;
        },

        addBrandFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.payload.error;
        },
    }
})

export const {
    getBrandsStart, 
    getBrandsSuccess, 
    getBrandsFailure,
    resetData_brand,
    addBrandFailure, 
    addBrandSuccess, 
    addBrandStart } = brandsSlice.actions;
export default brandsSlice.reducer;
