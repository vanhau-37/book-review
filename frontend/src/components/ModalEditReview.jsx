import { useEffect, useState } from "react";
import { getAllBooks } from "../services/bookApi";

function ModalEditReview({ show, review, onClose, onSubmit, apiErrors }) {
    const [form, setForm] = useState({
        content: "",
        bookId: "",
    });
    const [errors, setErrors] = useState({});
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooksData();
    }, []);

    const fetchBooksData = async () => {
        const res = await getAllBooks();
        const data = res.data.map((book) => ({
            id: book.id,
            title: book.title,
        }));
        setBooks(data);
    };

    useEffect(() => {
        if (show && review) {
            setForm({
                content: review.content ?? "",
                bookId: review.bookId ?? "",
            });
            setErrors({});
        }
    }, [show, review]);

    useEffect(() => {
        if (Array.isArray(apiErrors)) {
            const formattedErrors = {};

            apiErrors.forEach((err) => {
                if (!formattedErrors[err.field]) {
                    formattedErrors[err.field] = [];
                }
                formattedErrors[err.field].push(err.message);
            });

            setErrors(formattedErrors);
        }
    }, [apiErrors]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors(null);
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSave = () => {
        setErrors(null);
        onSubmit({
            id: review.id,
            content: form.content,
            bookId: form.bookId,
        });
    };

    return (
        <>
            <div className="modal show d-block">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit review</h5>
                            <button
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="row g-3">
                                <div className="col-md-12">
                                    <label className="form-label">
                                        Book
                                    </label>
                                    <select
                                        className={`form-select ${errors?.bookId ? "is-invalid" : ""}`}
                                        name="bookId"
                                        aria-label="Default select example"
                                        value={form.bookId}
                                        onChange={handleChange}
                                    >
                                        {books?.map((book) => (
                                            <option
                                                key={book.id}
                                                value={book.id}
                                            >
                                                {book.title}
                                            </option>
                                        ))}
                                    </select>
                                    {errors?.bookId && (
                                        <div className="invalid-feedback">
                                            {errors.bookId[0]}
                                        </div>
                                    )}

                                    <label className="form-label mt-4">Review</label>
                                    <textarea
                                        rows='4'
                                        name="content"
                                        className={`form-control ${
                                            errors?.content ? "is-invalid" : ""
                                        }`}
                                        value={form.content}
                                        onChange={handleChange}
                                    />
                                    {errors?.content && (
                                        <div className="invalid-feedback">
                                            {errors.content[0]}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Hủy
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleSave}
                            >
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            <div className="modal-backdrop show"></div>
        </>
    );
}

export default ModalEditReview;
