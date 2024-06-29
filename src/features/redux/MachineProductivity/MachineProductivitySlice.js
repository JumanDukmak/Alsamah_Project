import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const MachineProductivitySlice = createSlice({
    name: "machineProductivity",
    initialState: {
        machineProductivity: [],
        comparison:[],
        isLoading: false,
        done: false,
        error: null,
        message: null,
    },

    reducers: {
        addActual_productionFetch: (state) => {
            state.isLoading = true;
            state.done = false;
            state.error = null;
            state.message = null;
        },

        addActual_productionSuccess: (state, action) => {
            state.isLoading = false;
            state.machineProductivity.push(action.payload.data);
            state.done = true;
            state.message = action.payload.message;
            state.error = null;
        },
        
        addActual_productionFailuer: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
            state.done = false;
            state.message = null;
        },

        resetData_MachineProductivity: (state) => {
            state.message = null;
            state.error = null;
        },

        getMachineProductivityFetch: (state) => {
            state.isLoading = true;
            state.error = null;
            state.machineProductivity = [];
        },

        getMachineProductivitySuccess: (state, action) => {
            state.isLoading = false;
            state.machineProductivity = action.payload.data;
            state.meta = action.payload.meta;
            state.error = null;
        },

        getMachineProductivityFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
            state.machineProductivity = [];
        },



        getComparisonBetweenActual_ExpectedFetch: (state) => {
            state.isLoading = true;
            state.error = null;
            state.comparison = [];
        },

        getComparisonBetweenActual_ExpectedSuccess: (state, action) => {
            state.isLoading = false;
            state.comparison = action.payload;
            state.meta = action.payload.meta;
            state.error = null;
        },

        getComparisonBetweenActual_ExpectedFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
            state.comparison = [];
        },


        uploadActual_productionFileFetch: (state) => {
            state.isLoading = true;
            state.error = null;
            state.message = null;
            state.done = false;
        },
        
        uploadActual_productionFileSuccess: (state, action) => {
        
            state.isLoading = false;
            state.message = action.payload.message;
            state.error = null;
            const index = state.machineProductivity.findIndex(
                (data) => data.id == action.payload.data.id
            );

            if (index !== -1) {
                state.machineProductivity[index] = action.payload.data;
            }


        },
        
        uploadActual_productionFileFailure: (state, action) => {
            state.isLoading = false;
            state.message = null;
            state.error = action.payload.error;
            state.done = false;
        },



        updateActual_productionStart: (state) => {
            state.isLoading = true;
            state.error = null;
            state.message = null;
            state.done = false;
          },
      
          updateActual_productionSuccess: (state, action) => {
            state.isLoading = true;
            state.error = null;
            state.message = action.payload.message;
            state.done = false;

           
            // const index = state.machineProductivity.findIndex(
            //   (pigm) => pigm.id == action.payload.data.id
            // );
      
            // console.log("The index is : " + index);
            // if (index !== -1) {
            //   state.machineProductivity[index] = action.payload.data;
            // }
          },
      
          updateActual_productionFailure: (state, action) => {

            state.isLoading = true;
            state.error = action.payload.error;
            state.message = null;
            state.done = false;
          },


    },
});

export const { 
    addActual_productionFetch,
    addActual_productionSuccess,
    addActual_productionFailuer,
    resetData_MachineProductivity,
    updateActual_productionStart,updateActual_productionSuccess,updateActual_productionFailure,
    getComparisonBetweenActual_ExpectedFetch,
    getComparisonBetweenActual_ExpectedSuccess,
    getComparisonBetweenActual_ExpectedFailure,
   getMachineProductivityFailure,getMachineProductivitySuccess,getMachineProductivityFetch,
   uploadActual_productionFileFailure,uploadActual_productionFileSuccess,uploadActual_productionFileFetch,
} = MachineProductivitySlice.actions;
export default MachineProductivitySlice.reducer;
