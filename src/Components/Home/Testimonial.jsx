import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'


// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const Testimonial = () => {


    return (
        <section className="mt-20">
         <div className="text-center mx-auto md:w-4/12">
                <p className="text-4xl uppercase font-serif py-2 text-blue-400 ">Probiz testimonials </p>
            </div>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                <SwiperSlide>
                    <div className="flex flex-col items-center mx-4 md:mx-32 my-12">
                        <Rating
                            style={{ maxWidth: 180 }}
                            value={5}
                            readOnly
                        />
                        <p className="py-8">I was impressed by the wide range of laptops and electronic accessories available on the ProBiz website. The product descriptions were detailed, providing all the information I needed to make an informed decision. Additionally, the pricing was competitive, and the checkout process was quick and secure..</p>
                        <h3 className="text-2xl text-orange-400">Emily Rodriguez</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex flex-col items-center mx-4 md:mx-32 my-12">
                        <Rating
                            style={{ maxWidth: 180 }}
                            value={4}
                            readOnly
                        />
                        <p className="py-8">I recently purchased a laptop and some accessories from ProBiz , and I have to say, I'm thoroughly impressed with both the products and the service I received. From the moment I walked into their store, I was greeted by friendly staff who were eager to assist me in finding the right items for my needs.</p>
                        <h3 className="text-2xl text-orange-400">David Thompson</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex flex-col items-center mx-4 md:mx-32 my-12">
                        <Rating
                            style={{ maxWidth: 180 }}
                            value={4}
                            readOnly
                        />
                        <p className="py-8"> I had a fantastic experience with the ProBiz  , thanks to the user-friendly interface and exceptional customer service provided by Probiz. I would highly recommend ProBiz to anyone in need of quality electronics at affordable prices.</p>
                        <h3 className="text-2xl text-orange-400">Michael Nguyen</h3>
                    </div>
                </SwiperSlide>


            </Swiper>
        </section>
    );
};

export default Testimonial;