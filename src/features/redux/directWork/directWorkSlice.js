import { createSlice } from "@reduxjs/toolkit";

const directWorkSlice = createSlice({
    name: 'directWork',
    initialState: {
        directWork: [],
        loading: false,
        done: false,
        error: null,
        id:0,
        message: null,
    },

    reducers: {
        getdirectWorkFetch: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
            state.directWork = []
        },

        getdirectWorkSuccess: (state, action) => {
            state.loading = false;
            state.directWork = action.payload.directWork;
            state.message = null;
            state.error = null;
        },

        getdirectWorkFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.payload.error;
            state.directWork = []
        },

        resetData_directWork: (state) => {
            state.message = null;
            state.error = null;
        },

        addDirectWorkFetch: (state) => {
            state.loading = true;
            state.message = null;
            state.error = null;
        },

        addDirectWorkSuccess: (state, action) => {
            console.log("slice:"+action.payload);
            state.loading = false;
            state.directWork.push(action.payload.data);
            state.message = action.payload.message;
            state.error = null;
        },

        addDirectWorkFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.payload.error;
        },

        uploadDirectWorkFileFetch: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
            state.done = false;
        },
        
        uploadDirectWorkFileSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.directWork.push(action.payload.data);
            state.done = true;
            state.message = action.payload.message;
        },
        
        uploadDirectWorkFileFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.payload.error;
            state.done = false;
        },

        //-------------------------------Delete ------------------------------------
       

deleteDirectWorkFileStart:(state,action)=>{
    state.loading=true;
    state.error=null;
    state.id=action.payload;
 
    },
    
    deleteDirectWorkFileSuccess:(state)=>{
    state.loading=false;
    state.error=null;
    state.directWork = state.directWork.filter(d => d.id !== state.id);
   
    
    },
    
    deleteDirectWorkFileFailure:(state,action) =>{
    
    state.loading=false;
    state.error=action.payload.error;
    
    },





    }
})

export const {
  getdirectWorkFetch,getdirectWorkSuccess,getdirectWorkFailure,
  addDirectWorkFetch,addDirectWorkSuccess,addDirectWorkFailure,
  uploadDirectWorkFileFetch,uploadDirectWorkFileFailure,uploadDirectWorkFileSuccess,
  deleteDirectWorkFileStart,deleteDirectWorkFileSuccess,deleteDirectWorkFileFailure,
  resetData_directWork

} = directWorkSlice.actions;
export default directWorkSlice.reducer;