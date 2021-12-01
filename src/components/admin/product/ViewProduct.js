import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Modal from "./Modal";

function ViewProduct() {

    const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);
    const [productModal, setProductModal] = useState(false);
    const [tempData, setTempData] = useState([]);

    useEffect(() => {

        axios.post(`/api/view-product`)
            .then(res => {
                if (res.status === 200) {
                    setProductList(res.data.products);
                }
                setLoading(false);
            })
            .catch(res => {
                setLoading(false);
            })
    }, []);

    const modalDeleteProduct = (productName, id) => {
        let tempData = [productName, id];
        setTempData(item => [...tempData]);
        return setProductModal(true);
    }

    const deleteProduct = (e, id) => {
        e.preventDefault();

        axios.delete(`/api/delete-product/${id}`)
            .then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    document.getElementById(id).closest("tr").remove();
                }
                setProductModal(false);
            }).catch(error => {
                swal("Error", error.message, "error");
            })
    }

    var viewProduct_HTMLTABLE = "";
    if (loading) {
        return <h3>Loading Product</h3>;
    } else {
        viewProduct_HTMLTABLE =
            productList.map((item) => {
                return (
                    <tr key={item.id} id={item.id}>
                        <td>{item.id}</td>
                        <td><img src={`http://ecommerce_react.test/${item.image}`} width="50" height="50" alt={item.name}></img></td>
                        <td>{item.name}</td>
                        <td>{item.category.name}</td>
                        <td>{item.selling_price}</td>
                        <td className="text-center">
                            {item.status === 1 ? 'Show' : 'Hidden'}
                        </td>
                        <td className="text-center">
                            <Link to={`edit-product/${item.id}`} className="btn btn-primary btn-sm me-3">Edit</Link>
                            <button
                                onClick={() => modalDeleteProduct(item.name, item.id)}
                                className="btn btn-danger btn-sm">
                                Delete
                            </button>
                        </td>
                    </tr >
                )
            })
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h3>Product List
                        <Link to="/admin/add-product" className="btn btn-primary btn-sm float-end">Add Product</Link>
                    </h3>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Selling Price</th>
                                <th scope="col" className="text-center">Status</th>
                                <th scope="col" className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewProduct_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
            {productModal === true ?
                <Modal
                    productName={tempData[0]}
                    id={tempData[1]}
                    deleteProduct={(e) => deleteProduct(e, tempData[1])}
                    hide={() => setProductModal(false)}
                /> : ''}
        </div>
    )

}

export default ViewProduct;