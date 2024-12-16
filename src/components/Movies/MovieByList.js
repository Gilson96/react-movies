import { useState } from 'react'
import { Link } from "react-router-dom";
import { useGetMovieByListQuery } from '../../features/Movies/moviesByGenreApi'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { SkeletonText, Box } from '@chakra-ui/react'

const MovieByList = ({ slidesPerView, spaceBetween, list, type, handleGenre }) => {
    const { data: movieByList = [], isLoading } = useGetMovieByListQuery({ list: list, type: type })

    return (
        <>
            <Swiper
                className='h-[18rem] w-full'
                slidesPerView={1.5}
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
                            <SwiperSlide
                                key={index}
                            >
                                <Link to={`/movies/${movie.id}`} state={type} >
                                    <div className='flex flex-col gap-1 rounded-lg'>
                                        <div className={`h-[15rem] w-[10rem] rounded-xl bg-[url(https://image.tmdb.org/t/p/w1280/${movie.poster_path})] bg-center bg-no-repeat bg-cover`}>
                                        </div>
                                        <p className='text-white text-sm w-[80%] text-center'>
                                            {movie.title || movie.name}
                                        </p>
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

// style={{
//     backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url('https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}')`
// }}