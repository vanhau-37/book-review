import axiosClient from "./axiosClient";

export const getAllAuthors = () => {
    return axiosClient.get("/api/authors");
};

export const createAuthor = (data) => {
    return axiosClient.post("/api/authors", data);
};

export const updateAuthor = (id, data) => {
    return axiosClient.put(`/api/authors/${id}`, data);
};

export const deleteAuthor = (id) => {
    return axiosClient.delete(`/api/authors/${id}`);
};