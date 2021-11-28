import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

function EditCategory(props) {

    const [errorList, setErrorList] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [categoryError, setCategoryError] = useState([]);
    const [categoryInput, setCategoryInput] = useState([]);

    useEffect(() => {
        const category_id = props.match.params.id;
        axios.post(`/api/edit-category/${category_id}`)
            .then(res => {
                if (res.data.status === 200) {
                    setCategoryInput(
                        res.data.category
                    );
                    setLoading(false);

                    if (res.data.category.status === 1) {
                        document.getElementById('status_checkbox').checked = true;
                    };
                } else {
                    history.goBack();
                }
            }).catch(error => {
                setCategoryError(error.message)
            });
    }, [props.match.params.id, history]);

    const handleInput = (e) => {
        e.persist();
        setCategoryInput({ ...categoryInput, [e.target.name]: e.target.value });
    }

    if (loading) {
        return <h3>Loading Category</h3>;
    }

    const submitEditCategory = (e) => {
        e.preventDefault();

        const category_id = props.match.params.id;
        const data = categoryInput;
        if (document.getElementById('status_checkbox').checked) {
            data.status = 1;
        } else {
            data.status = 0
        };

        axios.put(`/api/update-category/${category_id}`, data)
            .then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    setCategoryInput(
                        res.data.category
                    );
                    setLoading(false);
                    setErrorList('');
                    setCategoryError('')

                    if (res.data.category.status === 1) {
                        document.getElementById('status_checkbox').checked = true;
                    };

                } else if (res.data.status === 422) {
                    setErrorList(res.data.validation_errors);
                }
            }).catch(error => {
                swal("Warning", error.data.message, "warning");
            });

    }

    var display_errors = [];
    if (errorList) {
        display_errors = [
            errorList.slug,
            errorList.name,
        ]
    }

    return (
        <div className="container-fluid px-4">
            <h3 className="mt-4">Edit Category
                <Link to="/admin/category" className="btn btn-primary btn-sm float-end">Categories</Link>
            </h3>
            <span className='text-danger'>
                {categoryError || ''}
            </span>

            <span className='text-danger'>
                {display_errors.map((item, key) => {
                    return (<p className="mb-1" key={key}>{item}</p>)
                })}
            </span>


            <form onSubmit={submitEditCategory} id="categoryForm">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">Seo Tags</button>
                    </li>
                </ul>

                <div className="tab-content" id="myTabContent">

                    <div className="tab-pane fade show active card-body border" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="form-group mb-3">
                            <label>Slug</label>
                            <input onChange={handleInput} value={categoryInput.slug} type="text" name="slug" className="form-control" required />
                        </div>

                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input onChange={handleInput} value={categoryInput.name} type="text" name="name" className="form-control" required />
                        </div>

                        <div className="form-group mb-3">
                            <label>Description</label>
                            <textarea onChange={handleInput} value={categoryInput.description || ''} name="description" className="form-control"></textarea>
                        </div>

                        <div className="form-check">
                            <input onChange={handleInput} value={categoryInput.status} name="status" id="status_checkbox" className="form-check-input" type="checkbox" />
                            <label className="form-check-label">
                                Select to release the publication
                            </label>
                        </div>
                    </div>

                    <div className="tab-pane fade card-body border" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                        <div className="form-group mb-3">
                            <label>Meta Title</label>
                            <input onChange={handleInput} value={categoryInput.meta_title || ''} type="text" name="meta_title" className="form-control" />
                        </div>

                        <div className="form-group mb-3">
                            <label>Meta Keywords</label>
                            <textarea onChange={handleInput} value={categoryInput.meta_keyword || ''} name="meta_keyword" className="form-control"></textarea>

                        </div>

                        <div className="form-group mb-3">
                            <label>Meta Description</label>
                            <textarea onChange={handleInput} value={categoryInput.meta_description || ''} name="meta_description" className="form-control"></textarea>
                        </div>
                    </div>

                </div>

                <button type="submit" className="btn btn-sm btn-primary mt-2 px-4 float-end">Save</button>
            </form>
        </div>
    )
}

export default EditCategory;

