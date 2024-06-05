import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ImCross } from 'react-icons/im';
import { TiTick } from 'react-icons/ti';
import { Link } from 'react-router-dom';

const EmployeeTable = ({ user, handleVerification, handlePay }) => {
    const { _id, name, email, account, salary, isVerified } = user;
    const [startDate, setStartDate] = useState(new Date());

    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td className="text-green-600">
                <button onClick={() => handleVerification(_id)} className="btn btn-ghost">
                    {isVerified === 'verified' ? <TiTick className="text-green-600 text-2xl font-bold" /> : <ImCross className="text-red-600 text-2xl font-bold" />}
                </button>
            </td>
            <td>{account}</td>
            <td>{salary}</td>
            <td>
                {isVerified === 'verified' ? (
                    <>
                        <button className="btn bg-green-600 text-white" onClick={() => document.getElementById(`modal_${_id}`).showModal()}>Pay</button>
                        <dialog id={`modal_${_id}`} className="modal">
                            <div className="modal-box">
                                <div className="p-2">
                                    <h2 className="text-xl font-bold my-4">Pay {name}'s Salary</h2>
                                    <form onSubmit={(e) => handlePay(e, _id,salary,startDate)}>
                                        <div className="mb-8 gap-2">
                                            <div className="form-control w-full">
                                                <label className="label">
                                                    <span className="label-text font-medium text-lg text-black">Salary</span>
                                                </label>
                                                <label className="input-group">
                                                    <input type="text" name="salary" defaultValue={salary} placeholder="salary" className="input input-bordered w-full" />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="mb-8 gap-2">
                                            <div className="form-control w-full">
                                                <label className="label">
                                                    <span className="label-text font-medium text-lg text-black">Date</span>
                                                </label>
                                                <label className="input-group">
                                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} name="date" className="input input-bordered w-full" required />
                                                </label>
                                            </div>
                                        </div>
                                        <input type="submit" value="Pay" className="btn btn-block bg-black font-medium text-lg text-white" />
                                    </form>
                                </div>
                                <form method="dialog">
                                    <button className="btn border-black font-medium border-2 text-lg text-black w-full">Cancel</button>
                                </form>
                            </div>
                        </dialog>
                    </>
                ) : (
                    <button disabled className="btn bg-green-600 text-white">Pay</button>
                )}
            </td>
            <td>
                <Link to={`/employee-details/${_id}`}><button className="btn text-green-600">Details</button></Link>
            </td>
        </tr>
    );
};

export default EmployeeTable;
