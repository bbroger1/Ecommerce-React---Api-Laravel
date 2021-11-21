import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import api from "../../../services/auth/RegisterService";
import Navbar from "../../../layouts/frontend/Navbar";

function Register() {

    const [registerInput, setRegisterInput] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });
    const [errorRegister, setErrorRegister] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
    };

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            passwordConfirm: registerInput.passwordConfirm,
        }

        const response = api.store(data);

        if (response.status === true) {
            console.log(response);
        } else {
            setErrorRegister(response);
        }
    }

    return (
        <div>
            <Navbar />
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-7">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                                        <div className="card-body">
                                            <form onSubmit={registerSubmit}>
                                                <div className="row mb-3">
                                                    <div className="col-md-12">
                                                        <div className="form-floating mb-3 mb-md-0">
                                                            <input onChange={handleInput} value={registerInput.name} className="form-control" name="name" id="name" type="text" placeholder="Enter your first name" />
                                                            <label htmlFor="name">Name</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input onChange={handleInput} value={registerInput.email} className="form-control" name="email" id="email" type="email" placeholder="name@example.com" />
                                                    <label htmlFor="email">Email address</label>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <div className="form-floating mb-3 mb-md-0">
                                                            <input onChange={handleInput} value={registerInput.password} className="form-control" name="password" id="password" type="password" placeholder="Create a password" />
                                                            <label htmlFor="password">Password</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-floating mb-3 mb-md-0">
                                                            <input onChange={handleInput} value={registerInput.passwordConfirm} className="form-control" name="passwordConfirm" id="passwordConfirm" type="password" placeholder="Confirm password" />
                                                            <label htmlFor="password_confirm">Confirm Password</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-4 mb-0">
                                                    <div className="d-grid">
                                                        <button type="submit" className="btn btn-primary btn-block">
                                                            Create Account
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center py-3">
                                            <div className="small"><Link to="/login">Have an account? Go to login</Link></div>
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
            </div >
        </div >
    )
}

export default Register;