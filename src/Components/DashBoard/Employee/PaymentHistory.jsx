import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Firebase/AuthProvider";
import { useContext, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    // pagination 
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment?email=${user.email}`);
            return res.data;
        },
    });
    console.log(payments);

    // Sort payments by date in descending order (earliest first)
    const sortedPayments = payments.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

    // Calculate the index of the first and last items on the current page
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Get the items for the current page
    const currentPayments = sortedPayments.slice(startIndex, endIndex);

    // Function to format date to a readable month string
    const formatMonth = (dateString) => {
        const options = { year: 'numeric', month: 'long' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Calculate total pages
    const totalPages = Math.ceil(sortedPayments.length / itemsPerPage);

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
                        {currentPayments.map((payment, index) => (
                            <tr key={payment._id}>
                                <td>{startIndex + index + 1}</td>
                                <td>{formatMonth(payment.date)}</td>
                                <td>{payment.salary}</td>
                                <td>{payment._id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center my-8">
                <div className="join grid grid-cols-2 w-[150px] mt-4">
                    <button
                        className="join-item btn btn-outline"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 0}
                    >
                        Previous
                    </button>
                    <button
                        className="join-item btn btn-outline"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;
