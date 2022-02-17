import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

function Checkout() {

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

    if (loading) {
        return <h4>Loading Products...</h4>
    } else {
        var showProductList = [];

        if (itens.length > 0) {
            itens.map((item, index) => {
                return (
                    showProductList.push(
                        <li key={index} className="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                                <h6 className="my-0">{item.product.name}</h6>
                            </div>
                            <span className="text-muted">{item.product.selling_price * item.quantity}</span>
                        </li>
                    )
                );
            });
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
                    <h6>Home / Cart / Checkout</h6>
                </div>
            </div>

            <div className="py-4">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-md-5 col-lg-4 order-md-last">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-primary">Your cart</span>
                                <span className="badge bg-primary rounded-pill">3</span>
                            </h4>
                            <ul className="list-group mb-3">

                                {showProductList}

                                <li className="list-group-item d-flex justify-content-between bg-light">
                                    <div className="text-success">
                                        <h6 className="my-0">Promo code</h6>
                                        <small></small>
                                    </div>
                                    <span className="text-success"></span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Freight</span>
                                    <strong></strong>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Total</span>
                                    <strong>{totalCart}</strong>
                                </li>
                            </ul>


                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Promo code" />
                                <button type="submit" className="btn btn-secondary">Submit</button>
                            </div>
                        </div>

                        <div className="col-md-7 col-lg-8">
                            <h4 className="mb-3">Billing address</h4>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="firstName" className="form-label">First name</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="" value="" required />
                                    <div className="invalid-feedback">
                                        Valid first name is required.
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="lastName" className="form-label">Last name</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="" value="" required />
                                    <div className="invalid-feedback">
                                        Valid last name is required.
                                    </div>
                                </div>

                                <div className="col-6">
                                    <label htmlFor="email" className="form-label">Email <span className="text-muted">(Optional)</span></label>
                                    <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                                    <div className="invalid-feedback">
                                        Please enter a valid email address for shipping updates.
                                    </div>
                                </div>

                                <div className="col-6">
                                    <label htmlFor="phone" className="form-label">Phone <span className="text-muted">(Optional)</span></label>
                                    <input type="text" className="form-control" id="phone" placeholder="61 99999-9999" />
                                    <div className="invalid-feedback">
                                        Please enter a valid phone for shipping updates.
                                    </div>
                                </div>

                                <div className="col-md-2">
                                    <label htmlFor="zip" className="form-label">Zip Code</label>
                                    <input type="text" className="form-control" id="zip" placeholder="" required />
                                    <div className="invalid-feedback">
                                        Zip code required.
                                    </div>
                                </div>

                                <div className="col-9">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div>

                                <div className="col-1">
                                    <label htmlFor="numbere" className="form-label">Number</label>
                                    <input type="text" className="form-control" id="number" required />
                                    <div className="invalid-feedback">
                                        Please enter your number address.
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <select className="form-select" id="city" required>
                                        <option value="">Choose...</option>
                                        <option>United States</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid city.
                                    </div>
                                </div>


                                <div className="col-md-4">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <select className="form-select" id="state" required>
                                        <option value="">Choose...</option>
                                        <option>California</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please provide a valid state.
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <select className="form-select" id="country" required>
                                        <option value="">Choose...</option>
                                        <option>United States</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid country.
                                    </div>
                                </div>


                            </div>

                            <hr className="my-4" />

                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="same-address" />
                                <label className="form-check-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
                            </div>

                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="save-info" />
                                <label className="form-check-label" htmlFor="save-info">Save this information for next time</label>
                            </div>

                            <hr className="my-4" />

                            <h4 className="mb-3">Payment</h4>

                            <div className="my-3">
                                <div className="form-check">
                                    <input id="credit" name="paymentMethod" type="radio" className="form-check-input" checked required />
                                    <label className="form-check-label" htmlFor="credit">Credit card</label>
                                </div>
                                <div className="form-check">
                                    <input id="debit" name="paymentMethod" type="radio" className="form-check-input" required />
                                    <label className="form-check-label" htmlFor="debit">Debit card</label>
                                </div>
                                <div className="form-check">
                                    <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required />
                                    <label className="form-check-label" htmlFor="paypal">PayPal</label>
                                </div>
                            </div>

                            <div className="row gy-3">
                                <div className="col-md-6">
                                    <label htmlFor="cc-name" className="form-label">Name on card</label>
                                    <input type="text" className="form-control" id="cc-name" placeholder="" required />
                                    <small className="text-muted">Full name as displayed on card</small>
                                    <div className="invalid-feedback">
                                        Name on card is required
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="cc-number" className="form-label">Credit card number</label>
                                    <input type="text" className="form-control" id="cc-number" placeholder="" required />
                                    <div className="invalid-feedback">
                                        Credit card number is required
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                                    <input type="text" className="form-control" id="cc-expiration" placeholder="" required />
                                    <div className="invalid-feedback">
                                        Expiration date required
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="cc-cvv" className="form-label">CVV</label>
                                    <input type="text" className="form-control" id="cc-cvv" placeholder="" required />
                                    <div className="invalid-feedback">
                                        Security code required
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Checkout;