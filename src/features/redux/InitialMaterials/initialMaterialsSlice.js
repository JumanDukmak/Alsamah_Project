import { createSlice } from "@reduxjs/toolkit";

const initialMaterialsSlice = createSlice({
    name: 'initialMaterials',
    initialState: {
        initialMaterials: [],
        loading: false,
        InitialMaterialsProduct:null,
        done: false,
        error: null,
        message: null,
    },

    reducers: {
        getInitialMaterialsFetch: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
            state.initialMaterials = []
        },

        getInitialMaterialsSuccess: (state, action) => {
            state.loading = false;
            state.initialMaterials = action.payload.initialMaterials;
            state.message = null;
            state.error = null;
        },

        getInitialMaterialsFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.payload.error;
            state.initialMaterials = []
        },

        resetData_initialMaterials: (state) => {
            state.message = null;
            state.error = null;
        },

        addInitialMaterialsFetch: (state) => {
            state.loading = true;
            state.message = null;
            state.error = null;
        },

        addInitialMaterialsSuccess: (state, action) => {
            console.log("slice:"+action.payload);
            state.loading = false;
            state.initialMaterials.push(action.payload.data);
            state.message = action.payload.message;
            state.error = null;
        },

        addInitialMaterialsFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.payload.error;
        },

        uploadInitialMaterialsFileFetch: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
            state.done = false;
        },
        
        uploadInitialMaterialsFileSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.initialMaterials.push(action.payload.data);
            state.done = true;
            state.message = action.payload.message;
        },
        
        uploadInitialMaterialsFileFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.payload.error;
            state.done = false;
        },

        //-------------------------------UPLOAD ------------------------------------
         uploadInitialMaterialsProductFetch: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
            state.done = false;
        },
        
        uploadInitialMaterialsProductSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.InitialMaterialsProduct = action.payload.InitialMaterialsProduct;
            state.done = true;
            state.message = action.payload.message;
        },
        
        uploadInitialMaterialsProductFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.payload.error;
            state.done = false;
        },



        //-------------------------------ADD ------------------------------------
        addInitialMaterialsProductFetch: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
            state.done = false;
        },
        
        addInitialMaterialsProductSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.InitialMaterialsProduct = action.payload.InitialMaterialsProduct;
            state.done = true;
            state.message = action.payload.message;
        },
        
        addInitialMaterialsProductFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.payload.error;
            state.done = false;
        },



        //-------------------------------Update ------------------------------------
        updateInitialMaterialsProductFetch: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
            state.done = false;
        },
        
        updateInitialMaterialsProductSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.InitialMaterialsProduct = action.payload.InitialMaterialsProduct;
            state.done = true;
            state.message = action.payload.message;
        },
        
        updateInitialMaterialsProductFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.payload.error;
            state.done = false;
        },





    }
})

export const {
    addInitialMaterialsFetch,
    addInitialMaterialsSuccess,
    addInitialMaterialsFailure,
    getInitialMaterialsFetch,
    getInitialMaterialsSuccess,
    getInitialMaterialsFailure,
    uploadInitialMaterialsFileFetch,
    uploadInitialMaterialsFileSuccess,
    uploadInitialMaterialsFileFailure,
    resetData_initialMaterials,
    uploadInitialMaterialsProductFailure,
    uploadInitialMaterialsProductSuccess,
    uploadInitialMaterialsProductFetch,
    addInitialMaterialsProductFetch,
    addInitialMaterialsProductSuccess,
    addInitialMaterialsProductFailure,
    updateInitialMaterialsProductFetch,
    updateInitialMaterialsProductSuccess,
    updateInitialMaterialsProductFailure

} = initialMaterialsSlice.actions;
export default initialMaterialsSlice.reducer;