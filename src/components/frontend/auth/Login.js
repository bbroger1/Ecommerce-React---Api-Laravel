import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";
import swal from 'sweetalert';

import Navbar from "../../../layouts/frontend/Navbar";

function Login() {

    const history = useHistory();
    const [loginInput, setLoginInput] = useState({
        email: '',
        password: '',
        errorList: []
    });

    const handleInput = (e) => {
        e.persist();
        setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
    };

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/login', data)
                .then(res => {
                    if (res.data.status === 200) {
                        localStorage.setItem('auth_token', res.data.token);
                        localStorage.setItem('auth_name', res.data.username);
                        swal("Success: ", res.data.message, "success");
                        if (res.data.role === 'admin') {
                            history.push('/admin/dashboard');
                        } else {
                            history.push('/');
                        }

                    } else if (res.data.status === 401) {
                        swal("Warning: ", res.data.message, "warning");
                    } else {
                        setLoginInput({ ...loginInput, errorList: res.data.validation_errors })
                    }
                })
        })
    }

    return (
        <div>
            <Navbar />
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                        <div className="card-body">
                                            <form onSubmit={loginSubmit}>
                                                <div className="form-floating mb-3">
                                                    <input onChange={handleInput} value={loginInput.email} className="form-control" name="email" id="inputEmail" type="email" placeholder="name@example.com" />
                                                    <label htmlFor="inputEmail">Email address</label>
                                                    <span className="text-danger">{loginInput.errorList.email}</span>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input onChange={handleInput} value={loginInput.password} className="form-control" name="password" id="inputPassword" type="password" placeholder="Password" />
                                                    <label htmlFor="inputPassword">Password</label>
                                                    <span className="text-danger">{loginInput.errorList.password}</span>
                                                </div>
                                                <div className="form-check mb-3">
                                                    <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                                    <label className="form-check-label" htmlFor="inputRememberPassword">Remember Password</label>

                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                    <Link className="small" to="#">Forgot Password?</Link>
                                                    <button type="submit" className="btn btn-primary" to="/login">Login</button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center py-3">
                                            <div className="small"><Link to="/register">Need an account? Sign up!</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div id="layoutAuthentication_footer">
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">Copyright &copy; Your Website 2021</div>
                                <div>
                                    <Link to="#">Privacy Policy</Link>
                                    &middot;
                                    <Link to="#">Terms &amp; Conditions</Link>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default Login;