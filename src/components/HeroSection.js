import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ListBulletIcon } from '@heroicons/react/24/solid';

const HeroSection = ({ data }) => {

    return (
        <div className='w-full h-full mt-[2%]'>
            <Swiper
                navigation={true}
                modules={[Navigation, Pagination]}
                className="flex h-[20rem] w-full"
                slidesPerView={2}
                spaceBetween={20}
                pagination={{ dynamicBullets: true }}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
            >
                {data.results.map(data => (
                    <SwiperSlide className='flex justify-center items-center'>
                        <div className='flex w-full h-full justify-center items-center '>
                            <div
                                style={{
                                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url('https://image.tmdb.org/t/p/w1280/${data.backdrop_path}')`,
                                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',
                                }}
                                className='flex flex-col h-full w-full rounded-3xl shadow items-start justify-between'
                            >
                                <p className='text-white pt-[6%] pl-[6%] tablet:text-2xl laptop:text-4xl'>{data.name || data.title}</p>
                                <Link
                                    to={`movies/${data.id}`}
                                    className='flex h-[3rem] p-[2%] mb-[3%] ml-[6%] rounded-full bg-white border justify-evenly items-center text-black hover:bg-white/50 tablet:w-[40%] laptop:w-[25%]'
                                >
                                    <ListBulletIcon className='h-5 w-5' />
                                    <p className='font-bold'>See Details</p>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}



export default HeroSection