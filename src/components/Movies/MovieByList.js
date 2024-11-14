import { useState } from 'react'
import { Link } from "react-router-dom";
import { useGetMovieByListQuery } from '../../features/Movies/moviesByGenreApi'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { SkeletonText, Box } from '@chakra-ui/react'
import { StarIcon } from '@heroicons/react/24/solid';
import { Pagination, Navigation } from 'swiper/modules';
import useScreenSize from '../../features/useScreenSize';

const MovieByList = ({ slidesPerView, spaceBetween, list, type, handleGenre }) => {
    const { data: movieByList = [], isLoading } = useGetMovieByListQuery({ list: list, type: type })
    const screenSize = useScreenSize()

    return (
        <>
            <p className={`pb-[1%] text-white text-2xl capitalize ${screenSize.width < 700 ? 'text-base' : 'text-2xl'} `}>{list.replaceAll('_', ' ')} {type}</p>
            <p className={`pb-[1%] text-slate-400 ${screenSize.width < 700 ? 'text-sm' : 'text-xl'}`}>Explore diverse movie categories, from action to drama and everything in between</p>


            <Swiper
                className={`${screenSize.width < 700 ? 'h-[20rem]' : 'h-[25rem]'} w-full`}
                slidesPerView={slidesPerView}
                spaceBetween={spaceBetween}
                navigation={screenSize.width < 700 ? false : true}
                modules={[Pagination, Navigation]}
            >
                {isLoading ?
                    // movies skeleton
                    <>
                        <SwiperSlide>
                            <Box padding='6' boxShadow='lg' className='w-[15rem] h-[20rem] rounded-3xl border'>
                                <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='2' />
                            </Box>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Box padding='6' boxShadow='lg' className='w-[15rem] h-[20rem] rounded-3xl border'>
                                <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='2' />
                            </Box>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Box padding='6' boxShadow='lg' className='w-[15rem] h-[20rem] rounded-3xl border'>
                                <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='2' />
                            </Box>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Box padding='6' boxShadow='lg' className='w-[15rem] h-[20rem] rounded-3xl border'>
                                <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='2' />
                            </Box>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Box padding='6' boxShadow='lg' className='w-[15rem] h-[20rem] rounded-3xl border'>
                                <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='2' />
                            </Box>
                        </SwiperSlide>
                    </>
                    :
                    // popular movies
                    movieByList.results.filter((movie, key) => movie.backdrop_path !== null).map((movie, index) => (
                        <>
                            <SwiperSlide key={index} className='flex gap-2'>
                                <Link to={`/movies/${movie.id}`} state={type}>
                                    <div
                                        style={{
                                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url('https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}')`
                                        }}
                                        className='h-full w-full p-[3%] gap-1 rounded-lg bg-no-repeat bg-cover bg-center'
                                    >
                                        <div className='h-full w-full flex flex-col  items-start justify-end hover:bg-white/10 rounded-lg'>
                                            <p className='text-white font-bold'>{movie.title || movie.name}</p>
                                            <div className='flex gap-3'>
                                                <div className='flex gap-1 items-center'>
                                                    <i><StarIcon className='w-5 h-5 text-yellow-400' /></i>
                                                    <p className='text-white text-sm'>{movie.vote_average.toFixed(1)}/10</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Link>
                            </SwiperSlide>
                        </>
                    ))
                }
            </Swiper>
        </>
    )
}

export default MovieByList