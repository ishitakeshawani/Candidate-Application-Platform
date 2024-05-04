import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// Created initialState which store jobs,isLoading and error.
const initialState = {
    jobs: [],
    isLoading: false,
    error: null,
}

// Created getJobs async thunk using axios for POST request
export const getJobs = createAsyncThunk("adhoc/getSampleJdJSON",
    async (payload) => {
        try {
            const data = await axios.post("adhoc/getSampleJdJSON",payload);
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
            throw error.response.data;
        }
})


// Created job slice using createSlice to manage state of jobs
export const jobSlice = createSlice({
    name:"Jobs",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
          .addCase(getJobs.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(getJobs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.jobs = action.payload;
          })
          .addCase(getJobs.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          });
    }
})

// exporting jobReducer and useJobs
export const jobReducer = jobSlice.reducer;
export const useJobs = () => useSelector((state) => state.jobs);