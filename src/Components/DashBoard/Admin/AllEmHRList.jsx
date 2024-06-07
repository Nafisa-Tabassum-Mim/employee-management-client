import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllEmHRList = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        },
    });

    const userFilter = users.filter(i => 
        (i.isVerified === 'verified' && i.role === 'Employee') || 
        (i.role === 'HR') &&
        (i.role !== 'Admin')
    );
    console.log(userFilter);

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full text-xl">
                    <thead>
                        <tr className="text-xl bg-gray-700 text-white">
                            <th></th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Make HR</th>
                            <th>Fire</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userFilter.map((i, index) => (
                            <tr key={i._id}>
                                <td>{index + 1}</td>
                                <td>{i.name}</td>
                                <td>{i.designation}</td>
                                <td>
                                    {/* Add logic for making HR */}
                                    <button>Make HR</button>
                                </td>
                                <td>
                                    {/* Add logic for firing */}
                                    <button>Fire</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllEmHRList;
