import { useEffect, useState } from "react";
import { createBook } from "../services/bookApi";
import { getAllAuthors } from "../services/authorApi";
import { toast } from "react-toastify";

function CreateBookPage() {
    const [form, setForm] = useState({
        title: "",
        authorId: "",
    });
    const [authors, setAuthors] = useState([]);
    const [errors, setErrors] = useState({});

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors(null);
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleCreateBook = async (data) => {
        try {
            await createBook(data);
            setForm({
                title: "",
                authorId: "",
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
        handleCreateBook(form);
    };

    return (
        <>
            <div className="col-10">
                <div className="d-flex justify-content-center align-items-center h-75">
                    <div className="w-50">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className={`form-control ${
                                errors?.title ? "is-invalid" : ""
                            }`}
                        />
                        {errors?.title && (
                            <div className="invalid-feedback">
                                {errors.title[0]}
                            </div>
                        )}

                        <label className="form-label mt-4">Author</label>
                        <select
                            className={`form-select ${errors?.authorId ? "is-invalid" : ""}`}
                            name="authorId"
                            aria-label="Default select example"
                            value={form.authorId}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Open this select menu
                            </option>
                            {authors?.map((author) => (
                                <option key={author.id} value={author.id}>
                                    {author.name}
                                </option>
                            ))}
                        </select>
                        {errors?.authorId && (
                            <div className="invalid-feedback">
                                {errors.authorId[0]}
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

export default CreateBookPage;
