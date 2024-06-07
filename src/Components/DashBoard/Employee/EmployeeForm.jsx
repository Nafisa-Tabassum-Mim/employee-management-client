import { useContext, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../Firebase/AuthProvider";

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

        const workItem = { task, work, date, email };
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
                }
            });
    };

    return (
        <div>
            <h3 className="text-4xl text-center text-white m-12">
                <span className="bg-gray-700 px-2 rounded-xl font-mono">Employee Work Sheet</span>
            </h3>
            <form onSubmit={handleWorkRequest} ref={formRef}> {/* Attach the ref to the form */}
                {/* form row */}
                <div className="mb-8 gap-2">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-lg text-black">Tasks</span>
                        </label>
                        <label className="input-group">
                            <select name="task" className="select select-bordered w-full">
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
                        <label className="label">
                            <span className="label-text font-medium text-lg text-black">Worked</span>
                        </label>
                        <label className="input-group">
                            <input type="number" name="work" placeholder="Hours Worked" className="input input-bordered w-full" required />
                        </label>
                    </div>
                </div>
                {/* form row */}
                <div className="mb-8 gap-2">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-lg text-black">Date</span>
                        </label>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} name="date" className="input input-bordered w-full" required />
                    </div>
                </div>
                <input type="submit" value="Submit" className="btn btn-block bg-black font-medium text-lg text-white" />
            </form>
        </div>
    );
};

export default EmployeeForm;
