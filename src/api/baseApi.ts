import axios from "axios";

const baseUrl = axios.create({
    baseURL: "https://dummyjson.com",
    headers: {
        "Content-Type": "application/json",
    },
})

export default baseUrl;

