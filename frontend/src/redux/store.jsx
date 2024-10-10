import { configureStore } from "@reduxjs/toolkit";
import JobsSlice from "./slices/JobsSlice";
import userSlice from "./slices/userSlice";
import wishlistSlice from "./slices/wishlistSlice";
import applicationSlice from "./slices/applicationSlice";
import recruiterJobsSlice from "./slices/recruiterJobsSlice";


export const store = configureStore({
    reducer: {
        auth: userSlice,
        jobs: JobsSlice,
        applications: applicationSlice,
        myjobs: recruiterJobsSlice,
        whishListItems: wishlistSlice,
    },
})
