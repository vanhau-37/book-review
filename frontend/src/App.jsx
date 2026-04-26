import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";
import Breadcrumb from "./components/Breadcrumb";
import CreateAuthorPage from "./pages/CreateAuthorPage";
import ListAuthorPage from "./pages/ListAuthorPage";
import CreateBookPage from "./pages/CreateBookPage";
import ListBookPage from "./pages/ListBookPage";
import CreateReviewPage from "./pages/CreateReviewPage";
import ListReviewPage from "./pages/ListReviewPage";

function App() {
    return (
        <BrowserRouter>
            <div className="d-flex flex-column min-vh-100">
                <Header />
                <Breadcrumb />

                <div className="d-flex">
                    <Sidebar />
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate to="/authors/create" />}
                        />
                        <Route
                            path="/authors/create"
                            element={<CreateAuthorPage />}
                        />
                        <Route
                            path="/authors/list"
                            element={<ListAuthorPage />}
                        />
                        <Route
                            path="/books/create"
                            element={<CreateBookPage />}
                        />
                        <Route
                            path="/books/list"
                            element={<ListBookPage />}
                        />
                        <Route
                            path="/reviews/create"
                            element={<CreateReviewPage />}
                        />
                        <Route
                            path="/reviews/list"
                            element={<ListReviewPage />}
                        />
                    </Routes>
                </div>

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    pauseOnHover
                    draggable
                />
            </div>
        </BrowserRouter>
    );
}

export default App;
