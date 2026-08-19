import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "../customAxios/Customaxios";

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (mobile, { rejectWithValue }) => {
    try {
      const response = await customAxios.post("/auth/send-otp", {
        mobile,
        method: "sms",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to send OTP");
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ mobile, otp }, { rejectWithValue }) => {
    try {
      const response = await customAxios.post("/auth/login", { mobile, otp });
      return response?.data?.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const isauthrize = createAsyncThunk(
  "auth/isauthrize",
  async (_, { rejectWithValue }) => {
    try {
      const response = await customAxios.get("/auth/isauthrize");
      console.log(response?.data)
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to send OTP");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await customAxios.get("/auth/logout"); // Your backend logout route
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

