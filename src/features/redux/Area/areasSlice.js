import { createSlice } from "@reduxjs/toolkit";

const areasSlice = createSlice({
    name: 'areas',
    initialState: {
        areas: [],
        loading: false,
        error: null,
        message: null,
    },

    reducers: {
        getAreasStart: (state) => {
            state.loading = true;
            state.error = null;
            state.areas = [];
            state.message = null;
        },

        getAreasSuccess: (state, action) => {
            state.loading = false;
            state.areas = action.payload.areas;
            state.error = null;
            state.message = null;
        },

        getAreasFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
            state.areas = [];
            state.message = null;
        },

        resetData_Areas: (state) => {
            state.message = null;
            state.error = null;
        },

        //-----------------------------Add_Area---------------------
        addAreaStart: (state) => {
            state.loading = true;
            state.message = null;
            state.error = null;
        },

        addAreaSuccess: (state, action) => {
            state.loading = false;
            state.areas.push(action.payload.data);
            console.log(`the msg is ${action.payload.message}`)
            state.message = action.payload.message;
            state.error = null;
        },

        addAreaFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            console.log(action.payload.error)
            state.error = action.payload.error;
        },
    }
})

export const { 
    getAreasStart, 
    getAreasSuccess,
    getAreasFailure, 
    resetData_Areas,
    addAreaStart, 
    addAreaSuccess, 
    addAreaFailure } = areasSlice.actions;
export default areasSlice.reducer