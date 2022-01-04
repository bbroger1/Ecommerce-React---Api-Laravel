import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

function ProductDetail(props) {

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [mounted, setMounted] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const history = useHistory();
    const categorySlug = props.match.params.category;
    const productSlug = props.match.params.product;

    useEffect(() => {
        async function fetchproduct() {
            await axios.get(`/api/fetchproduct/${categorySlug}/${productSlug}`)
                .then(response => {
                    if (mounted) {
                        if (response.data.status === 200) {
                            setProduct(response.data.product);
                            setLoading(false);
                        } else if (response.data.status === 404) {
                            history.push(`/collection/${categorySlug}`);
                            swal('Warning', response.data.message, "error")
                        } else if (response.data.status === 400) {
                            history.push(`/collection/${categorySlug}`);
                            swal('Warning', response.data.message, "error")
                        }
                    }
                });
        }

        fetchproduct();
        return () => {
            setMounted(false);
        };

    }, [history, productSlug, categorySlug, mounted]);

    //decrementar a quantidade de produtos a serem comprados
    const handleDecrement = () => {
        let productQuantity = document.getElementById('product_quantity').innerText;
        if (productQuantity > 1) {
            setQuantity(productQuantity => productQuantity - 1);
        }
    }

    //incrementar a quantidade de produtos a serem comprados
    const handleIncrement = () => {
        let productQuantity = document.getElementById('product_quantity').innerText;
        if (productQuantity < product.quantity) {
            setQuantity(productQuantity => productQuantity + 1);
        }
    }

    //adicionar ao carrinho
    const submitAddCart = (e) => {
        e.preventDefault();

        const data = {
            productId: product.id,
            quantity: quantity
        }

        axios.post(`/api/add-cart`, data)
            .then(response => {
                if (response.data.status === 201) {
                    swal("Success", response.data.message, 'success');
                } else if (response.data.status === 401) {
                    swal("Warning", response.data.message, 'warning');
                } else if (response.data.status === 404) {
                    swal("Error", response.data.message, 'error');
                } else if (response.data.status === 409) {
                    swal("Warning", response.data.message, 'warning');
                }
            })

    }

    //mostrar o botão de compra
    if (loading) {
        return <h4>Loading Product Detail</h4>;
    } else {
        var stock;

        if (product.quantity > 0) {
            stock =
                <div>
                    <label className="btn-sm btn-success px-4 mt-2">In Stock</label>

                    <div className="row" >
                        <div className="col-md-3 mt-3">
                            <div className="input-group">
                                <button onClick={handleDecrement} type="button" className="input-group-text">-</button>
                                <span className="form-control text-center" id="product_quantity">{quantity}</span>
                                <button onClick={handleIncrement} type="button" className="input-group-text">+</button>
                            </div>
                        </div>

                        <div className="col-md-3 mt-3">
                            <button onClick={submitAddCart} type="button" className="btn btn-success w-100">Add to Cart</button>
                        </div>
                    </div >
                </div>
        } else {
            stock =
                <div>
                    <label className="btn-sm btn-secondary px-4 mt-2">No Stock</label>
                </div>
        }
    }

    return (
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Collection / {categorySlug[0].toUpperCase() + categorySlug.slice(1).toLowerCase()} / {productSlug[0].toUpperCase() + productSlug.slice(1).toLowerCase()}</h6>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 border-end">
                            <img src={`http://ecommerce_react.test/${product.image}`} alt={product.name} className="img-fluid" />
                        </div>

                        <div className="col-md-8">
                            <h4>
                                {product.name}
                                <span className="float-end badge btn-sm btn-danger badge-pil">{product.brand}</span>
                            </h4>

                            <p>{product.description}</p>

                            <div className="row">
                                <div className="col-md-2">
                                    <h4 className="mb-1">$ {product.selling_price}</h4>
                                </div>
                                <div className="col-md-2">
                                    <h5><s className="ms-2">$ {product.original_price}</s></h5>
                                </div>
                            </div>

                            {stock}

                            <button type="button" className="btn btn-primary mt-3">Add to Wishlist</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;