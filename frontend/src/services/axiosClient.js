import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;
