import { createAsyncThunk } from "@reduxjs/toolkit";

export const getuser = createAsyncThunk(
    "auth/getUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await customAxios.get("/user/getuser");
            console.log(response?.data)
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to send OTP");
        }
    }
);