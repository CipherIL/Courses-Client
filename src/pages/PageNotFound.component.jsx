import React from "react";

const PageNotFound = () => {
    return (
        <div className="page-main">
            <div className="page-not-found">
                <div className="page-not-found__text">
                    <div className="page-not-found__text__title">404</div>
                    <div className="page-not-found__text__subtitle">The page you are looking for does not exist</div>
                </div>
                <div className="page-not-found__gif-container">
                    <img src="7VE.gif" className="page-not-found__gif" alt="404"/>
                </div>
            </div>
            
        </div>
    )
};

export default PageNotFound;