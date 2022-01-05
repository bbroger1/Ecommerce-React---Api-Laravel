import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

function Cart() {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [itens, setItens] = useState([]);
    const [totalCart, setTotalCart] = useState();

    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/cart`)
            .then(response => {
                if (isMounted) {
                    if (response.data.status === 200) {
                        setCart(response.data.cart);
                        setTotalCart(response.data.cart.total);
                        setItens(response.data.items);
                    } else if (response.data.status === 204) {
                        history.push('/cart');
                        swal('Warning', response.data.message, "warning")
                    } else if (response.data.status === 401) {
                        history.push('/cart');
                        swal('Warning', response.data.message, "warning")
                    }
                }

                setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [history]);

    //incrementar e decrementar a quantidade de produtos a serem comprados
    const handleUpdatePurchase = (purchaseId, sum, productId, action) => {

        let data = {
            purchaseId: purchaseId,
            sum: sum,
            productId: productId,
            action: action
        }

        axios.put(`/api/update-purchase`, data)
            .then(response => {
                if (response.data.status === 200) {
                    setCart(response.data.cart);
                    setTotalCart(response.data.cart.total);
                    setItens([...response.data.items]);
                } else if (response.data.status === 401) {
                    history.push('/');
                    swal('Error', response.data.message, "error")
                } else if (response.data.status === 404) {
                    history.push('/');
                    swal('Error', response.data.message, "error")
                }
            });
    }

    //deletar produto do carrinho
    const handleDeletePurchase = (e, purchaseId) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Removing";

        axios.delete(`/api/delete-purchase/${purchaseId}`)
            .then(response => {
                if (response.data.status === 200) {
                    thisClicked.closest("tr").remove();
                    setTotalCart(response.data.total_cart);
                } else if (response.data.status === 404) {
                    swal('Error', response.data.message, "error");
                }
            });
    }

    if (loading) {
        return <h4>Loading Products...</h4>
    } else {
        var showProductList = [];

        if (itens.length > 0) {

            itens.map((item, index) => {
                return (
                    showProductList.push(
                        <tr key={index} id={item.id}>
                            <td className="text-center" width="10%">
                                <img src={`http://ecommerce_react.test/${item.product.image}`} width="50" height="50" alt={item.product.name} />
                            </td>
                            <td className="text-center" width="25%">{item.product.name}</td>
                            <td className="text-center" width="10%">$ {item.product.selling_price}</td>
                            <td className="text-center" width="15%">
                                <div className="input-group">
                                    <button
                                        onClick={() => handleUpdatePurchase(item.id, item.sum, item.product.id, 'decrement')}
                                        type="button"
                                        className="input-group-text"
                                        disabled={item.sum <= 1 ? "disabled" : ""}
                                    >-</button>
                                    <span className="form-control text-center">{item.sum}</span>
                                    <button
                                        onClick={() => handleUpdatePurchase(item.id, item.sum, item.product.id, 'increment')}
                                        type="button"
                                        className="input-group-text">+</button>
                                </div>
                            </td>
                            <td className="text-center" width="10%">$ {parseFloat(item.product.selling_price) * parseInt(item.sum)}</td>
                            <td className="text-center" width="10%">
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={(e) => handleDeletePurchase(e, item.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                );
            });

            showProductList.push(
                <tr key={cart.id}>
                    <td colSpan="4" className="text-end"><b>Total</b></td>
                    <td colSpan="2" className="text-center" id="cart_total"><b>$ {totalCart}</b></td>
                </tr>
            );


        } else {
            showProductList.push(
                <tr key="1">
                    <td colSpan='6' className="text-center">Cart empty</td>
                </tr>
            )
        }
    }

    return (
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Home / Cart</h6>
                </div>
            </div>

            <div className="py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Product</th>
                                            <th className="text-center">Price</th>
                                            <th className="text-center">Quantity</th>
                                            <th className="text-center">Total Price</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {showProductList}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;