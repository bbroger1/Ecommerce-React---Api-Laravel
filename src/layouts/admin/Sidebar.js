import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Admin</div>
                    <Link className="nav-link" to="/admin/dashboard">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </Link>

                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse"
                        data-bs-target="#collapseProducts" aria-expanded="false" aria-controls="collapseProducts">
                        <div className="sb-nav-link-icon"><i className="fas fa-archive"></i></div>
                        Products
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseProducts" aria-labelledby="headingOne"
                        data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="/admin/product">
                                <div className="sb-nav-link-icon"><i className="fas fa-archive"></i></div>
                                List Product
                            </Link>
                            <Link className="nav-link" to="/admin/add-product">
                                <div className="sb-nav-link-icon"><i className="fas fa-archive"></i></div>
                                Add Product
                            </Link>
                        </nav>
                    </div>

                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse"
                        data-bs-target="#collapseCategory" aria-expanded="false" aria-controls="collapseCategory">
                        <div className="sb-nav-link-icon"><i className="fab fa-buffer"></i></div>
                        Category
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseCategory" aria-labelledby="headingOne"
                        data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="/admin/category">
                                <div className="sb-nav-link-icon"><i className="fab fa-buffer"></i></div>
                                List Category
                            </Link>

                            <Link className="nav-link" to="/admin/add-category">
                                <div className="sb-nav-link-icon"><i className="fab fa-buffer"></i></div>
                                Add Category
                            </Link>
                        </nav>
                    </div>

                    <Link className="nav-link" to="/admin/profile">
                        <div className="sb-nav-link-icon"><i className="fas fa-user"></i></div>
                        Profile
                    </Link>


                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                Start Bootstrap
            </div>
        </nav >
    )

}

export default Sidebar;