import { createSlice } from "@reduxjs/toolkit";


const MaterialOnShippingSlice = createSlice({
    name: "materialOnShipping",
    initialState: {
        materialOnShipping: null,
        materialOnShippingFile:null,
        isLoading: false,
        done: false,
        error: null,
        message: null,
    },

    reducers: {
        addMaterialOnShippingFetch: (state) => {
            console.log(`the dddddddddd`)
            state.isLoading = true;
            state.done = false;
            state.error = null;
            state.message = null;
        },

        addMaterialOnShippingSuccess: (state, action) => {
            console.log(`the tttttttttttttt`)
            state.isLoading = false;
            state.materialOnShipping=action.payload.data;
            state.done = true;
            state.message = action.payload.message;
            state.error = null;
        },
        
        addMaterialOnShippingFailuer: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
            state.done = false;
            state.message = null;
        },

        resetData_MaterialOnShipping: (state) => {
            state.message = null;
            state.error = null;
        },

      



     

        uploadMaterialOnShippingFileFetch: (state) => {
            state.isLoading = true;
            state.error = null;
            state.message = null;
            state.done = false;
        },
        
        uploadMaterialOnShippingFileSuccess: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.materialOnShippingFile=action.payload.data;
            state.done = true;
            state.message = action.payload.message;
        },
        
        uploadMaterialOnShippingFileFailure: (state, action) => {
            state.isLoading = false;
            state.message = null;
            state.error = action.payload.error;
            state.done = false;
        },



     


    },
});

export const { 
   addMaterialOnShippingFailuer,addMaterialOnShippingSuccess,addMaterialOnShippingFetch,
   uploadMaterialOnShippingFileFailure
   ,uploadMaterialOnShippingFileSuccess,uploadMaterialOnShippingFileFetch,resetData_MaterialOnShipping
} = MaterialOnShippingSlice.actions;
export default MaterialOnShippingSlice.reducer;
