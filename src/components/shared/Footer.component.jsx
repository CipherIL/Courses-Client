import React from "react";

const Footer = () => {
    return (
        <div className="page-footer">
            <div className="page-footer__content">
                <span className="page-footer__rights">Developed by Itay Leybovich</span>
                <div className="page-footer__links">
                    <a href="https://github.com/itayleybovich" className="page-footer__link" target="_blank" rel="noreferrer">Contact Me</a>
                    <div className="seperator"></div>
                    <a href="https://github.com/itayleybovich" className="page-footer__link" target="_blank" rel="noreferrer">About Me</a>
                </div>
            </div>
        </div>
    )
};

export default Footer;