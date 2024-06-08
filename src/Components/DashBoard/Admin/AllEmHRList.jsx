import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { GrUserManager } from "react-icons/gr";
import { ImCross } from "react-icons/im";

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

    const handleMakeHR = i => {
        console.log(i)
        const hrInfo ={
            designation:'HR',
            role:'HR'
        }
        const res = axiosSecure.patch(`/users/:${i._id}`,hrInfo)
        // console.log(i._id)
    }


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
                                <td className="text-2xl">
                                    {/* Add logic for making HR */}
                                    {
                                        (i.role === 'HR') ?
                                            <button><GrUserManager /></button>
                                            :
                                            <button className="text-red-500" onClick={() => handleMakeHR(i)}><ImCross></ImCross> </button>
                                    }
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
