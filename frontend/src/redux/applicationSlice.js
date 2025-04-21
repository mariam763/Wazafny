import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicants: null,
    parsedResume: null, // New state to hold parsed resume data
  },
  reducers: {
    setAllApplicants: (state, action) => {
      state.applicants = action.payload;
    },
    setParsedResume: (state, action) => {
      state.parsedResume = action.payload; // Update parsedResume state
    },
  },
});

export const { setAllApplicants, setParsedResume } = applicationSlice.actions;
export default applicationSlice.reducer;

