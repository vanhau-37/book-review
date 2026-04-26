import { useEffect, useState } from "react";
import { getAllReviews, updateReview, deleteReview } from "../services/reviewApi";
import { getAllBooks } from "../services/bookAPI";
import { toast } from "react-toastify";
import ModalEditReview from "../components/ModalEditReview";

function ListReviewPage() {
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [showEditModal, setShowEditModal] = useState(false);
    const [reviewSelected, setReviewSelected] = useState({});
    const [editErrors, setEditErrors] = useState([]);

    const itemsPerPage = 5;
    const start = currentPage * itemsPerPage;
    const currentItems = reviews.slice(start, start + itemsPerPage);

    useEffect(() => {
        fetchReviewData();
    }, []);

    const fetchReviewData = async () => {
        try {
            const res = await getAllReviews();
            setReviews(res.data);
        } catch (err) {
            toast.error("Không tải được danh sách");
        }
    };

    const handleSubmit = async (review) => {
        try {
            setEditErrors(null);
            const reviewChanged = await updateReview(review.id, review);
            setShowEditModal(false);
            setReviews(
                reviews.map((item) =>
                    item.id === reviewChanged.data.id
                        ? reviewChanged.data
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
            if (!window.confirm("Xóa bình luận này?")) return;
            await deleteReview(id);

            setReviews(reviews.filter((item) => item.id !== id));
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
                            <th scope="col">Book</th>
                            <th scope="col" width="230px">Author</th>
                            <th scope="col" >
                                Review
                            </th>
                            <th scope="col" width="120px">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems?.map((review, index) => (
                            <tr key={index}>
                                <th className="text-center" scope="row">
                                    {index + start + 1}
                                </th>
                                <td>{review.book.title}</td>
                                <td>
                                    {review.book.author.name}
                                </td>
                                <td>
                                    {review.content}
                                </td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => {
                                            setShowEditModal(true);
                                            setReviewSelected(review);
                                            setEditErrors(null)
                                        }}
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(review.id)}
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
                        length: Math.ceil(reviews.length / itemsPerPage),
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
            {showEditModal && reviewSelected && (
                <ModalEditReview
                    show={showEditModal}
                    review={reviewSelected}
                    onClose={() => setShowEditModal(false)}
                    onSubmit={handleSubmit}
                    apiErrors={editErrors}
                />
            )}
        </div>
    );
}

export default ListReviewPage;
