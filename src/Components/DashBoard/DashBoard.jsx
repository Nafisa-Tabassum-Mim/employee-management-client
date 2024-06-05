import { FaAd, FaCalendar, FaEnvelope, FaHome, FaList, FaShoppingBag, FaShoppingCart, FaUser, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "../Firebase/AuthProvider";
import useUser from "../Hooks/useUser";
import EmployeeList from "./EmployeeList";

const DashBoard = () => {
    const [peopleArray] = useUser();
    if (!peopleArray || peopleArray.length === 0) {
        return <div>Loading...</div>;
    }
    const people = peopleArray[0];
    const { name, role } = people;

    console.log(people); // Log the 'people' object to the console

    return (
        <div >
            {/* dashboard side bar  */}
            {/* <div className="w-64 min-h-screen bg-black text-white"> */}
                {/* <ul className="menu p-4 text-xl uppercase"> */}
                    {(role === 'HR') &&
                        <>
                            <EmployeeList></EmployeeList>
                        </>
                    }
                    {/* //         <>
                    //             <li><NavLink to='/dashboard/userHome'><FaHome></FaHome>User Home</NavLink></li>
                    //             <li><NavLink to='/dashboard/reservation'><FaCalendar></FaCalendar>Reservation</NavLink></li>
                    //             <li><NavLink to='/dashboard/cart'><FaShoppingCart></FaShoppingCart>My Cart ({cart.length}) </NavLink></li>
                    //             <li><NavLink to='/dashboard/review'><FaAd></FaAd> Add a review </NavLink></li>
                    //             <li><NavLink to='/dashboard/bookings'><FaList></FaList>My Bookings</NavLink></li>
                    //         </>
                    //  */}

                    <div className="divider"></div>

                {/* </ul> */}
            {/* </div> */}
            {/* dashboard side bar  */}
     
            </div>
        // </div>
    );
};

export default DashBoard;