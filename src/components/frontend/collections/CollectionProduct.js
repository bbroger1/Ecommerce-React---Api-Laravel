import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function CollectionProduct(props) {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const history = useHistory();

    useEffect(() => {
        let isMounted = true;
        const productSlug = props.match.params.slug;
        axios.get(`/api/fetchproducts/${productSlug}`)
            .then(response => {
                if (isMounted) {
                    if (response.data.status === 200) {
                        setProducts(response.data.products_data.products);
                        setCategory(response.data.products_data.category);
                    } else if (response.data.status === 404) {
                        history.push('/collection');
                        swal('Warning', response.data.message, "error")
                    } else if (response.data.status === 400) {
                        history.push('/collection');
                        swal('Warning', response.data.message, "error")
                    }
                }

                setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [history, props.match.params.slug]);

    if (loading) {
        return <h4>Loading Products...</h4>
    } else {
        var showProductList = '';

        if (products.length > 0) {
            showProductList = products.map((item, index) => {
                return (
                    <div className="col-md-3 mb-2" key={index}>
                        <div className="card text-center">
                            <Link to={`/collection/${category.slug.toLowerCase()}/${item.slug.toLowerCase().replace(' ', '-')}`}>
                                <img src={`http://ecommerce_react.test/${item.image}`} alt={item.name} className="img-fluid" />
                            </Link>
                            <div className="card-body text-center">
                                <Link to={`/collection/${category.slug.toLowerCase()}/${item.slug.toLowerCase().replace(' ', '-')}`} >
                                    <h5>{item.name}</h5>
                                </Link>
                            </div>
                        </div>
                    </div >
                )
            })
        } else {
            showProductList =
                <div className="col-md-12">
                    <h4>No products available for {category.name}</h4>
                </div>
        }

    }

    return (
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Collection / {category.name}</h6>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row">
                        {showProductList}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollectionProduct;