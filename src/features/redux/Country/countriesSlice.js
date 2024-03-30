import { createSlice } from "@reduxjs/toolkit";

const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        countries: [],
        loading: false,
        error: null,
        message: null
    },

    reducers: {
        getCountriesStart: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
            state.countries = []
        },

        getCountriesSuccess: (state, action) => {
            state.loading = false;
            state.countries = action.payload.countries;
            state.message = null;
            state.error = null;
        },

        getCountriesFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.payload.error;
            console.log(`the error in slice is : ${action.payload.error}`)
            state.countries = []
        },

        resetData_Country: (state) => {
            state.message = null;
            state.error = null;
        },

        //-----------------------add-Country------------------------
        addCountryStart: (state) => {
            state.loading = true;
            state.message = null;
            state.error = null;
        },

        addCountrySuccess: (state, action) => {
            state.loading = false;
            state.countries.push(action.payload.data);
            state.message = action.payload.message;
            state.error = null;
        },

        addCountryFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.payload.error;
        },
    }
})

export const { getCountriesStart, 
    getCountriesSuccess, 
    getCountriesFailure,
    resetData_Country,
    addCountryStart,
    addCountrySuccess, 
    addCountryFailure } = countriesSlice.actions;
export default countriesSlice.reducer