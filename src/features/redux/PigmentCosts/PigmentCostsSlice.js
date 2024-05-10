import { createSlice } from "@reduxjs/toolkit";

const pigmentCostsSlice = createSlice({
  name: "pigmentCosts",
  initialState: {
    pigmentCosts: [],
    loading: false,
    error: null,
    message: null,
  },

  reducers: {
    getpigmentCostsStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.pigmentCosts = [];
    },

    getpigmentCostsSuccess: (state, action) => {
      state.loading = false;
      state.pigmentCosts = action.payload.pigmentCosts;
      state.message = null;
      state.error = null;
    },

    getpigmentCostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.message = null;
      state.pigmentCosts = [];
    },

    resetData_pigmentCosts: (state) => {
      state.message = null;
      state.error = null;
    },

    //-------------------------------Add-pigmentCosts--------------------
    addPigmentCostsStart: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    },

    addPigmentCostsSuccess: (state, action) => {
      state.loading = false;
      state.pigmentCosts.push(action.payload.data);
      state.message = action.payload.message;
      state.error = null;
    },

    addPigmentCostsFailure: (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.payload.error;
    },
    //---------------------------------update-pigmentCosts------------------------

    updatePigmentCostsStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    updatePigmentCostsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      const index = state.pigmentCosts.findIndex(
        (pigm) => pigm.id == action.payload.data.id
      );

      console.log("The index is : " + index);
      if (index !== -1) {
        state.pigmentCosts[index] = action.payload.data;
      }
    },

    updatePigmentCostsFailure: (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.payload.error;
    },
  },
});

export const {
  getpigmentCostsStart,
  getpigmentCostsSuccess,
  getpigmentCostsFailure,
  addPigmentCostsStart,
  addPigmentCostsSuccess,
  addPigmentCostsFailure,
  updatePigmentCostsStart,
  updatePigmentCostsSuccess,
  updatePigmentCostsFailure,
  resetData_pigmentCosts,
} = pigmentCostsSlice.actions;
export default pigmentCostsSlice.reducer;
