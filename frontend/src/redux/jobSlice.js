import RecommendedJobs from "@/components/RecommendedJobs";
import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    recommendedJobs: [],
  
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
  },
  reducers: {
    // actions
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
 
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllRecruiterJobs: (state, action) => {
      state.allRecruiterJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});
export const {
  setAllJobs,
  setSingleJob,
  setAllRecruiterJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setAllSavedJobs,
  setSearchedQuery,
} = jobSlice.actions;
export default jobSlice.reducer;
