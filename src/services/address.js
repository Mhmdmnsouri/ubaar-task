// src/services/address.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: import.meta.env.VITE_API_TOKEN,
  },
});

export function createAddress(data) {
  return api.post("/address", {
    first_name: data.firstName,
    last_name: data.lastName,
    coordinate_mobile: data.mobile,
    coordinate_phone_number: data.landline || "",
    address: data.address,
    region: 1,
    lat: data.lat,
    lng: data.lng,
    gender: data.gender,
  });
}
