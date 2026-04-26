import { useEffect, useState } from "react";

function ModalEditAuthor({ show, author, onClose, onSubmit, apiErrors }) {
    const [form, setForm] = useState({
        name: "",
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (show && author) {
            setForm({
                name: author.name ?? "",
            });
            setErrors({});
        }
    }, [show, author]);

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
            id: author.id,
            name: form.name,
        });
    };

    return (
        <>
            <div className="modal show d-block">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit author</h5>
                            <button
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="row g-3">
                                <div className="col-md-12">
                                    <label className="form-label">Name</label>
                                    <input
                                        name="name"
                                        className={`form-control ${
                                            errors?.name ? "is-invalid" : ""
                                        }`}
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                    {errors?.name && (
                                        <div className="invalid-feedback">
                                            {errors.name[0]}
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

export default ModalEditAuthor;
