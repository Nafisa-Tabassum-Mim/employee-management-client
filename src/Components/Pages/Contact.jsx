import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Contact = () => {
    const axiosPublic = useAxiosPublic()
    const handleMessage = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const message = form.message.value;


        const updatePost = { email, message }
        console.log(updatePost)
        const res = await axiosPublic.post(`/message`, updatePost);
        console.log(res);
        if (res.data.insertedId) {
            toast('message is sent!')
        }

    }


    return (
        <div className='bg-gray-400 py-6 text-white'>
            <div className='py-4 px-6'>
                <h3 className='text-2xl '>Contact with our address</h3>
                <h3 className='text-2xl'>Address - 2515 Speedway, Austin, Texas, USA  </h3>
            </div>
            <form onSubmit={handleMessage} >
                {/* form  row */}
                <div className=" mb-8 gap-2 px-6">
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text font-medium text-lg text-black">Email</span>
                        </label>
                        <label className="input-group ">
                            <input type="email" name="email" placeholder="Email" className="input input-bordered w-full " required />
                        </label>
                    </div>

                </div>
                {/* form row */}
                <div className=" mb-8 gap-2 px-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-lg text-black" >Message</span>
                        </label>
                        <label className="input-group">
                            <textarea placeholder="message" name='message' className="textarea textarea-bordered textarea-lg w-full " required></textarea>

                        </label>
                    </div>
                </div>

                <input type="submit" value="Send your opinion" className="btn btn-block bg-black font-medium text-lg text-white  " />
            </form>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Contact;