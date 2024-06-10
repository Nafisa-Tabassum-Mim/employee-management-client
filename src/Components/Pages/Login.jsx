import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { AuthContext } from "../Firebase/AuthProvider";
// import { Helmet } from "react-helmet";
import useAxiosPublic from "../Hooks/useAxiosPublic";



const Login = () => {
    const { signIn, setLoading, signInWithGoogle } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const [showPass, setshowPass] = useState(false)
    const axiosPublic = useAxiosPublic()

    const handleLogin = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value

        signIn(email, password)
            .then(() => {
                toast.success('You are login now')
                navigate(location?.state ? location.state : '/')
            })
            .catch((error) => {
                setLoading(false)
                toast.error("Email or Password is incorrect")
            })
    }

    const handleGoogleSign = () => {
        signInWithGoogle()
            .then((result) => {
                const newUserInfo = {
                    name: result.user?.displayName,
                    photo: result.user?.photoURL,
                    email: result.user?.email,
                    role: 'Employee',
                    account: 11111111,
                    salary: 30000,
                    designation: 'Sales Assistant',
                }
                axiosPublic.post('/users', newUserInfo)
                    .then((res) => {
                        console.log(res)
                        if (res.data.insertedId) {
                            // reset()
                            navigate(location?.state ? location.state : '/')
                        }
                    })
                navigate(location?.state ? location.state : '/')
            })
            .catch((error) => {
                setLoading(false)
                toast.error(error.code)
            })
    }



    return (
        <div>
            {/* <Helmet>
                <title>Login</title>
            </Helmet> */}
            <div className="flex justify-center gap-4 flex-col-reverse md:flex-row">

                <div className='relative h-[600px]'>
                    <img src="https://i.ibb.co/MZtTggk/logo-design-good-designer.jpg" alt="" />
                </div>
                <div className="card  w-full max-w-md shadow-md shadow-roaming  shadow-blue-300 shadow-t-2 my-4 md:my-12">
                    <form className="card-body" onSubmit={handleLogin}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name="email" className="input input-bordered " required />
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
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-black text-white hover:bg-blue-300 ">Login</button>
                        </div>
                        <div className="text-center text-white font-black">
                            You can also login by
                        </div>
                        <div className="flex items-center  justify-center">
                            <div className="border-b border-black w-full"></div>
                            <div className="flex items-center gap-1 relative z-10">
                                <button onClick={handleGoogleSign} className="border border-green-300 rounded-lg p-2 text-[30px]"><FcGoogle /></button>

                            </div>
                            <div className="border-b border-black w-full"></div>
                        </div>
                        <p className="text-center mt-4">Do not have an account ? <Link className="text-blue-300 font-bold" to="/register">Register</Link> </p>

                    </form>

                </div >
                <ToastContainer></ToastContainer>
            </div>
        </div>
    );
};

export default Login;