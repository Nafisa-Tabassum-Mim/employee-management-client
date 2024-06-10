import { Link } from 'react-router-dom';
import './banner.css'
const Bannner = () => {
    return (
        <div className="featured-item text-white bg-fixed  pt-24 ">
            <div className="text-center mx-auto md:w-4/12 my-8">
                <p className="text-3xl uppercase border-b-4 py-2 mx-6">Elevate your lifestyle with Probiz accessories </p>
            </div>
            <div className="md:flex justify-center items-center bg-slate-500 bg-opacity-60 pb-20 pt-12 px-6 md:px-36">
                <div>
                    <img src='https://i.ibb.co/zVL7ss0/5-Desk-Setup-with-a-Laptop-Monitor-Ideas-for-2021-7da2389457c.jpg' alt="" />
                </div>
                <div className="md:ml-10">
                    <p className="uppercase text-black text-3xl">Probiz Laptops Powering Your Potential.</p>
                    <p className='font-semibold uppercase'>We envision a world where technology empowers every professional to achieve their highest potential. By pushing the boundaries of laptop design and functionality, we strive to be the go-to brand for business leaders, creatives, and tech enthusiasts alike.</p>
                    <Link to='/contact-us'><button className="btn btn-outline border-0 border-b-4 mt-4">Contact us</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Bannner;