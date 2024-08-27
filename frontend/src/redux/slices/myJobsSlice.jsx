/* eslint-disable no-unused-vars */
// /* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const myJobsSlice = createSlice({
    name: "myjobs",
    initialState: {
        loading: false,
        message: null,
        error: null,
        myjobs: [],
        mySingleJob: {},
        applicants: {},

    },
    reducers: {
        requestForMyJobs: (state, action) => {
            state.loading = true;
            state.error = null
        },
        sucessForMyJobs: (state, action) => {
            state.loading = false;
            state.myjobs = action.payload;
            state.error = null
        },
        failedForMyJobs: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        requestForCreateJob: (state, action) => {
            state.loading = true;
            state.error = null
        },
        sucessForCreateJob: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = null
        },
        failedForCreateJob: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        requestForGetApplicants: (state, action) => {
            state.loading = true;
            state.error = null
        },
        sucessForGetApplicants: (state, action) => {
            state.loading = false;
            state.applicants = action.payload;
            state.error = null
        },
        failedForGetApplicants: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        requestForGetMySingleJob: (state, action) => {
            state.loading = true;
            state.error = null
        },
        sucessForGetSMyingleJob: (state, action) => {
            state.loading = false;
            state.mySingleJob = action.payload;
            state.error = null
        },
        failedForGetSMyingleJob: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        getMySingleJob: (state, action) => {
            state.mySingleJob = action.payload;
        },



        requestForPostApplication: (state, action) => {
            state.loading = true
            state.error = null;
        },

        successForPostApplication: (state, action) => {
            state.loading = false
            state.error = null;
            state.message = action.payload;
        },

        failedForPostApplication: (state, action) => {
            state.loading = false
            state.error = action.payload;
            state.message = null;
        },
    },
});

export const {
    requestForMyJobs,
    sucessForMyJobs,
    failedForMyJobs,

    requestForCreateJob,
    sucessForCreateJob,
    failedForCreateJob,

    requestForGetApplicants,
    sucessForGetApplicants,
    failedForGetApplicants,

    requestForGetMySingleJob,
    sucessForGetSMyingleJob,
    failedForGetSMyingleJob,

    requestForPostApplication,
    successForPostApplication,
    failedForPostApplication,

    setApplicants, getMySingleJob, setCreateJob, setStatus } = myJobsSlice.actions;
export default myJobsSlice.reducer;

let axiosConfig = {
    withCredentials: true,
}

export const createNewJob = (jobData) =>
    async (dispatch) => {
        try {
            dispatch(requestForCreateJob())
            const { data } = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/job/create`,
                jobData,
                axiosConfig,
            )
            if (data.success) {
                dispatch(sucessForCreateJob(data));
                toast.success(data?.message)
                document.location.href = '/myjobs'

            }
        } catch (error) {
            console.log(error);
            dispatch(failedForCreateJob(error?.response?.data?.message))
        }
    };

export const fetchAllMyJobs = () => async (dispatch) => {
    try {
        dispatch(requestForMyJobs())
        const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_UR}/job/get/recruiter/jobs`, axiosConfig)
        console.log("my jobs :", data);

        if (data.success) {
            dispatch(sucessForMyJobs(data?.jobs))
        }

    } catch (error) {
        console.log(error);
        dispatch(failedForMyJobs(error?.response?.data?.message))
    }

}


export const fetchApplicants = (id) => async (dispatch) => {
    try {
        dispatch(requestForGetApplicants())
        const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_UR}/application/get/${id}`,
            {
                withCredentials: true
            },)
        if (data.success) {
            dispatch(sucessForGetApplicants(data?.applicants))
        }

    } catch (error) {
        console.log(error);
        dispatch(failedForGetApplicants(error?.response?.data?.message))
    }

}

export const fetchMySingleJob = (id) => async (dispatch) => {
    try {
        dispatch(requestForGetMySingleJob())
        const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_UR}/job/get/${id}`,
            {
                withCredentials: true
            },)
        if (data.success) {
            dispatch(sucessForGetSMyingleJob(data?.job))
        }

    } catch (error) {
        console.log(error);
        dispatch(failedForGetSMyingleJob(error?.response?.data?.message))
    }

}


const axiosConfigMultipart = {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
}

export const createApplication = (userData, jobId) =>
    async (dispatch) => {
        try {
            dispatch(requestForPostApplication())
            const { data } = await axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_UR}/application/apply/${jobId}`, userData, axiosConfigMultipart);
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

