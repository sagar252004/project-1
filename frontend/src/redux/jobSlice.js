import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';

// Async thunk to handle the deletion
export const deleteJobAsync = createAsyncThunk(
    "job/deleteJobAsync",
    async (jobId, { rejectWithValue }) => {
      try {
        // Make sure the endpoint is correct without duplicating '/job'
        const response = await axios.delete(`${JOB_API_END_POINT}/${jobId}`, {
          withCredentials: true,
        });
        return jobId;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Error deleting Job");
      }
    }
  );
  

// Thunks for fetching and updating a job
export const fetchSingleJob = createAsyncThunk(
    'job/fetchSingleJob',
    async (jobId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${JOB_API_END_POINT}/job/${jobId}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch job");
        }
    }
);

export const updateJob = createAsyncThunk(
    'job/updateJob',
    async ({ id, jobData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${JOB_API_END_POINT}/update/${id}`, jobData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update job");
        }
    }
);

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        loading: false,
        error: null,
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },

        setSearchedQuery: (state, action) => {
            console.log("vvvvvv",state.searchedQuery);
            state.searchedQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchSingleJob async thunk
            .addCase(fetchSingleJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSingleJob.fulfilled, (state, action) => {
                state.loading = false;
                state.singleJob = action.payload;
            })
            .addCase(fetchSingleJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // updateJob async thunk
            .addCase(updateJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateJob.fulfilled, (state, action) => {
                state.loading = false;
                state.singleJob = action.payload; // Update local state with updated job details
            })
            .addCase(updateJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // deleteJobAsync async thunk
            .addCase(deleteJobAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteJobAsync.fulfilled, (state, action) => {
                state.loading = false;
                // Remove the deleted job from allAdminJobs or allJobs based on where it's stored
                state.allAdminJobs = state.allAdminJobs.filter(job => job._id !== action.payload);
            })
            .addCase(deleteJobAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
} = jobSlice.actions;

export default jobSlice.reducer;
