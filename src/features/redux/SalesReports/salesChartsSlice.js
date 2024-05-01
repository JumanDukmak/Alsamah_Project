import { createSlice } from "@reduxjs/toolkit";

const salesChartssSlice = createSlice({
  name: "salesCharts",
  initialState: {
    loading: false,
    salesCharts: [],
    productsCharts: [],
    error: null,
    message: null,
  },

  reducers: {
    getSalesChartsFetch: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.salesCharts = [];
    },

    getSalesChartsSuccess: (state, action) => {
      state.loading = false;
      state.salesCharts = action.payload.data;
      state.message = action.payload.message;
      state.error = null;
    },

    getSalesChartsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.message = null;
      state.salesCharts = [];
    },

    resetData_charts: (state) => {
      state.message = null;
      state.error = null;
    },
//---------------------------------------getProductsCharts-----------------------------------------
    getProductsChartsFetch: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.productsCharts = [];
    },

    getProductsChartsSuccess: (state, action) => {
      state.loading = false;
      state.productsCharts = action.payload.data;
      state.message = action.payload.message;
      state.error = null;
    },

    getProductsChartsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.message = null;
      state.productsCharts = [];
    },
  },
});

export const {
  getSalesChartsFetch,
  getSalesChartsSuccess,
  getSalesChartsFailure,
  resetData_charts,
  getProductsChartsSuccess,
  getProductsChartsFailure,
  getProductsChartsFetch,
} = salesChartssSlice.actions;

export default salesChartssSlice.reducer;
