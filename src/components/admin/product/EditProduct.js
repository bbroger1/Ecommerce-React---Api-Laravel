import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

function EditProduct(props) {

    const [errorList, setErrorList] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [productError, setProductError] = useState([]);
    const [productInput, setProductInput] = useState([]);
    const [selectData, setSelectData] = useState([]);
    const [picture, setPicture] = useState();
    const product_id = props.match.params.id;

    //Preencher select categoria
    useEffect(() => {

        axios.get(`/api/all-category`)
            .then(res => {
                if (res.data.status === 200) {
                    setSelectData(res.data.data)
                }
            }).catch(error => {
                console.error(error);
            })

    }, []);

    //buscar os dados do produto via api
    useEffect(() => {
        axios.post(`/api/edit-product/${product_id}`)
            .then(res => {
                if (res.data.status === 200) {
                    setProductInput(
                        res.data.product
                    );
                    setLoading(false);

                    if (res.data.product.status === 1) {
                        document.getElementById('status_checkbox').checked = true;
                    };

                    if (res.data.product.popular === 1) {
                        document.getElementById('popular_checkbox').checked = true;
                    };

                    if (res.data.product.featured === 1) {
                        document.getElementById('featured_checkbox').checked = true;
                    };

                } else {
                    history.goBack();
                }
            }).catch(error => {
                setProductError(error.message)
            });
    }, [product_id, history]);

    const handleInput = (e) => {
        e.persist();
        setProductInput({ ...productInput, [e.target.name]: e.target.value });
    }

    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] })
    };

    if (loading) {
        return <h3>Loading Product</h3>;
    }

    const submitEditProduct = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('_method', 'PUT');

        if (document.getElementById('upload_image').value !== '') {
            formData.append('image', picture.image);
        }

        if (document.getElementById('old_image').value !== '') {
            formData.append('old_image', productInput.image)
        }

        formData.append('category_id', productInput.category_id);
        formData.append('slug', productInput.slug);
        formData.append('name', productInput.name);
        formData.append('description', productInput.description);

        formData.append('meta_description', productInput.meta_description);
        formData.append('meta_keyword', productInput.meta_keyword);
        formData.append('meta_title', productInput.meta_title);

        formData.append('selling_price', productInput.selling_price);
        formData.append('original_price', productInput.original_price);
        formData.append('quantity', productInput.quantity);
        formData.append('brand', productInput.brand);
        let checkFeatured = document.getElementById('featured_checkbox').checked ? 1 : 0
        formData.append('featured', checkFeatured);
        let checkPopular = document.getElementById('popular_checkbox').checked ? 1 : 0
        formData.append('popular', checkPopular);
        let checkStatus = document.getElementById('status_checkbox').checked ? 1 : 0
        formData.append('status', checkStatus);

        axios.post(`/api/update-product/${product_id}`, formData)
            .then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    setProductInput(
                        res.data.product
                    );
                } else if (res.data.status === 422) {
                    setProductInput({ ...productInput, errorList: res.data.validation_errors })
                } else if (res.data.status === 400) {
                    setProductError(res.data.message)
                }
            }).catch(error => {
                console.error(error)
            })
    }

    var display_errors = [];
    if (productInput.errorList) {
        display_errors = [
            productInput.errorList.category_id,
            productInput.errorList.slug,
            productInput.errorList.name,
            productInput.errorList.meta_title,
            productInput.errorList.meta_keyword,
            productInput.errorList.meta_description,
            productInput.errorList.selling_price,
            productInput.errorList.original_price,
            productInput.errorList.quantity,
            productInput.errorList.brand,
            productInput.errorList.image,
        ]
    }

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h3>Edit Product
                        <Link to="/admin/product" className="btn btn-primary btn-sm float-end">View Products</Link>
                    </h3>
                </div>

                <span className='text-danger'>
                    {display_errors.map((item, key) => {
                        return (<p className="mb-1" key={key}>{item}</p>)
                    })}
                </span>

                <div className="card-body">
                    <form onSubmit={submitEditProduct} encType="multipart/form-data">

                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seotags-tab" data-bs-toggle="tab" data-bs-target="#seotags" type="button" role="tab" aria-controls="seotags" aria-selected="false">SEO Tags</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Other details</button>
                            </li>
                        </ul>

                        <div className="tab-content" id="myTabContent">

                            <div className="tab-pane card-body bordered fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="form-group mb-3">
                                    <label>Select Category</label>
                                    <select name="category_id" onChange={handleInput} value={productInput.category_id} className="form-select" required >
                                        <option>Choose Category</option>
                                        {selectData.map((item) => {
                                            return (
                                                <option value={item.id} key={item.id}>{item.name}</option>
                                            )
                                        })}

                                    </select>
                                </div>

                                <div className="form-group mb-3">
                                    <label>Slug</label>
                                    <input onChange={handleInput} value={productInput.slug} type="text" name="slug" className="form-control" required />
                                </div>

                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input onChange={handleInput} value={productInput.name} type="text" name="name" className="form-control" required />
                                </div>

                                <div className="form-group mb-3">
                                    <label>Description</label>
                                    <textarea onChange={handleInput} value={productInput.description || ''} type="text" name="description" className="form-control"></textarea>
                                </div>
                            </div>

                            <div className="tab-pane card-body bordered fade" id="seotags" role="tabpanel" aria-labelledby="seotags-tab">
                                <div className="form-group mb-3">
                                    <label>Meta Title</label>
                                    <input onChange={handleInput} value={productInput.meta_title || ''} type="text" name="meta_title" className="form-control" />
                                </div>

                                <div className="form-group mb-3">
                                    <label>Meta Keyword</label>
                                    <textarea onChange={handleInput} value={productInput.meta_keyword || ''} type="text" name="meta_keyword" className="form-control"></textarea>
                                </div>

                                <div className="form-group mb-3">
                                    <label>Meta Description</label>
                                    <textarea onChange={handleInput} value={productInput.meta_description || ''} type="text" name="meta_description" className="form-control"></textarea>
                                </div>
                            </div>

                            <div className="tab-pane card-body bordered fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                                <div className="row">
                                    <div className="col-md-2 col-sm-12 form-group mb-3">
                                        <input type="hidden" name="old_image" id="old_image" value={productInput.image} className="form-control" />
                                        <img src={`http://ecommerce_react.test/${productInput.image}`} width="50" height="50" alt={productInput.image}></img>
                                    </div>

                                    <div className="col-md-10 col-sm-12 form-group mb-3">
                                        <label>Image</label>
                                        <input onChange={handleImage} type="file" name="image" id="upload_image" className="form-control" />
                                    </div>

                                    <div className="col-md-3 col-sm-12 form-group mb-3">
                                        <label>Selling Price</label>
                                        <input onChange={handleInput} value={productInput.selling_price} type="text" name="selling_price" className="form-control" required />
                                    </div>

                                    <div className="col-md-3 col-sm-12 form-group mb-3">
                                        <label>Original Price</label>
                                        <input onChange={handleInput} value={productInput.original_price} type="text" name="original_price" className="form-control" required />
                                    </div>

                                    <div className="col-md-3 col-sm-12 form-group mb-3">
                                        <label>Quantity</label>
                                        <input onChange={handleInput} value={productInput.quantity} type="number" name="quantity" className="form-control" required />
                                    </div>

                                    <div className="col-md-3 col-sm-12 form-group mb-3">
                                        <label>Brand</label>
                                        <input onChange={handleInput} value={productInput.brand} type="text" name="brand" className="form-control" required />
                                    </div>

                                    <div className="col-md-3 col-sm-12 form-group mb-3">
                                        <label>Featured (checked=shown)</label>
                                        <input onChange={handleInput} value={productInput.featured} id="featured_checkbox" type="checkbox" name="featured" className="w-50 h-50" />
                                    </div>

                                    <div className="col-md-4 col-sm-12 form-group mb-3">
                                        <label>Popular (checked=shown)</label>
                                        <input onChange={handleInput} value={productInput.popular} id="popular_checkbox" type="checkbox" name="popular" className="w-50 h-50" />
                                    </div>

                                    <div className="col-md-4 col-sm-12 form-group mb-3">
                                        <label>Status (checked=shown)</label>
                                        <input onChange={handleInput} value={productInput.status} id="status_checkbox" type="checkbox" name="status" className="w-50 h-50" />
                                    </div>

                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-sm btn-primary px-4 mt-2 float-end">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProduct;

