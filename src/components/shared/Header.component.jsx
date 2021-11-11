import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <div className="page-header">
            <div className="page-header__content">
                <div className="page-header__logo-container">
                    <Link to="/"><span className="page-header__logo">Coursim</span></Link>
                </div>
                <div className="page-header__navbar-container">

                </div>
            </div>
        </div>
    )
};

export default Header;