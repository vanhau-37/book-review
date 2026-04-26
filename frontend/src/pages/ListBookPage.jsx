import { useEffect, useState } from "react";
import { getAllBooks, updateBook, deleteBook } from "../services/bookAPI";
import { toast } from "react-toastify";
import ModalEditBook from "../components/ModalEditBook";

function ListBookPage() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [showEditModal, setShowEditModal] = useState(false);
    const [bookSelected, setBookSelected] = useState({});
    const [editErrors, setEditErrors] = useState([]);

    const itemsPerPage = 5;
    const start = currentPage * itemsPerPage;
    const currentItems = books.slice(start, start + itemsPerPage);

    useEffect(() => {
        fetchBookData();
    }, []);

    const fetchBookData = async () => {
        try {
            const res = await getAllBooks();
            setBooks(res.data);
        } catch (err) {
            toast.error("Không tải được danh sách");
        }
    };

    const handleSubmit = async (book) => {
        try {
            setEditErrors(null);
            const bookChanged = await updateBook(book.id, book);
            setShowEditModal(false);
            setBooks(
                books.map((item) =>
                    item.id === bookChanged.data.id ? bookChanged.data : item,
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
            if (!window.confirm("Xóa sách này?")) return;
            await deleteBook(id);

            setBooks(books.filter((item) => item.id !== id));
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
                            <th scope="col">Title</th>
                            <th scope="col" width="190px">
                                Author
                            </th>
                            <th scope="col" width="120px">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems?.map((book, index) => (
                            <tr key={index}>
                                <th className="text-center" scope="row">
                                    {index + start + 1}
                                </th>
                                <td>{book.title}</td>
                                <td>{book.author.name}</td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => {
                                            setShowEditModal(true);
                                            setBookSelected(book);
                                            setEditErrors(null);
                                        }}
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(book.id)}
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
                        length: Math.ceil(books.length / itemsPerPage),
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
            {showEditModal && bookSelected && (
                <ModalEditBook
                    show={showEditModal}
                    book={bookSelected}
                    onClose={() => setShowEditModal(false)}
                    onSubmit={handleSubmit}
                    apiErrors={editErrors}
                />
            )}
        </div>
    );
}

export default ListBookPage;
