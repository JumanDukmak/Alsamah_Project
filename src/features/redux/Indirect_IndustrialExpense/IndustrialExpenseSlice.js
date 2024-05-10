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

//---------------------------------update-IndustrialExpense------------------------

    updateIndustrialExpenseStart:(state)=>{
      console.log('the hhhhhhhhhh')
      state.loading=true;
      state.error=null;
      state.message=null;
      },
      
      updateIndustrialExpenseSuccess:(state,action)=>{
        
      state.loading=false;
      state.error=null;
      state.message=action.payload.message
          const index = state.IndustrialExpense.findIndex(Indus => Indus.id == action.payload.data.id);
          
          console.log("The index is : "+index)
          if (index !== -1) {
              state.IndustrialExpense[index] = action.payload.data;
          }},
      
      updateIndustrialExpenseFailure:(state,action) =>{
      
          state.loading=false;
          state.message=null;
      state.error=action.payload.error;
      
      },



  },






});

export const {
  getIndustrialExpenseStart,
  getIndustrialExpenseSuccess,
  getIndustrialExpenseFailure,
  addIndustrialExpenseStart,addIndustrialExpenseSuccess,addIndustrialExpenseFailure,
  updateIndustrialExpenseStart,updateIndustrialExpenseSuccess,updateIndustrialExpenseFailure,
  resetData_IndustrialExpense,

} = IndustrialExpenseSlice.actions;
export default IndustrialExpenseSlice.reducer;
