import { createSlice } from "@reduxjs/toolkit";

const IndustrialExpenseSlice = createSlice({
  name: "IndustrialExpense",
  initialState: {
    IndustrialExpense: [],
    loading: false,
    error: null,
    message: null,
  },

  reducers: {
    getIndustrialExpenseStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.IndustrialExpense = [];
    },

    getIndustrialExpenseSuccess: (state, action) => {
      state.loading = false;
      state.IndustrialExpense = action.payload.IndustrialExpense;
      state.message = null;
      state.error = null;
    },

    getIndustrialExpenseFailure: (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.payload.error;
      state.IndustrialExpense = [];
    },

    resetData_IndustrialExpense: (state) => {
      state.message = null;
      state.error = null;
    },

    //-----------------------add-IndustrialExpense------------------------
    addIndustrialExpenseStart: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    },

    addIndustrialExpenseSuccess: (state, action) => {
      state.loading = false;
      state.IndustrialExpense.push(action.payload.data);
      state.message = action.payload.message;
      state.error = null;
    },

    addIndustrialExpenseFailure: (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.payload.error;
    },
  },

//---------------------------------Update-Group------------------------

// updateGroupStart:(state)=>{
//   state.loading=true;
//   state.error=null;
//   state.done=false;
//   state.message=null;
//   },
  
//   updateGroupSuccess:(state,action)=>{
    
//   state.loading=false;
//   state.error=null;
//   state.done=true;
//   state.message=action.payload.message
//       const index = state.groups.findIndex(group => group.id == action.payload.data.id);
      
//       console.log("The index is : "+index)
//       if (index !== -1) {
//           state.groups[index] = action.payload.data;
//       }},
  
//   updateGroupFailure:(state,action) =>{
  
//       state.loading=false;
//       state.done=false;
//       state.message=null;
//   state.error=action.payload.error;
  
//   },

});

export const {
  getIndustrialExpenseStart,
  getIndustrialExpenseSuccess,
  getIndustrialExpenseFailure,
  addIndustrialExpenseStart,addIndustrialExpenseSuccess,addIndustrialExpenseFailure,
  resetData_IndustrialExpense,
} = IndustrialExpenseSlice.actions;
export default IndustrialExpenseSlice.reducer;
