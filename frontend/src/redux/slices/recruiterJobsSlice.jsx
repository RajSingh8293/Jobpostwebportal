/* eslint-disable no-unused-vars */
// /* eslint-disable react-refresh/only-export-components */
import { backendApi } from "@/constant/BackendApi";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const recruiterJobsSlice = createSlice({
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
            state.myjobs = action.payload.jobs;
            state.totalJobs = action.payload.totalJobs;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
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

        successForDeleteMyJob: (state, action) => {
            state.loading = false
            state.error = null;
            state.message = action.payload.message;
        },

        failedForDeleteMyJob: (state, action) => {
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

    successForDeleteMyJob,
    failedForDeleteMyJob,

    setApplicants, getMySingleJob, setCreateJob, setStatus } = recruiterJobsSlice.actions;
export default recruiterJobsSlice.reducer;

let axiosConfig = {
    withCredentials: true,
}

export const createNewJob = (jobData) =>
    async (dispatch) => {
        try {
            dispatch(requestForCreateJob())
            const { data } = await axios.post(
                `${backendApi}/job/create`,
                jobData,
                axiosConfig,
            )
            if (data.success) {
                dispatch(sucessForCreateJob(data));
                document.location.href = '/myjobs'
                toast.success(data?.message)

            }
        } catch (error) {
            console.log(error);
            dispatch(failedForCreateJob(error?.response?.data?.message))
        }
    };


export const fetchAllMyJobs = (currentPage) => async (dispatch) => {
    try {
        dispatch(requestForMyJobs())
        let link = `${backendApi}/job/get/recruiter/jobs?`;

        let queryParams = [];
        if (currentPage) {
            queryParams.push(`page=${currentPage}`);
        }

        link += queryParams.join("&")
        const { data } = await axios.get(link, axiosConfig)
        console.log("my jobs :", data);

        if (data.success) {
            dispatch(sucessForMyJobs(data))
        }

    } catch (error) {
        console.log(error);
        dispatch(failedForMyJobs(error?.response?.data?.message))
    }

}


export const fetchApplicants = (id) => async (dispatch) => {
    try {
        dispatch(requestForGetApplicants())
        const { data } = await axios.get(`${backendApi}/application/get/${id}`,
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
        const { data } = await axios.get(`${backendApi}/job/get/${id}`,
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




