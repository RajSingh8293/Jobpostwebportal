/* eslint-disable no-unused-vars */

import { backendApi } from "@/constant/BackendApi";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const applicationSlice = createSlice({
    name: "applications",
    initialState: {
        loading: false,
        message: null,
        error: null,
        myAppliedJobs: [],
    },
    reducers: {
        requestMyAppliedJobs: (state, action) => {
            state.loading = true
            state.error = null;
        },

        successMyAppliedJobs: (state, action) => {
            state.loading = false
            state.myAppliedJobs = action.payload.application;
            state.error = null;
        },

        failedMyAppliedJobs: (state, action) => {
            state.loading = false
            state.error = action.payload;
        },

        requestForPostApplication: (state, action) => {
            state.loading = true
            state.error = null;
        },

        successForPostApplication: (state, action) => {
            state.loading = false
            state.error = null;
            state.message = action.payload.message;
        },

        failedForPostApplication: (state, action) => {
            state.loading = false
            state.error = action.payload;
            state.message = null;
        },
    }
}
)



export const {

    requestMyAppliedJobs,
    successMyAppliedJobs,
    failedMyAppliedJobs,

    requestForPostApplication,
    successForPostApplication,
    failedForPostApplication,

    clearAllError,
} = applicationSlice.actions;
export default applicationSlice.reducer;


let axiosConfig = {
    withCredentials: true,
}

// user applied jobs 
export const getMyAppliedJobs = () => {
    return async (dispatch) => {
        dispatch(requestMyAppliedJobs())
        try {
            const { data } = await axios.get(`${backendApi}/application/get-applied-myjobs`, axiosConfig);
            console.log("getMyAppliedJobs :", data);

            if (data.success) {
                dispatch(successMyAppliedJobs(data));
            }
        } catch (error) {
            console.log(error);
            dispatch(failedMyAppliedJobs(error?.response?.data?.message))

        }
    };
}


const axiosConfigMultipart = {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
}

export const createApplication = (userData, jobId) =>
    async (dispatch) => {
        try {
            dispatch(requestForPostApplication())
            const { data } = await axios.post(`${backendApi}/application/apply/${jobId}`, userData, axiosConfigMultipart);
            console.log("data :", data);

            if (data.success) {
                dispatch(successForPostApplication(data));
                toast.success(data?.message)
            }

        } catch (error) {
            console.log(error);
            dispatch(failedForPostApplication(error?.response?.data?.message))
        }
    };



