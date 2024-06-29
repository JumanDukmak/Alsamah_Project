import { createSlice } from "@reduxjs/toolkit";

const productionPlane_Slice = createSlice({
    name: "productionPlane",
    initialState: {
        products:[],
        total:[],
        alerts: [],
        loading: false,
        done: false,
        error: null,
        message: null,
},

reducers: {
    getProductionPlaneFetch: (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
    },

    getProductionPlaneSuccess: (state, action) => {
        state.loading = false;
        state.products = action.payload.data.products;
        state.total = action.payload.data.total;
        state.alerts = action.payload.data.alerts;
        state.message = action.payload.message;
        state.error = null;
    },

    getProductionPlaneFailure: (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload.error;
    },

    resetData_productionPlane: (state) => {
        state.message = null;
        state.error = null;
    },
},
});

export const {
    getProductionPlaneFetch,
    getProductionPlaneSuccess,
    getProductionPlaneFailure,
    resetData_productionPlane
} = productionPlane_Slice.actions;
export default productionPlane_Slice.reducer;
