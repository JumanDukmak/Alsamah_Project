import { createSlice } from "@reduxjs/toolkit";

const financialExpensesSlice = createSlice({
    name: "financialExpenses",
    initialState: {
        financialExpenses: [],
        isLoading: false,
        done: false,
        id: 0,
        error: null,
        message: null,
    },

    reducers: {
        addFinancialExpensesFetch: (state) => {
            state.isLoading = true;
            state.done = false;
            state.error = null;
            state.message = null;
        },

        addFinancialExpensesSuccess: (state, action) => {
            state.isLoading = false;
            state.financialExpenses.push(action.payload.data);
            state.done = true;
            state.message = action.payload.message;
            state.error = null;
        },
        
        addFinancialExpensesFailuer: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
            state.done = false;
            state.message = null;
        },

        resetData_financialExpenses: (state) => {
            state.message = null;
            state.error = null;
        },

        getFinancialExpensesFetch: (state) => {
            state.isLoading = true;
            state.error = null;
            state.financialExpenses = [];
        },

        getFinancialExpensesSuccess: (state, action) => {
            state.isLoading = false;
            state.financialExpenses = action.payload.financialExpenses;
            state.error = null;
        },

        getFinancialExpensesFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
            state.financialExpenses = [];
        },
    },
});

export const { 
    addFinancialExpensesFetch,
    addFinancialExpensesSuccess,
    addFinancialExpensesFailuer,
    getFinancialExpensesFetch,
    getFinancialExpensesSuccess,
    getFinancialExpensesFailure,
    resetData_financialExpenses
} = financialExpensesSlice.actions;
export default financialExpensesSlice.reducer;
