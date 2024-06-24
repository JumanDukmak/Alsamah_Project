import { createSlice } from "@reduxjs/toolkit";

const initialMaterialsInventorySlice = createSlice({
    name: "materialsInventory",
    initialState: {
        materialsInventory: [],
        isLoading: false,
        done: false,
        error: null,
        message: null,
    },

    reducers: {
        addMaterialsInventoryFetch: (state) => {
            state.isLoading = true;
            state.done = false;
            state.error = null;
            state.message = null;
        },

        addMaterialsInventorySuccess: (state, action) => {
            state.isLoading = false;
            state.materialsInventory.push(action.payload.data);
            state.done = true;
            state.message = action.payload.message;
            state.error = null;
        },
        
        addMaterialsInventoryFailuer: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
            state.done = false;
            state.message = null;
        },

        resetData_MaterialsInventory: (state) => {
            state.message = null;
            state.error = null;
        },

        getMaterialsInventoryFetch: (state) => {
            state.isLoading = true;
            state.error = null;
            state.products = [];
        },

        getMaterialsInventorySuccess: (state, action) => {
            state.isLoading = false;
            state.materialsInventory = action.payload.data;
            state.meta = action.payload.meta;
            state.error = null;
        },

        getMaterialsInventoryFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
            state.materialsInventory = [];
        },

        uploadMaterialsInventoryFileFetch: (state) => {
            state.isLoading = true;
            state.error = null;
            state.message = null;
            state.done = false;
        },
        
        uploadMaterialsInventoryFileSuccess: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.materialsInventory.push(action.payload.data);
            state.done = true;
            state.message = action.payload.message;
        },
        
        uploadMaterialsInventoryFileFailure: (state, action) => {
            state.isLoading = false;
            state.message = null;
            state.error = action.payload.error;
            state.done = false;
        },
    },
});

export const { 
    addMaterialsInventoryFetch, 
    addMaterialsInventorySuccess, 
    addMaterialsInventoryFailuer,
    resetData_MaterialsInventory,
    getMaterialsInventoryFetch,
    getMaterialsInventorySuccess,
    getMaterialsInventoryFailure,
    uploadMaterialsInventoryFileFetch,
    uploadMaterialsInventoryFileSuccess,
    uploadMaterialsInventoryFileFailure,
} = initialMaterialsInventorySlice.actions;
export default initialMaterialsInventorySlice.reducer;
