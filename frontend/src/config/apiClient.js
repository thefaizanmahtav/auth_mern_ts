import axios from "axios"

const options = {
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
}

const API = axios.create(options);
// Set up request interceptors

API.interceptors.response.use(
    (response) => response.data,
    // Handle errors globally
    (error) => {
        const { status, data } = error.response || {};
        return Promise.reject({
            status, ...data
        })
    }

)

export default API;
