import { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../Firebase/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useUser = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const { refetch, data: people = [] } = useQuery({
        queryKey: ['people', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`)
            return res.data
        }
    })
    return [people, refetch]
};

export default useUser;