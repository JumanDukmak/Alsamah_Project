import { createSlice } from "@reduxjs/toolkit";

const purchasesPlanSlice = createSlice({
    name: "purchasesPlan",
    initialState: {
    materials:[],
    total:[],
    loading: false,
    done: false,
    error: null,
    message: null,
},

reducers: {
    getPurchasesPlanFetch: (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
    },

    getPurchasesPlanSuccess: (state, action) => {
        state.loading = false;
        state.materials = action.payload.data.materials;
        state.total = action.payload.data.total;
        state.message = action.payload.message;
        state.error = null;
    },

    getPurchasesPlanFailure: (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload.error;
    },

    resetData_PurchasesPlan: (state) => {
        state.message = null;
        state.error = null;
    },
},

});

export const {
    getPurchasesPlanFetch,
    getPurchasesPlanSuccess,
    getPurchasesPlanFailure,
    resetData_PurchasesPlan
} = purchasesPlanSlice.actions;
export default purchasesPlanSlice.reducer;
