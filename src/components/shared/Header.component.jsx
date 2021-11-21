import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/User.context";
import { userLogout } from "../../server/general.request";

const Header = () => {

    const {isLoggedIn, setIsLoggedIn, isProfessor, setIsProfessor,setIsFirstLogin} = useContext(UserContext);

    const logout = () => {
        userLogout()
        .then(res=>{
            setIsLoggedIn(false);
            setIsProfessor(false);
            setIsFirstLogin(undefined);
        })
        .catch(err=>{
            console.log(err)
        })
    };

    const toggleHamburgerMenu = (e) => {
        e.target.classList.toggle('selected');
        e.target.nextSibling.classList.toggle('show')
    }
    
    return (
        <div className="page-header">
            <div className="page-header__content">
                <div className="page-header__logo-container">
                    <Link to="/"><span className="page-header__logo">Coursim</span></Link>
                </div>
                {isLoggedIn && 
                <div className="page-header__hamburger-menu__icon" onClick={toggleHamburgerMenu}>
                    <div className="page-header__hamburger-menu__icon__line top"></div>
                    <div className="page-header__hamburger-menu__icon__line middle"></div>
                    <div className="page-header__hamburger-menu__icon__line bottom"></div>
                </div>}
                
                <div className="page-header__navbar-container">
                    {isLoggedIn && <div className="page-header__navbar__item border-bottom" onClick={logout}>Log out</div>}
                    {isProfessor && <Link to="/add-course"><div className="page-header__navbar__item">Add Courses</div></Link>}
                    {isProfessor && <Link to="/add-student"><div className="page-header__navbar__item">Add Students</div></Link>}
                </div>
            </div>
        </div>
    )
};

export default Header;