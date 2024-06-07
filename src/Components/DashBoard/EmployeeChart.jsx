import { useLoaderData } from "react-router-dom";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const EmployeeChart = () => {
    const { _id, name, photo, designation } = useLoaderData()

    const axiosPublic = useAxiosPublic()
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', _id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/payment/${_id}`);
            return res.data;
        },
    });

    const transformedPayments = payments.map(payment => {
        const { salary, date } = payment;
        const dateObj = new Date(date);
        const monthName = dateObj.toLocaleString('en-US', { month: 'long' });
        const year = dateObj.getFullYear();
        const monthYear = `${monthName}'s ${year}`;
        return { monthYear: monthYear, salary: salary };
    });

    return (
        <div>
            <h3 className="text-5xl text-center font-serif m-8">Employee details</h3>
            <div className="flex justify-center gap-8">
                <div className="">
                    <div className="avatar">
                        <div className="w-44 rounded">
                            <img src={photo} />
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-4xl">{name}</h3>
                    <p className="text-xl">{designation}</p>
                </div>
            </div>
            <p className="text-2xl text-center mt-8">{name}'s monthly salary :</p>
            <div className="flex justify-center mt-2">

                <BarChart
                    width={500}
                    height={300}
                    data={transformedPayments}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="monthYear" />
                    <YAxis />
                    <Tooltip shared={false} trigger="click" />
                    <Legend />
                    <Bar dataKey="salary" fill='black' />
                </BarChart>
            </div>
        </div>
    );
};

export default EmployeeChart;