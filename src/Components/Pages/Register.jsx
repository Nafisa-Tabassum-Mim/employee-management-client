import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

// import { Helmet } from "react-helmet";

const Register = () => {

    const { createUser, setLoading, updateUserId } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const [showPass, setshowPass] = useState(false)
    const axiosPublic = useAxiosPublic()

    const handleRegister = async (e) => {
        e.preventDefault();


        // image upload to imbb 
        const imageFile = { image: e.target.photo.files[0] }
        // console.log(imageFile)
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        // console.log(res)
        if (res.data.success) {
            const name = e.target.name.value
            // const photo = e.target.photo.value
            const photo = res.data.data.display_url
            const email = e.target.email.value
            const role = e.target.role.value
            const account = e.target.account.value
            const salary = e.target.salary.value
            const designation = e.target.designation.value
            const password = e.target.password.value


            // check HR 
            if (role === 'HR') {
                if (designation !== 'HR') {
                    toast.warning('Designation must be HR for HR role!');
                    return;
                }
            }
            if (role === 'Employee') {
                if (designation === 'HR') {
                    toast.warning('Employee role cannot be assign for HR!');
                    return;
                }
            }

            // check pass 
            if (password.length < 6) {
                toast.warning('Password must be 6 character long !')
                return
            }
            else if (!/[A-Z]/.test(password)) {
                toast.warning('Password should have at least one uppercase !')
                return
            }
            else if (!/[^a-zA-Z0-9]/.test(password)) {
                toast.warning('Password should have at least one special character!');
                return;
            }


            // create user 
            createUser(email, password)
                .then((result) => {
                    toast.success('Your id is created successfully')
                    updateUserId(name, photo)
                        .then(() => {
                            // for every new user create a new db user 
                            const newUserInfo = {
                                name: name,
                                photo: photo,
                                email: email,
                                role: role,
                                account: Number(account),
                                salary: Number(salary),
                                designation: designation,
                            }
                            axiosPublic.post('/users', newUserInfo)
                                .then((res) => {
                                    // console.log(res)
                                    if (res.data.insertedId) {
                                        // reset()
                                        navigate(location?.state ? location.state : '/')
                                    }
                                })
                        })

                })
                .catch((error) => {
                    setLoading(false)
                    toast.error(error.code)
                })
        }


        // // check HR 
        // if (role === 'HR') {
        //     if (designation !== 'HR') {
        //         toast.warning('Designation must be HR for HR role!');
        //         return;
        //     }
        // }
        // if (role === 'Employee') {
        //     if (designation === 'HR') {
        //         toast.warning('Employee role cannot be assign for HR!');
        //         return;
        //     }
        // }

        // // check pass 
        // if (password.length < 6) {
        //     toast.warning('Password must be 6 character long !')
        //     return
        // }
        // else if (!/[A-Z]/.test(password)) {
        //     toast.warning('Password should have at least one uppercase !')
        //     return
        // }
        // else if (!/[^a-zA-Z0-9]/.test(password)) {
        //     toast.warning('Password should have at least one special character!');
        //     return;
        // }


        // // create user 
        // createUser(email, password)
        //     .then((result) => {
        //         toast.success('Your id is created successfully')
        //         updateUserId(name, photo)
        //             .then(() => {
        //                 // for every new user create a new db user 
        //                 const newUserInfo = {
        //                     name: name,
        //                     photo: photo,
        //                     email: email,
        //                     role: role,
        //                     account: Number(account),
        //                     salary: Number(salary),
        //                     designation: designation,
        //                 }
        //                 axiosPublic.post('/users', newUserInfo)
        //                     .then((res) => {
        //                         console.log(res)
        //                         if (res.data.insertedId) {
        //                             // reset()
        //                             navigate(location?.state ? location.state : '/')
        //                         }
        //                     })
        //             })

        //     })
        //     .catch((error) => {
        //         setLoading(false)
        //         toast.error(error.code)
        //     })
    }

    return (

        <div className='flex justify-center items-center pt-12' >
            {/* <Helmet>
                <title>Register</title>
            </Helmet> */}

            <div className='md:w-2/3 bg-white md:rounded-l-[70px]'>
                <div className="flex justify-center mx-4">

                    <div className="card  w-full max-w-md shadow-md shadow-blue-400 shadow-t-2 bg-base-100 my-24 ">
                        <form className="card-body" onSubmit={handleRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" required name="name" placeholder="Name" className="input input-bordered" />
                            </div>
                            {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" required name="photo" placeholder="Photo URL" className="input input-bordered" />
                            </div> */}
                            <div className="form-control w-full my-6">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="file" required name="photo" className="file-input file-input-bordered  w-full " />
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered " required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Role </span>
                                </label>
                                <select name="role" className="select select-bordered w-full ">
                                    <option>HR</option>
                                    <option>Employee</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Bank Account No</span>
                                </label>
                                <input type="number" name="account" placeholder="Bank Account No" className="input input-bordered " required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Salary</span>
                                </label>
                                <input type="number" defaultValue={30000} name="salary" className="input input-bordered" readOnly />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Designation</span>
                                </label>
                                <select name="designation" className="select select-bordered w-full ">
                                    <option> HR</option>
                                    <option>Sales Assistant</option>
                                    <option> Social Media executive</option>
                                    <option> Digital Marketer</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative">
                                    <input type={showPass ? "text" : "password"} placeholder="password" name="password" className="input input-bordered w-full" required />
                                    <span className="absolute top-3 right-3" onClick={() => setshowPass(!showPass)}>
                                        {showPass ? <IoEye /> : <IoEyeOff />
                                        }

                                    </span>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-black text-white hover:bg-blue-300 ">Register</button>
                            </div>
                            <p className="text-center mt-4">Already have an account ? <Link className="text-blue-300 font-bold" to="/login">Login</Link> </p>

                        </form>

                    </div >
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default Register;