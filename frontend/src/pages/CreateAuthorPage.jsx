import { useState } from "react";
import { createAuthor } from "../services/authorAPI";
import {toast} from 'react-toastify'

function CreateAuthorPage() {
    const [form, setForm] = useState({
        name: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors(null)
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleCreateAuthor = async (data) => {
        try {
            await createAuthor(data);
            setForm({
                name: "",
            });
            setErrors(null);
            toast.success("Thêm tác giả thành công");
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
                setErrors(formatError);
            }
        }
    };

    const handleSubmit = () => {
        setErrors(null)
        handleCreateAuthor(form);
    };

    return (
        <>
            <div className="col-10">
                <div className="d-flex justify-content-center align-items-center h-75">
                    <div className="w-50">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className={`form-control ${
                                errors?.name ? "is-invalid" : ""
                            }`}
                        />
                        {errors?.name && (
                            <div className="invalid-feedback">
                                {errors.name[0]}
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

export default CreateAuthorPage;
