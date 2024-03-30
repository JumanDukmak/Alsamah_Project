import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        loading: false,
        error: null,
        message: null
    },

    reducers: {
        getCategoriesStart: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
            state.categories = []
        },

        getCategoriesSuccess: (state, action) => {
            state.loading = false;
            state.categories = action.payload.categories;
            state.message = null;
            state.error = null;
        },

        getCategoriesFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.payload.error;
            console.log(`the error in slice is : ${action.payload.error}`)
            state.categories = []
        },

        resetData_category: (state) => {
            state.message = null;
            state.error = null;
        },

        //-----------------------add-Country------------------------
        addCategoryStart: (state) => {
            state.loading = true;
            state.message = null;
            state.error = null;
        },

        addCategorySuccess: (state, action) => {
            state.loading = false;
            state.categories.push(action.payload.data);
            state.message = action.payload.message;
            state.error = null;
        },

        addCategoryFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.payload.error;
        },
    }
})

export const { getCategoriesStart, 
    getCategoriesSuccess, 
    getCategoriesFailure, 
    resetData_category,
    addCategoryStart, 
    addCategorySuccess, 
    addCategoryFailure } = categoriesSlice.actions;
export default categoriesSlice.reducer