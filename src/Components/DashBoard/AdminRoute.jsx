import { useContext } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Firebase/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    
    const { data: admin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['admin', user?.email],
        enabled: !!user && !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data;
        },
    });

    if (loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>;
    }

    if (user && admin && admin.length > 0 && admin[0].role === "Admin") {
        return children;
    }

    return (
        <Navigate state={{ from: location.pathname }} to='/login' />
    );
};

export default AdminRoute;
