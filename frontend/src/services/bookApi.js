import axiosClient from "./axiosClient";

export const getAllBooks = () => {
    return axiosClient.get("/api/books");
};

export const createBook = (data) => {
    return axiosClient.post("/api/books", data);
};

export const updateBook = (id, data) => {
    return axiosClient.put(`/api/books/${id}`, data);
};

export const deleteBook = (id) => {
    return axiosClient.delete(`/api/books/${id}`);
};