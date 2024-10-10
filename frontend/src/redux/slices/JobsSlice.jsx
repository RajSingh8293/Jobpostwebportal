/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */

import { backendApi } from "@/constant/BackendApi";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const JobsSlice = createSlice({
    name: "jobs",
    initialState: {
        loading: false,
        message: null,
        error: null,
        jobs: [],
        singleJob: {},
        myAppliedJobs: [],
    },
    reducers: {
        requestForJobs: (state, action) => {
            state.loading = true;
            state.error = null
        },
        sucessForJobs: (state, action) => {
            state.loading = false;
            state.jobs = action.payload.jobs;
            state.totalJobs = action.payload.totalJobs;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.error = null
        },
        failedForJobs: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        requestSingleJob: (state, action) => {
            state.loading = true;
            state.error = null
        },
        sucessSingleJob: (state, action) => {
            state.loading = false;
            state.singleJob = action.payload;
            state.error = null
        },
        failedSingleJob: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
}
)



export const {
    requestForJobs,
    sucessForJobs,
    failedForJobs,

    requestSingleJob,
    sucessSingleJob,
    failedSingleJob,

    clearAllError,
} = JobsSlice.actions;
export default JobsSlice.reducer;


let axiosConfig = {
    withCredentials: true,
}
// all jobs 
export const fetchJobs = (city, category, currentPage, searchKeyword = "") => async (dispatch) => {
    try {
        dispatch(requestForJobs());
        let link = `${backendApi}/job/get?`;

        let queryParams = [];
        if (searchKeyword) {
            queryParams.push(`searchKeyword=${searchKeyword}`);
        }
        if (currentPage) {
            queryParams.push(`page=${currentPage}`);
        }
        if (city) {
            queryParams.push(`city=${city}`);
        }
        if (category) {
            queryParams.push(`category=${category}`);
        }
        link += queryParams.join("&")
        const response = await axios.get(link)
        dispatch(sucessForJobs(response?.data))
    } catch (error) {
        console.log(error);
        dispatch(failedForJobs(error?.response?.data?.message))
    }

}

// single job
export const fetchSingleJob = (id) => async (dispatch) => {
    try {
        dispatch(requestSingleJob());
        const { data } = await axios.get(`${backendApi}/job/get/${id}`, {
            withCredentials: true
        }
        )

        if (data.success) {
            dispatch(sucessSingleJob(data?.job))
        }
    } catch (error) {
        console.log(error);
        dispatch(failedSingleJob(error?.response?.data?.message))
    }

}




