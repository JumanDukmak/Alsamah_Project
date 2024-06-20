import { createSlice } from "@reduxjs/toolkit";

const initialMaterialsSlice = createSlice({
    name: 'initialMaterials',
    initialState: {
        
        initialMaterials: [],
        initialMaterials_list:[],
        materialsProductFile:null,
        loading: false,
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


//------------------------------------------------------------------

 //uploud file to add products from excel
 uploadMaterialsProductFileFetch: (state) => {
    state.loading = true;
    state.error = null;
    state.message = null;
    state.done = false;
},

uploadMaterialsProductFileSuccess: (state, action) => {
    state.loading = false;
    state.error = null;
    state.materialsProductFile=action.payload.data;
    state.done = true;
    state.message = action.payload.message;
},

uploadMaterialsProductFileFailure: (state, action) => {
    state.loading = false;
    state.message = null;
    state.error = action.payload.error;
    state.done = false;
},


//--------------------------Material-Product-----------------------

addMaterialProductFetch: (state,action) => {
state.loading = true;
state.done = false;
state.error = null;
state.message = null;
},

addMaterialProductSuccess: (state, action) => {
state.loading = false;
state.initialMaterials.push(action.payload.data);
state.done = true;
state.message = action.payload.message;
state.error = null;
},

addMaterialProductFailuer: (state, action) => {
state.loading = false;
state.error = action.payload.error;
state.done = false;
state.message = null;
}, 


updateMaterialProductFetch: (state,action) => {
state.loading = true;
state.initialMaterials_list=action.payload.items;
state.done = false;
state.error = null;
state.message = null;
},

updateMaterialProductSuccess: (state, action) => {

state.loading = false;

state.done = true;
state.message = action.payload.message;
state.error = null;

const indexes = state.initialMaterials.map((material, index) => material.id === state.id_file ? index : -1).filter(index => index !== -1);
indexes.forEach(index => {
    state.initialMaterials[index] = action.payload.data;
});




},

updateMaterialProductFailuer: (state, action) => {
state.loading = false;
state.error = action.payload.error;
state.done = false;
state.message = null;
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
    addMaterialProductFetch,addMaterialProductSuccess,addMaterialProductFailuer,
    uploadMaterialsProductFileFetch,uploadMaterialsProductFileSuccess,uploadMaterialsProductFileFailure,
    updateMaterialProductFailuer,updateMaterialProductSuccess,updateMaterialProductFetch
    

} = initialMaterialsSlice.actions;
export default initialMaterialsSlice.reducer;