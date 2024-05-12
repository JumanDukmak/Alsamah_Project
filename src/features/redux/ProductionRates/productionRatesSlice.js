import { createSlice } from "@reduxjs/toolkit";

const productionRatesSlice = createSlice({
    name: 'productionRates',
    initialState: {
        productionRates: [],
        loading: false,
        done: false,
        error: null,
        message: null,
    },

    reducers: {
        getProductionRatesFetch: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
            state.productionRates = []
        },

        getProductionRatesSuccess: (state, action) => {
            state.loading = false;
            state.productionRates = action.payload.productionRates;
            state.message = null;
            state.error = null;
        },

        getProductionRatesFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.payload.error;
            console.log(`the error in slice is : ${action.payload.error}`)
            state.productionRates = []
        },

        resetData_productionRates: (state) => {
            state.message = null;
            state.error = null;
        },

        addProductionRatesFetch: (state) => {
            state.loading = true;
            state.message = null;
            state.error = null;
        },

        addProductionRatesSuccess: (state, action) => {
            console.log("slice:"+action.payload);
            state.loading = false;
            state.productionRates.push(action.payload.data);
            state.message = action.payload.message;
            state.error = null;
        },

        addProductionRatesFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.payload.error;
        },

        uploadProductionRatesFileFetch: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
            state.done = false;
        },
        
        uploadProductionRatesFileSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.productionRates.push(action.payload.data);
            state.done = true;
            state.message = action.payload.message;
        },
        
        uploadProductionRatesFileFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.payload.error;
            state.done = false;
        },
    }
})

export const {
    getProductionRatesFetch,
    getProductionRatesSuccess,
    getProductionRatesFailure,
    addProductionRatesFetch,
    addProductionRatesSuccess,
    addProductionRatesFailure,
    resetData_productionRates,
    uploadProductionRatesFileFetch,
    uploadProductionRatesFileSuccess,
    uploadProductionRatesFileFailure } = productionRatesSlice.actions;
export default productionRatesSlice.reducer;