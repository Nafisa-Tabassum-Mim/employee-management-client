import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../Firebase/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

const useUser = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const { refetch, data: people = [], isLoading } = useQuery({
        queryKey: ['people', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`)
            return res.data
        }
    })
    return [people, refetch, isLoading]
};

export default useUser;