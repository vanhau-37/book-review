import { useEffect, useState } from "react";
import { createReview } from "../services/reviewApi";
import { getAllBooks } from "../services/bookAPI";
import { toast } from "react-toastify";

function CreateReviewPage() {
    const [form, setForm] = useState({
        content: "",
        bookId: "",
    });
    const [books, setBooks] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchReviewsData();
    }, []);

    const fetchReviewsData = async () => {
        const res = await getAllBooks();
        const data = res.data.map((book) => ({
            id: book.id,
            title: book.title,
        }));
        setBooks(data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors(null);
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleCreateReview = async (data) => {
        try {
            await createReview(data);
            setForm({
                content: "",
                bookId: "",
            });
            setErrors(null);
            toast.success("Thêm sách thành công");
        } catch (error) {
            if (error.response?.status === 422) {
                const arrErrors = error.response.data.errors;
                const formatError = {};
                arrErrors.forEach((err) => {
                    if (!formatError[err.field]) {
                        formatError[err.field] = [];
                    }
                    formatError[err.field].push(err.message);
                });
                console.log(formatError);
                setErrors(formatError);
            }
        }
    };

    const handleSubmit = () => {
        setErrors(null);
        handleCreateReview(form);
    };

    return (
        <>
            <div className="col-10">
                <div className="d-flex justify-content-center align-items-center h-75">
                    <div className="w-50">
                        <label className="form-label">Book</label>
                        <select
                            className={`form-select ${errors?.bookId ? "is-invalid" : ""}`}
                            name="bookId"
                            aria-label="Default select example"
                            value={form.bookId}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Open this select menu
                            </option>
                            {books?.map((book) => (
                                <option key={book.id} value={book.id}>
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
                            value={form.content}
                            onChange={handleChange}
                            className={`form-control ${
                                errors?.content ? "is-invalid" : ""
                            }`}
                        />
                        {errors?.content && (
                            <div className="invalid-feedback">
                                {errors.content[0]}
                            </div>
                        )}

                        <div className="d-flex justify-content-end mt-3">
                            <button
                                className="btn btn-primary px-4"
                                onClick={handleSubmit}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateReviewPage;
