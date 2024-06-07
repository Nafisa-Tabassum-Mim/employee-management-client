import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Firebase/AuthProvider";
import { useContext } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment?email=${user.email}`);
            return res.data;
        },
    });
    console.log(payments);
    const sortedPayments = payments.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    const formatMonth = (dateString) => {
        const options = { year: 'numeric', month: 'long' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    return (
        <div>
            <h3 className="text-4xl text-center text-white m-12">
                <span className="bg-gray-700 px-2 rounded-xl font-mono">Payment history</span>
            </h3>
            <div className="overflow-x-auto">
                <table className="table w-full text-xl">
                    <thead>
                        <tr className="text-xl">
                            <th></th>
                            <th>Month</th>
                            <th>Amount</th>
                            <th>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedPayments.map((payment, index) => (
                            <tr key={payment._id}>
                                <td>{index + 1}</td>
                                <td>{formatMonth(payment.date)}</td>
                                <td>{payment.salary}</td>
                                <td>{payment._id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
