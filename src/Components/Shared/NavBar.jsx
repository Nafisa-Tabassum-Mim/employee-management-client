import { useContext, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider";

const NavBar = () => {
    const [isLogoutVisible, setIsLogoutVisible] = useState(false);
    const { logOut, user } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const handleLogout = () => {

        logOut()
            .then(() => {
                navigate(location?.state ? location.state : '/')
            })
            .catch()
    }

    const handleHidden = () => {
        setIsLogoutVisible(!isLogoutVisible);
    }

    const links = <>
        <li className=" font-black text-xl "><NavLink to="/" >Contact us </NavLink></li>
        <li className="font-black text-xl "><NavLink to="/dashboard">Dashboard </NavLink></li>

    </>


    return (
        <div className="navbar bg-base-100 border-b-2 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <img src="https://i.ibb.co/t4JjB02/Mountain-logo-Design-Graphics-9785421-1-580x435.png" className="h-24 w-28 hidden md:block" alt="" />
                <a className="btn btn-ghost text-3xl">Probiz</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <>
                            <div onClick={handleHidden} tabIndex={0} role="button" data-tip={`${user.displayName}`} className="tooltip tooltip-bottom tooltip-bg-orange-500 z-50 btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
                                </div>
                            </div>
                            {isLogoutVisible &&
                                <button className="btn bg-black text-white" onClick={handleLogout}>
                                    Logout
                                </button>}
                        </>
                        :
                        <>
                            <Link to='/login'><button className="btn bg-black text-white mr-2">Login</button></Link>
                            <Link to='/register'><button className="btn bg-black text-white">Register</button></Link>
                        </>
                }


            </div>
        </div>
    );
};

export default NavBar;