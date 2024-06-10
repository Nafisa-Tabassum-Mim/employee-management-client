
import { FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Section2 = () => {
    return (
        <div className='mt-24'>
            <div className="text-center my-4 mx-4 md:mx-24 ">
                <p className="text-4xl uppercase font-serif py-2 text-blue-400 ">why you should choose us </p>
                <p className="text-xl">ProBiz offers a diverse selection of laptops and electronic accessories, ensuring that you can find exactly what you're looking for, whether you need a high-performance laptop or specific accessories to complement your devices</p>
            </div>
            <div className="flex flex-col md:flex-row justify-center m-auto">

                <div className="my-4 mx-2 ">
                    <div className="w-full md:w-96 bg-base-100 shadow-xl p-8 my-4">
                        <h3 className="text-2xl font-bold font-mono">Best service</h3>
                        <p className="flex items-center gap-4 mt-2"> <FaArrowRight /> Intuitive Navigation</p>
                        <p className="flex items-center gap-4"> <FaArrowRight />Clear Layout</p>
                        <p className="flex items-center gap-4"><FaArrowRight /> Product return</p>
                        <p className="flex items-center gap-4"><FaArrowRight />Streamlined Checkout Process </p>
                        <p className="flex items-center gap-4"><FaArrowRight /> Accessible Design</p>
                        <div className="card-actions my-4">
                            <Link to='/contact-us' className="btn bg-blue-500 w-full text-white">Connect with Now</Link>
                        </div>
                    </div>
                </div >
                <div className="my-4 mx-2 ">
                    <div className="w-full md:w-96 bg-base-100 shadow-xl p-8 my-4">
                        <h3 className="text-2xl font-bold font-mono">Seamless best laptops</h3>
                        <p className="flex items-center gap-4 mt-2"> <FaArrowRight /> Effortless Performance</p>
                        <p className="flex items-center gap-4"> <FaArrowRight />Reliable Durability</p>
                        <p className="flex items-center gap-4"><FaArrowRight />Versatile Features</p>
                        <p className="flex items-center gap-4"><FaArrowRight /> Sleek Design</p>
                        <p className="flex items-center gap-4"><FaArrowRight />Intuitive Interface</p>
                        <div className="card-actions my-4">
                            <Link to='/contact-us' className="btn bg-blue-500 w-full text-white">Connect with Now</Link>
                        </div>
                    </div>
                </div >
                <div className="my-4 mx-2 ">
                    <div className="w-full md:w-96 bg-base-100 shadow-xl p-8 my-4">
                        <h3 className="text-xl font-bold font-mono">Affordable electric Devices</h3>
                        <p className="flex items-center gap-4 mt-2"><FaArrowRight /> Budget-Friendly</p>
                        <p className="flex items-center gap-4"><FaArrowRight /> High-Quality</p>
                        <p className="flex items-center gap-4"><FaArrowRight /> Premium</p>
                        <p className="flex items-center gap-4"><FaArrowRight />Top-of-the-Line</p>
                        <p className="flex items-center gap-4"><FaArrowRight />Cutting-edge</p>

                        <div className="card-actions my-4">
                            <Link to='/contact-us' className="btn bg-blue-500 w-full text-white">Connect with Now</Link>
                        </div>
                    </div>
                </div >
            </div>
        </div>
    );
};

export default Section2;