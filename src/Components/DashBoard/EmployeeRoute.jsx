import { useContext } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Firebase/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useLocation } from 'react-router-dom';

const EmployeeRoute = ({children}) => {
    const axiosSecure = useAxiosSecure();
    const { user, loading  } = useContext(AuthContext);
    const location = useLocation();
    
    const { data: employee, isLoading: isEmployeeLoading } = useQuery({
        queryKey: ['employee', user?.email],
        enabled: !!user && !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data;
        },
    });

    if (loading || isEmployeeLoading) {
        return <progress className="progress w-56"></progress>;
    }

    if (user && employee && employee.length > 0 && employee[0].role === "Employee") {
        return children;
    }

    return (
        <Navigate state={{ from: location.pathname }} to='/login' />
    );
};

export default EmployeeRoute;