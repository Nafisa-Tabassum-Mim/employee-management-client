import { useContext, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../Firebase/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const EmployeeForm = () => {
    const [startDate, setStartDate] = useState(new Date());
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const formRef = useRef(null); // Create a ref for the form

    const handleWorkRequest = event => {
        event.preventDefault();

        const form = event.target;

        const task = form.task.value;
        const work = Number(form.work.value);
        const date = form.date.value;
        const email = user.email;
        const name = user.displayName

        const workItem = { task, work, date, email, name };
        console.log(workItem);

        // send data to the server
        axiosSecure.post('/works', workItem)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `your work is done!`,
                        showConfirmButton: false,
                        timer: 1000
                    });

                    // Reset the form and date picker
                    formRef.current.reset();
                    setStartDate(new Date());
                    refetch()
                }
            });
    };

    


    // table 
    const { data: works = [], refetch } = useQuery({
        queryKey: ['works'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/works?email=${user.email}`);
            return res.data;
        },
    });

    const sortedWorks = works.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div>
            <h3 className="text-3xl text-center text-white m-12">
                <span className="bg-gray-700 px-2 rounded-xl font-mono">Work Sheet of {user.displayName}</span>
            </h3>
            <form onSubmit={handleWorkRequest} ref={formRef} className="flex justify-center gap-6"> {/* Attach the ref to the form */}
                {/* form row */}
                <div className="mb-8 gap-2">
                    <div className="form-control">
                        <label className="input-group">
                            <select name="task" className="select select-bordered w-full max-w-xs">
                                <option >Sales</option>
                                <option>Support</option>
                                <option>Content</option>
                                <option>Paper-Work</option>
                            </select>
                        </label>
                    </div>
                </div>
                {/* form row */}
                <div className="mb-8 gap-2">
                    <div className="form-control">
                        <label className="input-group">
                            <input type="number" name="work" placeholder="Hours Worked" className="input input-bordered w-full max-w-xs" required />
                        </label>
                    </div>
                </div>
                {/* form row */}
                <div className="mb-8 gap-2">
                    <div className="form-control">
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} name="date" className="input input-bordered w-full max-w-xs" required />
                    </div>
                </div>
                <input type="submit" value="Submit" className="btn  bg-gray-700 font-medium text-lg text-white " />
            </form>


            {/* table  */}

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
                        {sortedWorks.map((work, index) => {
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

export default EmployeeForm;
