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
    console.log(users)

    const handleVerification = async (id) => {
        const res = await axiosSecure.patch(`/users/${id}`);
        console.log(res);
        refetch();
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                title: "Good news!",
                text: `employee is now verified!`,
                icon: "success"
            });
        }
    }
    const handlePay = async (e, id, salary, startDate) => {
        e.preventDefault();
        const paymentInfo = {
            salary: salary,
            date: startDate,
            payId: id
        };
        const res = await axiosSecure.post(`/payment`, paymentInfo);
        console.log(res);
        if (res.data.insertedId) {
            toast('Payment is done !')
        }
    };


    return (
        <div>
            <div className="flex justify-center my-4">
                <h2 className="text-3xl">Total Employee ({users.length}) </h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-xl">
                    {/* head */}
                    <thead>
                        <tr className="text-xl">
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