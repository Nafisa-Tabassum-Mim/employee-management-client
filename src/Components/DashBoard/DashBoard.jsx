import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider";
import useUser from "../Hooks/useUser";
import EmployeeForm from "./Employee/EmployeeForm";
import { RiContactsLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useContext } from "react";
import { MdOutlineAttachMoney } from "react-icons/md";

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
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-gray-400 text-white">
                <ul className="menu p-4 text-lg uppercase">
                    {role === 'HR' && (
                        <>
                        <li> <NavLink to='/dashboard/employee-list'><RiContactsLine />Employee List</NavLink></li>
                        </>
                    )}
                    {role === 'Employee' && (
                       <>
                        <li> <NavLink to='/dashboard/work-sheet'><RiContactsLine />Work sheet </NavLink></li>
                        <li> <NavLink to='/dashboard/payment-history'><MdOutlineAttachMoney />Payment History </NavLink></li>
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
            {/* dashboard side bar */}
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default DashBoard;
