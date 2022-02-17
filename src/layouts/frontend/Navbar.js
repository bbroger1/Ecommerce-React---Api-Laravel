import React from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router";
import "./StyleNavbar.css";

function Navbar() {

    const history = useHistory();

    var authButtons = '';

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/logout')
                .then(res => {
                    if (res.data.status === 200) {
                        localStorage.removeItem('auth_token');
                        localStorage.removeItem('auth_name');
                        swal("Success: ", res.data.message, "success");
                        history.push('/');
                    }
                })
        })
    }

    if (!localStorage.getItem('auth_token')) {
        authButtons = (
            <>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            </>
        )
    } else {
        authButtons = (
            <>
                <li className="nav-item">
                    <button onClick={logoutSubmit} type="button" className="nav-link btn btn-sm btn-light text-black">Logout</button>
                </li>
            </>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/">Logo</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/' activeClassName="active" >
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to='/about' activeClassName="active" >
                                About
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to='/contact' activeClassName="active" >
                                Contact
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to='/collection' activeClassName="active" >
                                Collection
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to='/cart' activeClassName="active" >
                                Cart
                            </NavLink>
                        </li>

                        {authButtons}
                    </ul>
                </div>
            </div>
        </nav >
    )
}

export default Navbar;