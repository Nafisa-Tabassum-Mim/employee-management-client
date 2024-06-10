import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider";
import useUser from "../Hooks/useUser";
import EmployeeForm from "./Employee/EmployeeForm";
import { RiContactsLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useContext } from "react";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";

const DashBoard = () => {
    const [peopleArray] = useUser();
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!peopleArray || peopleArray.length === 0) {
        return <div>Loading...</div>;
    }

    const people = peopleArray[0];
    const { name, role } = people;

    // console.log(people); // Log the 'people' object to the console

    const handleLogout = () => {
        logOut()
            .then(() => {
                navigate(location?.state ? location.state : '/');
            })
            .catch();
    };

    return (
        <div className="lg:flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen hidden lg:flex bg-gray-400 text-white">

                <ul className="menu p-4 text-lg uppercase">
                    {role === 'HR' && (
                        <>
                            <li> <NavLink to='/dashboard/employee-list'><RiContactsLine />Employee List</NavLink></li>
                            <li> <NavLink to='/dashboard/progress'><FaRegFileAlt />Work Progress</NavLink></li>
                        </>
                    )}
                    {role === 'Employee' && (
                        <>
                            <li> <NavLink to='/dashboard/work-sheet'><RiContactsLine />Work sheet </NavLink></li>
                            <li> <NavLink to='/dashboard/payment-history'><MdOutlineAttachMoney />Payment History </NavLink></li>
                        </>
                    )}
                    {role === 'Admin' && (
                        <>
                            <li> <NavLink to='/dashboard/all-employee-list'><RiContactsLine />All Employee List</NavLink></li>
                            <li> <NavLink to='/dashboard/message'><TiMessages />Messages</NavLink></li>
                        </>
                    )}


                    <div className="divider"></div>
                    <li><NavLink to='/'><IoHomeOutline />Home</NavLink></li>
                    <li><NavLink to='/'><FaArrowRightFromBracket />
                        <button className="flex justify-start" onClick={handleLogout}>
                            Logout
                        </button></NavLink></li>
                </ul>




            </div>
            {/* lg icon  */}
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow text-black rounded-box w-52">
                    {/* {links} */}
                    <ul className="menu p-4 text-lg uppercase">
                        {role === 'HR' && (
                            <>
                                <li> <NavLink to='/dashboard/employee-list'><RiContactsLine />Employee List</NavLink></li>
                                <li> <NavLink to='/dashboard/progress'><FaRegFileAlt />Work Progress</NavLink></li>
                            </>
                        )}
                        {role === 'Employee' && (
                            <>
                                <li> <NavLink to='/dashboard/work-sheet'><RiContactsLine />Work sheet </NavLink></li>
                                <li> <NavLink to='/dashboard/payment-history'><MdOutlineAttachMoney />Payment History </NavLink></li>
                            </>
                        )}
                        {role === 'Admin' && (
                            <>
                                <li> <NavLink to='/dashboard/all-employee-list'><RiContactsLine />All Employee List</NavLink></li>
                                <li> <NavLink to='/dashboard/message'><TiMessages />Messages</NavLink></li>
                            </>
                        )}


                        <div className="divider"></div>
                        <li><NavLink to='/'><IoHomeOutline />Home</NavLink></li>
                        <li><NavLink to='/'><FaArrowRightFromBracket />
                            <button className="flex justify-start" onClick={handleLogout}>
                                Logout
                            </button></NavLink></li>
                    </ul>

                </ul>
            </div>
            {/* dashboard side bar */}
            <div className="flex-1 lg:p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default DashBoard;
