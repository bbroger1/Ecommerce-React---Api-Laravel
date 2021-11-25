import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

function Category() {

    const [categoryError, setCategoryError] = useState([]);
    const [categoryInput, setCategoryInput] = useState({
        slug: '',
        name: '',
        description: '',
        status: '',
        meta_title: '',
        meta_keyword: '',
        meta_description: '',
        errorList: []

    });

    const handleInput = (e) => {
        e.persist();
        setCategoryInput({ ...categoryInput, [e.target.name]: e.target.value });
    }

    const submitCategory = (e) => {
        e.preventDefault();

        const data = {
            slug: categoryInput.slug,
            name: categoryInput.name,
            description: categoryInput.description,
            status: document.getElementById('status_checkbox').checked ? 1 : 0,
            meta_title: categoryInput.meta_title,
            meta_keyword: categoryInput.meta_keyword,
            meta_description: categoryInput.meta_description,
        }

        axios.post(`/api/store-category`, data)
            .then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    setCategoryError('');
                    setCategoryInput({
                        ...categoryInput,
                        slug: '',
                        name: '',
                        description: '',
                        status: '',
                        meta_title: '',
                        meta_keyword: '',
                        meta_description: '',
                        errorList: []
                    });

                    if (document.getElementById('status_checkbox').checked) {
                        document.getElementById('status_checkbox').checked = false;
                    };

                } else if (res.data.validation_errors) {
                    setCategoryInput({ ...categoryInput, errorList: res.data.validation_errors })
                }
            }).catch(error => {
                setCategoryError(error.message)
            });

    }

    var display_errors = [];
    if (categoryInput.errorList) {
        display_errors = [
            categoryInput.errorList.slug,
            categoryInput.errorList.name,
        ]
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Add Category</h1>
            <span className='text-danger'>
                {categoryError || ''}
            </span>

            <span className='text-danger'>
                {display_errors.map((item, key) => {
                    return (<p className="mb-1" key={key}>{item}</p>)
                })}
            </span>


            <form onSubmit={submitCategory} id="categoryForm">
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
                            <input onChange={handleInput} value={categoryInput.slug} type="text" name="slug" className="form-control" />
                        </div>

                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input onChange={handleInput} value={categoryInput.name} type="text" name="name" className="form-control" />
                        </div>

                        <div className="form-group mb-3">
                            <label>Description</label>
                            <textarea onChange={handleInput} value={categoryInput.description} name="description" className="form-control"></textarea>
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
                            <input onChange={handleInput} value={categoryInput.meta_title} type="text" name="meta_title" className="form-control" />
                        </div>

                        <div className="form-group mb-3">
                            <label>Meta Keywords</label>
                            <textarea onChange={handleInput} value={categoryInput.meta_keyword} name="meta_keyword" className="form-control"></textarea>

                        </div>

                        <div className="form-group mb-3">
                            <label>Meta Description</label>
                            <textarea onChange={handleInput} value={categoryInput.meta_description} name="meta_description" className="form-control"></textarea>
                        </div>
                    </div>

                </div>

                <button type="submit" className="btn btn-sm btn-primary mt-2 px-4 float-end">Save</button>
            </form>
        </div>
    )
}

export default Category;

