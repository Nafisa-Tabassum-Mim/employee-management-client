import { useContext, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const NavBar = () => {
    const axiosSecure = useAxiosSecure()
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

    const { data: people = [] } = useQuery({
        queryKey: ['people', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`)
            return res.data
        }
    })
    // console.log(people)
    let role = '';
    if (people.length > 0) {
        role = people[0].role;
    }

    const links = <>
        <li className="  text-xl "><NavLink to="/" >Home </NavLink></li>
        <li className="  text-xl "><NavLink to="/contact-us" >Contact us </NavLink></li>

        {role === 'Admin' && (
            <li className=" text-xl "> <NavLink to='/dashboard/all-employee-list'>Dashboard</NavLink></li>

        )}

        {role === 'Employee' && (
            <li className=" text-xl "><NavLink to='/dashboard/work-sheet'>Dashboard</NavLink></li>
        )}

        {role === 'HR' && (
            <li className=" text-xl "><NavLink to='/dashboard/employee-list'>Dashboard</NavLink></li>
        )}

    </>


    return (
        <div className="navbar fixed z-10 bg-black text-white bg-opacity-25 ">

            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <img src="https://i.ibb.co/MZtTggk/logo-design-good-designer.jpg" className="h-8 w-12 hidden md:block rounded-full" alt="" />
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