import { useEffect, useState } from "react";
import { getAllAuthors } from "../services/authorAPI";

function ModalEditBook({ show, book, onClose, onSubmit, apiErrors }) {
    const [form, setForm] = useState({
        title: "",
        authorId: "",
    });
    const [errors, setErrors] = useState({});
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        fetchAuthorsData();
    }, []);

    const fetchAuthorsData = async () => {
        const res = await getAllAuthors();
        const data = res.data.map((author) => ({
            id: author.id,
            name: author.name,
        }));
        setAuthors(data);
    };

    useEffect(() => {
        if (show && book) {
            setForm({
                title: book.title ?? "",
                authorId: book.authorId ?? "",
            });
            setErrors({});
        }
    }, [show, book]);

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
            id: book.id,
            title: form.title,
            authorId: form.authorId,
        });
    };

    return (
        <>
            <div className="modal show d-block">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit book</h5>
                            <button
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="row g-3">
                                <div className="col-md-12">
                                    <label className="form-label">Title</label>
                                    <input
                                        name="title"
                                        className={`form-control ${
                                            errors?.title ? "is-invalid" : ""
                                        }`}
                                        value={form.title}
                                        onChange={handleChange}
                                    />
                                    {errors?.title && (
                                        <div className="invalid-feedback">
                                            {errors.title[0]}
                                        </div>
                                    )}

                                    <label className="form-label mt-4">
                                        Author
                                    </label>
                                    <select
                                        className={`form-select ${errors?.authorId ? "is-invalid" : ""}`}
                                        name="authorId"
                                        aria-label="Default select example"
                                        value={form.authorId}
                                        onChange={handleChange}
                                    >
                                        {authors?.map((author) => (
                                            <option
                                                key={author.id}
                                                value={author.id}
                                            >
                                                {author.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors?.authorId && (
                                        <div className="invalid-feedback">
                                            {errors.authorId[0]}
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

export default ModalEditBook;
