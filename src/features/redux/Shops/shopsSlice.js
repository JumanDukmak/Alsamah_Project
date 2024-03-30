import { createSlice } from "@reduxjs/toolkit";

const shopsSlice = createSlice({
    name: 'shops',
    initialState: {
        shops: [],
        loading: false,
        error: null,
        message: null
    },

    reducers: {
        //----------------------------------Get-Shops-----------------------
        getShopsStart: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
            state.shops = []
        },

        getShopsSuccess: (state, action) => {
            state.loading = false;
            state.shops = action.payload.shops;
            console.log(action.payload.shops)
            state.message = null;
            state.error = null;
        },

        getShopsFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.payload.error;
            state.shops = []
        },

        resetData_Shops: (state) => {
            state.message = null;
            state.error = null;
        },

        //-----------------------add-Shop------------------------
        addShopStart: (state, action) => {
            console.log(action.payload.name)
            state.loading = true;
            state.message = null;
            state.error = null;
        },

        addShopSuccess: (state, action) => {
            state.loading = false;
            state.shops.push(action.payload.data);
            state.message = action.payload.message;
            state.error = null;
        },

        addShopFailure: (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.payload.error;
        },
    }
})

export const { getShopsStart, 
    getShopsSuccess, 
    getShopsFailure,
    resetData_Shops, 
    addShopFailure, 
    addShopSuccess, 
    addShopStart } = shopsSlice.actions;
export default shopsSlice.reducer