import axiosClient from "./axiosClient";

export const getAllReviews = () => {
    return axiosClient.get("/api/reviews");
};

export const createReview = (data) => {
    return axiosClient.post("/api/reviews", data);
};

export const updateReview = (id, data) => {
    return axiosClient.put(`/api/reviews/${id}`, data);
};

export const deleteReview = (id) => {
    return axiosClient.delete(`/api/reviews/${id}`);
};