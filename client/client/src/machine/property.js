import { useEffect, useState } from "react";
import customAxios from "../components/customAxios/Customaxios";

export const uploadproperty = async (formData, setLoading) => {
    setLoading(true);
    const propertyData = new FormData();

    for (const key in formData) {
        if (key === "images") {
            for (let file of formData.images) {
                propertyData.append("images", file);
            }
        } else {
            propertyData.append(key, formData[key]);
        }
    }

    try {
        const res = await customAxios.post("/property/post", propertyData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        setLoading(false)
        alert("Property uploaded successfully!");
        console.log(res.data);
    } catch (err) {
        setLoading(false)
        console.error(err);
        alert("Error uploading property.");
    }
};


export const fetchSuggestions = async (query, city, controller, setSuggestions) => {
    try {
        const res = await customAxios.get(`/search/places?input=${query}&city=${city}`,
            { signal: controller.signal })
        const data = await res.json();
        console.log(data)
        if (data) {
            setSuggestions([
                ...data.cityMatches.map((s) => ({ label: s, type: "city" })),
                ...data.otherMatches.map((s) => ({ label: s, type: "other" })),
            ]);
        }
    } catch (err) {
        console.error("Live suggestion fetch failed:", err);
    }
};