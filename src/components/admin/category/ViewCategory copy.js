import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Modal from "./Modal";

function ViewCategory() {

    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);
    const [categoryModal, setCategoryModal] = useState(false);
    const [tempData, setTempData] = useState([]);

    useEffect(() => {

        axios.post(`/api/view-category`)
            .then(res => {
                if (res.status === 200) {
                    setCategoryList(res.data.data);
                }

                setLoading(false);
            })
            .catch(res => {
                setLoading(false);
            })
    }, []);

    const modalDeleteCategory = (categoryName, id) => {
        let tempData = [categoryName, id];
        setTempData(item => [...tempData]);
        return setCategoryModal(true);
    }

    const deleteCategory = (e, id) => {
        e.preventDefault();

        axios.delete(`/api/delete-category/${id}`)
            .then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    document.getElementById(id).closest("tr").remove();
                }
                setCategoryModal(false);
            }).catch(error => {
                swal("Error", error.message, "error");
            })
    }

    var viewCategory_HTMLTABLE = "";
    if (loading) {
        return <h3>Loading Category</h3>;
    } else {
        viewCategory_HTMLTABLE =
            categoryList.map((item) => {
                return (
                    <tr key={item.id} id={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.slug}</td>
                        <td className="text-center">
                            {item.status === 1 ? 'Show' : 'Hidden'}
                        </td>
                        <td className="text-center">
                            <Link to={`edit-category/${item.id}`} className="btn btn-primary btn-sm me-3">Edit</Link>
                            <button
                                onClick={() => modalDeleteCategory(item.name, item.id)}
                                className="btn btn-danger btn-sm">
                                Delete
                            </button>
                        </td>
                    </tr>
                )
            })
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h3>Category List
                        <Link to="/admin/add-category" className="btn btn-primary btn-sm float-end">Add Category</Link>
                    </h3>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Slug</th>
                                <th scope="col" className="text-center">Status</th>
                                <th scope="col" className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewCategory_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
            {categoryModal === true ?
                <Modal
                    categoryName={tempData[0]}
                    id={tempData[1]}
                    deleteCategory={(e) => deleteCategory(e, tempData[1])}
                    hide={() => setCategoryModal(false)}
                /> : ''}
        </div>
    )

}

export default ViewCategory;