import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const WorkProgress = () => {
    const axiosSecure = useAxiosSecure()

    const { data: works = [] } = useQuery({
        queryKey: ['works'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/works`);
            return res.data;
        },
    });

    const employeeNames = Array.from(new Set(works.map(work => work.name)));
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [selectedName, setSelectedName] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    const filteredWorks = works.filter(work => {
        if (selectedName && selectedMonth) {
            return work.name === selectedName && new Date(work.date).toLocaleString('en-US', { month: 'long' }) === selectedMonth;
        } else if (selectedName) {
            return work.name === selectedName;
        } else if (selectedMonth) {
            return new Date(work.date).toLocaleString('en-US', { month: 'long' }) === selectedMonth;
        } else {
            return true;
        }
    });

    const handleNameChange = (e) => {
        setSelectedName(e.target.value);
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    return (
        <div>
            <h3 className="text-4xl text-center text-white m-12">
                <span className="bg-gray-700 px-2 rounded-xl font-mono">Track employee Work progress</span>
            </h3>
            <div className='flex justify-between gap-8 my-8 border-gray-700 border-2 rounded-lg py-2 px-4'>
                <h3 className=' md:text-3xl '>Employee Task</h3>
              <div className='flex gap-6'>
              <select className="select select-bordered w-full max-w-xs" onChange={handleNameChange} value={selectedName}>
                    <option value="">Search by Name</option>
                    {employeeNames.map((name, index) => (
                        <option key={index} value={name}>{name}</option>
                    ))}
                </select>
                <select className="select select-bordered w-full max-w-xs" onChange={handleMonthChange} value={selectedMonth}>
                    <option value="">Search by month</option>
                    {months.map((month, index) => (
                        <option key={index} value={month}>{month}</option>
                    ))}
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full text-xl">
                    <thead>
                        <tr className="text-xl bg-gray-700 text-white">
                            <th></th>
                            <th>Name</th>
                            <th>Month</th>
                            <th>Task</th>
                            <th>Working-Hour</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredWorks.map((work, index) => {
                            const date = new Date(work.date);
                            const month = date.toLocaleString('en-US', { month: 'long' });
                            return (
                                <tr key={work._id}>
                                    <td>{index + 1}</td>
                                    <td>{work.name}</td>
                                    <td>{month}</td>
                                    <td>{work.task}</td>
                                    <td>worked for {work.work}-Hour</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WorkProgress;
