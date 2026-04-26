import { useEffect, useState } from "react";
import { getAllAuthors, updateAuthor, deleteAuthor } from "../services/authorApi";
import { toast } from "react-toastify";
import ModalEditAuthor from "../components/ModalEditAuthor";

function ListAuthorPage() {
    const [authors, setAuthors] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [showEditModal, setShowEditModal] = useState(false);
    const [authorSelected, setAuthorSelected] = useState({});
    const [editErrors, setEditErrors] = useState([]);

    const itemsPerPage = 5;
    const start = currentPage * itemsPerPage;
    const currentItems = authors.slice(start, start + itemsPerPage);

    useEffect(() => {
        fetchAuthorData();
    }, []);

    const fetchAuthorData = async () => {
        try {
            const res = await getAllAuthors();
            setAuthors(res.data);
        } catch (err) {
            toast.error("Không tải được danh sách");
        }
    };

    const handleSubmit = async (author) => {
        try {
            setEditErrors(null);
            const authorChanged = await updateAuthor(author.id, author);
            setShowEditModal(false);
            setAuthors(
                authors.map((item) =>
                    item.id === authorChanged.data.id
                        ? authorChanged.data
                        : item,
                ),
            );
            toast.success("Cập nhật thành công");
        } catch (error) {
            if (error.response?.status === 422) {
                setEditErrors(error.response.data.errors);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            if (!window.confirm("Xóa tác giả này?")) return;
            await deleteAuthor(id);

            setAuthors(authors.filter((item) => item.id !== id));
        } catch (error) {
            if (error.response?.status === 500) {
                toast.error("Xóa thất bại, đã xảy ra lỗi!");
            }
        }
    };

    return (
        <div className="col-10">
            <div className="container">
                <table className="table table-bordered mt-4">
                    <thead className="text-center">
                        <tr>
                            <th scope="col" width="100px">
                                No
                            </th>
                            <th scope="col">Name</th>
                            <th scope="col" width="160px">
                                Books
                            </th>
                            <th scope="col" width="120px">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems?.map((author, index) => (
                            <tr key={index}>
                                <th className="text-center" scope="row">
                                    {index + start + 1}
                                </th>
                                <td>{author.name}</td>
                                <td className="text-center">
                                    {author.booksCount}
                                </td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => {
                                            setShowEditModal(true);
                                            setAuthorSelected(author);
                                            setEditErrors(null)
                                        }}
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(author.id)}
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ul className="pagination justify-content-center">
                    {Array.from({
                        length: Math.ceil(authors.length / itemsPerPage),
                    }).map((_, i) => (
                        <li
                            key={i}
                            className={`page-item ${currentPage === i ? "active" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(i)}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {showEditModal && authorSelected && (
                <ModalEditAuthor
                    show={showEditModal}
                    author={authorSelected}
                    onClose={() => setShowEditModal(false)}
                    onSubmit={handleSubmit}
                    apiErrors={editErrors}
                />
            )}
        </div>
    );
}

export default ListAuthorPage;
