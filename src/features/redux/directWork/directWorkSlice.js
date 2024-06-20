import { createSlice } from "@reduxjs/toolkit";

const directWorkSlice = createSlice({
  name: "directWorks",
  initialState: {
    
     directCost:[],
    working_numbers:[],
    directCostFile:null,
    isLoading: false,
    done: false,
    id: 0,
    error: null,
    message: null,
},

reducers: {
   
    
   

    resetData_directWork: (state) => {
        state.message = null;
        state.error = null;
    },


//-----------------------------------Upload--------------------------------------

     //uploud file to add products from excel
     uploadDirectCostFileFetch: (state) => {
       
        state.isLoading = true;
        state.error = null;
        state.message = null;
        state.done = false;
    },
    
    uploadDirectCostFileSuccess: (state, action) => {
       
        state.isLoading = false;
        state.error = null;
        state.directCostFile=action.payload.data;
        state.done = true;
        state.message = action.payload.message;
    },
    
    uploadDirectCostFileFailure: (state, action) => {
        
        state.isLoading = false;
        state.message = null;
        state.error = action.payload.error;
        state.done = false;
    },

//-----------------------------------ADD--------------------------------------
addDirectCostFetch: (state) => {
state.isLoading = true;
state.done = false;
state.error = null;
state.message = null;
},

addDirectCostSuccess: (state, action) => {
state.isLoading = false;
state.directCost=action.payload.data;
state.done = true;
state.message = action.payload.message;
state.error = null;
},

addDirectCostFailuer: (state, action) => {
state.isLoading = false;
state.error = action.payload.error;
state.done = false;
state.message = null;
},  


//--------------------------Delete-----------------------------

deleteDirectWorkStart:(state,action)=>{
    state.isLoading = true;
     state.working_numbers=action.payload.directWork;
    state.done = false;
    state.error = null;
    state.message = null;
 
    },
    
    deleteDirectWorkSuccess:(state,action)=>{
    // state.files = state.files.filter(file => file.id !== state.id);
    state.isLoading = false;
    state.done = true;
    state.message = action.payload.message;
    state.error = null;
    
    },
    
    deleteDirectWorkFailure:(state,action) =>{
        state.isLoading = false;
        state.error = action.payload.error;
        state.done = false;
        state.message = null;
    
    },







},

});

export const {
  uploadDirectCostFileFetch,uploadDirectCostFileSuccess,uploadDirectCostFileFailure,
  deleteDirectWorkFailure,deleteDirectWorkStart,deleteDirectWorkSuccess,
  addDirectCostFailuer,addDirectCostFetch,addDirectCostSuccess,
  resetData_directWork
} = directWorkSlice.actions;
export default directWorkSlice.reducer;
