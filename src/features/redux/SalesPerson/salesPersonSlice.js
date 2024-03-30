import { createSlice } from "@reduxjs/toolkit";

const salesPersonSlice = createSlice({
    name: 'salesPersons',
    initialState: {
        salesPersons: [],
        loading: false,
        error: null,
        message: null,
    },

    reducers: {
        getsalesPersonsStart: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
            state.salesPersons = []
        },

        getsalesPersonsSuccess: (state, action) => {
            state.loading = false;
            state.salesPersons = action.payload.salesPersons;
            state.message = null;
            state.error = null;
        },

        getsalesPersonsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
            state.message = null;
            state.salesPersons = []
        },

        resetData_salesPersons: (state) => {
            state.message = null;
            state.error = null;
        },

        //-------------------------------Add-SalesPerson--------------------
        addSalesPersonStart: (state) => {
            state.loading = true;
            state.message = null;
            state.error = null;
        },

        addSalesPersonSuccess: (state, action) => {
            state.loading = false;
            state.salesPersons.push(action.payload.data);
            state.message = action.payload.message;
            state.error = null;
        },

        addSalesPersonFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.payload.error;
        },
    }
})

export const { getsalesPersonsStart, 
    getsalesPersonsSuccess, 
    getsalesPersonsFailure, 
    resetData_salesPersons,
    addSalesPersonStart, 
    addSalesPersonSuccess, 
    addSalesPersonFailure } = salesPersonSlice.actions;
export default salesPersonSlice.reducer