import { createSlice } from "@reduxjs/toolkit";

const GeneralDataSlice = createSlice({
  name: "GeneralData",
  initialState: {
    GeneralData: [],
    loading: false,
    error: null,
    message: null,
  },

  reducers: {
    getGeneralDataStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.GeneralData = [];
    },

    getGeneralDataSuccess: (state, action) => {
      state.loading = false;
      state.GeneralData = action.payload.GeneralData;
      state.message = null;
      state.error = null;
    },

    getGeneralDataFailure: (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.payload.error;
      state.GeneralData = [];
    },

    resetData_GeneralData: (state) => {
      state.message = null;
      state.error = null;
    },

    //-----------------------add-GeneralData------------------------
    addGeneralDataStart: (state) => {
        console.log(`the slice addGeneralDataStart`)
      state.loading = true;
      state.message = null;
      state.error = null;
    },

    addGeneralDataSuccess: (state, action) => {
      state.loading = false;
      state.GeneralData.push(action.payload.data);
      state.message = action.payload.message;
      state.error = null;
    },

    addGeneralDataFailure: (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.payload.error;
    },

    //---------------------------------update-GeneralData------------------------

    updateGeneralDataStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    updateGeneralDataSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      const index = state.GeneralData.findIndex(
        (data) => data.id == action.payload.data.id
      );
      if (index !== -1) {
        state.GeneralData[index] = action.payload.data;
      }
    },

    updateGeneralDataFailure: (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.payload.error;
    },
  },
});

export const {
  getGeneralDataStart,
  getGeneralDataFailure,
  getGeneralDataSuccess,
  addGeneralDataStart,
  addGeneralDataSuccess,
  addGeneralDataFailure,
  updateGeneralDataStart,
  updateGeneralDataSuccess,
  updateGeneralDataFailure,
  resetData_GeneralData,
} = GeneralDataSlice.actions;
export default GeneralDataSlice.reducer;
