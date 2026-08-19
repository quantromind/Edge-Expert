import React from "react";
import axios from "axios";
// console.log(import.meta.env.VITE_APP_API_URL)
const customAxios = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL || "http://localhost:3000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default customAxios;
