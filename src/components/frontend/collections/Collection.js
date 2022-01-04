import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Collection() {

    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);

    useEffect(() => {

        async function getCategory() {
            axios.get('/api/getCategory')
                .then(response => {
                    if (response.data.status === 200) {
                        setCategory(response.data.category);
                    }
                    setLoading(false);
                })
                .catch(response => {
                    console.log(response);
                });
        }
        getCategory()
    }, []);

    if (loading) {
        return <h4>Loading Categories...</h4>
    } else {
        var showCategoryList = '';

        showCategoryList = category.map((item, index) => {
            return (
                <div className="col-md-4 mb-2" key={index}>
                    <div className="card">
                        <div className="card-body text-center">
                            <Link to={`collection/${item.slug.toLowerCase()}`} >
                                <h5>{item.name}</h5>
                            </Link>
                        </div>
                    </div>
                </div >
            )
        })
    }

    return (
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Category Page</h6>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row">
                        {showCategoryList}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Collection;