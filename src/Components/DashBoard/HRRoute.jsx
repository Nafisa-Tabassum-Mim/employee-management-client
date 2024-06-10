import { useContext } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Firebase/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useLocation } from 'react-router-dom';


const HRRoute = ({children}) => {
    const axiosSecure = useAxiosSecure();
    const { user, loading  } = useContext(AuthContext);
    const location = useLocation();
    
    const { data: hr, isLoading: isHrLoading } = useQuery({
        queryKey: ['hr', user?.email],
        enabled: !!user && !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data;
        },
    });

    if (loading || isHrLoading) {
        return <progress className="progress w-56"></progress>;
    }

    if (user && hr && hr.length > 0 && hr[0].role === "HR") {
        return children;
    }

    return (
        <Navigate state={{ from: location.pathname }} to='/login' />

    );
};

export default HRRoute;