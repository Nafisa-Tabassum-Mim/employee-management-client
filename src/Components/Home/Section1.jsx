import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './banner.css'
const Section1 = () => {
    return (
        <div>
             <div>
             <div className="text-center mx-auto md:w-4/12 my-8">
                <p className="text-4xl uppercase font-serif py-2 text-blue-400 ">Probiz special category </p>
            </div>
            <Swiper
                slidesPerView={3}
                spaceBetween={20}
                height='200px'
                pagination={{
                    clickable: true,

                }}
                modules={[Pagination]}
                className="mySwiper"
            >
            
                <SwiperSlide>
                    <img src='https://i.ibb.co/jGJ5m8S/photo-1607462109225-6b64ae2dd3cb.jpg' alt="" />
                    <h3 className='text-2xl text-center uppercase -mt-16 text-red-800'>camera</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src='https://i.ibb.co/FKbCbMM/pexels-junior-teixeira-1064069-2047905.jpg' alt="" />
                    <h3 className='text-2xl text-center uppercase -mt-16 text-red-800'>Laptops</h3>
                </SwiperSlide>         
                <SwiperSlide>
                    <img src='https://i.ibb.co/SJztjgg/premium-photo-1674823160034-5a514c7074ce.jpg' alt="" />
                    <h3 className='text-2xl text-center uppercase -mt-16 text-red-800'>headset</h3>
                </SwiperSlide>      
                <SwiperSlide>
                    <img src='https://i.ibb.co/jGJ5m8S/photo-1607462109225-6b64ae2dd3cb.jpg' alt="" />
                    <h3 className='text-2xl text-center uppercase -mt-16 text-red-800'>camera</h3>
                </SwiperSlide>   
              

            </Swiper>
        </div>
        </div>
    );
};

export default Section1;