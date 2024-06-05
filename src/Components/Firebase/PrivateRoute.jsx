import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthProvider";


const PrivateRoute = ({ children }) => {

    const { loading, user } = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
        return(
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-80 z-50">
            {loading && (
                <span className="loading loading-spinner loading-lg"></span>
            )}
        </div>)
    }
    if (user) {
        return children
    }
    return (
        <Navigate state={location.pathname} to='/login'>  </Navigate>
    );
};

export default PrivateRoute;