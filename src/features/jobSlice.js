import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// Created initialState which store jobs,isLoading and error.
const initialState = {
    jobs: [],
    isLoading: false,
    error: null,
    numberOfJobs: 0,
    allJobs: [],
}

// Defined baseURl of API
const axiosInstance = axios.create({
    baseURL: "https://api.weekday.technology/", 
  });

// Created getJobs async thunk using axios for POST request
export const getJobs = createAsyncThunk("adhoc/getSampleJdJSON",
    async (payload) => {
        try {
            const { data } = await axiosInstance.post("adhoc/getSampleJdJSON",payload);
            return data;
        } catch (error) {
            console.log(error);
            throw error.response.data;
        }
})


// Created job slice using createSlice to manage state of jobs
export const jobSlice = createSlice({
    name:"jobs",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
          .addCase(getJobs.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.numberOfJobs = 0;
          })
          .addCase(getJobs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.jobs = action.payload.jdList;
            state.numberOfJobs = action.payload.totalCount;
            state.allJobs = [...state.allJobs,...action.payload.jdList]
          })
          .addCase(getJobs.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.numberOfJobs = 0;
          });
    }
})

// exporting jobReducer and useJobs
export const jobReducer = jobSlice.reducer;
export const useJobs = () => useSelector((state) => state.jobs);
export const { setAllJobs } = jobSlice.actions;