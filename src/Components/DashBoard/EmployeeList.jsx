import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import EmployeeTable from "./EmployeeTable";
import { ToastContainer, toast } from "react-toastify";

const EmployeeList = () => {

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users?role=${'Employee'}`)
            return res.data
        }
    })

    const handleVerification = async (id,name) => {
        Swal.fire({
            title: `Are you sure about verifying ${name} for the employee post?`,
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
                        title: "Verified!",
                        text: `${name} is now verified as a employee !`,
                        icon: "success"
                    });
                    refetch()
                }
            }
        });
    }
    const handlePay = async (e, id, salary, startDate,email) => {
        e.preventDefault();
        const paymentInfo = {
            salary: salary,
            date: startDate,
            payId: id,
            email:email
        };
        const res = await axiosSecure.post(`/payment`, paymentInfo);
        // console.log(res);
        if (res.data.insertedId) {
            toast('Payment is done !')
        }
    };


    return (
        <div>
            <h3 className="text-4xl text-center text-white m-12">
                <span className="bg-gray-700 px-2 rounded-xl font-mono">Human Resource Executive</span>
            </h3>
            <div className="flex justify-center my-4">
                <h2 className="text-3xl">Total Employee ({users.length}) </h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table  w-full text-xl">
                    {/* head */}
                    <thead>
                        <tr className="text-xl bg-gray-700 text-white">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Verified </th>
                            <th>Bank Account</th>
                            <th> Salary</th>
                            <th> Pay</th>
                            <th> Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row all */}
                        {
                            users?.map((user) =>
                                <EmployeeTable
                                    key={user._id}
                                    user={user}
                                    handleVerification={handleVerification}
                                    handlePay={handlePay}
                                ></EmployeeTable>
                            )
                        }

                    </tbody>
                </table>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default EmployeeList;