import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant"; // Update this path based on your project structure

// Async thunk to handle the deletion
export const deleteCompanyAsync = createAsyncThunk(
  "company/deleteCompanyAsync",
  async (companyId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${COMPANY_API_END_POINT}/${companyId}`,{ withCredentials: true });
      return companyId;

       // Return the company ID to remove it from state
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting company"); // Handle errors
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
    searchCompanyByText: "",
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCompanyAsync.fulfilled, (state, action) => {
        // Only update Redux state if deletion succeeded in the backend
        state.companies = state.companies.filter(
          (company) => company._id !== action.payload
        );
      })
      .addCase(deleteCompanyAsync.rejected, (state, action) => {
        console.error("Failed to delete company:", action.payload);
      });
  },
});

export const {
  setSingleCompany,
  setCompanies,
  setSearchCompanyByText,
} = companySlice.actions;
export default companySlice.reducer;
