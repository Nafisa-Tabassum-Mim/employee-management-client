import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { GrUserManager } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import { useState } from "react";

const AllEmHRList = () => {
    const axiosSecure = useAxiosSecure();
    const [newSalary, setNewSalary] = useState(0);


    const { data: users = [], refetch } = useQuery({
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
    // console.log(userFilter);

    const handleMakeHR = (name, id) => {
        Swal.fire({
            title: `Are you sure about appointing ${name} as the HR?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "green",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/${id}`)
                // console.log(res)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Promoted!",
                        text: `${name} position is updated from employee to HR!`,
                        icon: "success"
                    });
                    refetch()
                }
            }
        });
    }

    const handleFire = (name, id, role) => {
        Swal.fire({
            title: `Are you sure about firing ${name}?`,
            text: "Are you sure about removing this person from your office!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "green",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/fire/${id}`)
                // console.log(res)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Fired!",
                        text: `${name} is fired from ${role}!`,
                        icon: "success"
                    });
                    refetch()
                }
            }
        });
    }


    // Function to handle updating the salary
    const updateSalary = async (id, newSalary) => {
        const res = await axiosSecure.patch(`/users/salary/${id}`, { salary: newSalary })
        // console.log(res)
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Salary has been updated",
                showConfirmButton: false,
                timer: 1000
            });
            refetch()
        }
    };


    return (
        <div>
            <h3 className="text-3xl text-center text-white m-12">
                <span className="bg-gray-700 px-2 rounded-xl font-mono">Admin</span>
            </h3>
            <div className="overflow-x-auto">
                <table className="table w-full text-xl">
                    <thead>
                        <tr className="text-xl bg-gray-700 text-white">
                            <th></th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Make HR</th>
                            <th>Fire</th>
                            <th>Salary</th>
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
                                            <button className="text-red-500" onClick={() => handleMakeHR(i.name, i._id)}><ImCross></ImCross> </button>
                                    }
                                </td>
                                <td>
                                    {/* Add logic for firing */}
                                    {
                                        (i.isFired === 'Fired') ?
                                            <button className="text-red-500" >Fired</button>
                                            :
                                            <button className="text-green-500" onClick={() => handleFire(i.name, i._id, i.role)}>Fire </button>
                                    }
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        onChange={(e) => setNewSalary(e.target.value)} // Update newSalary state when input value changes
                                        placeholder="salary"
                                        name="salary"
                                        defaultValue={i.salary}
                                        className="w-[100px] input input-bordered"
                                    />
                                    <button onClick={() => updateSalary(i._id, newSalary)} className="ml-2 bg-green-500 btn text-white">
                                        update salary
                                    </button>
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
