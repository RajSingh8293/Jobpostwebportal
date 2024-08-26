import { configureStore } from "@reduxjs/toolkit";
import JobsSlice from "./slices/JobsSlice";
import userSlice from "./slices/userSlice";
import myJobsSlice from "./slices/myJobsSlice";


export const store = configureStore({
    reducer: {
        auth: userSlice,
        jobs: JobsSlice,
        myjobs: myJobsSlice,

    },
})
