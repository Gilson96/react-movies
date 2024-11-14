import React, { useState } from 'react'
import { useGetMovieRecommendationsQuery } from '../../features/Movies/allMoviesApi'
import { Link, useLocation, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { SkeletonText, Box } from '@chakra-ui/react'
import { StarIcon } from '@heroicons/react/24/solid'
import useScreenSize from '../../features/useScreenSize';

const MovieRecommendations = ({ movieId, slidesPerView, modules, spaceBetween, id, type }) => {

    let { movie_id } = useParams();
    let { state } = useLocation();
    const { data: movieRecommendations = [], isLoading } = useGetMovieRecommendationsQuery(({ id: (parseInt(movieId || parseInt(movie_id))), type: (type || state) }))
    const screenSize = useScreenSize()

    return (
        <div className='mt-[1%]'>

            {isLoading ?
                <div className='flex gap-4'>
                    <Box padding='6' boxShadow='lg' className='w-[15rem] h-[20rem] rounded-3xl border'>
                        <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='2' />
                    </Box>
                    <Box padding='6' boxShadow='lg' className='w-[15rem] h-[20rem] rounded-3xl border'>
                        <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='2' />
                    </Box>
                    <Box padding='6' boxShadow='lg' className='w-[15rem] h-[20rem] rounded-3xl border'>
                        <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='2' />
                    </Box>
                    <Box padding='6' boxShadow='lg' className='w-[15rem] h-[20rem] rounded-3xl border'>
                        <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='2' />
                    </Box>
                    <Box padding='6' boxShadow='lg' className='w-[15rem] h-[20rem] rounded-3xl border'>
                        <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='2' />
                    </Box>
                </div>

                :

                movieRecommendations.results.length !== 0 ?
                    <Swiper
                        className={`w-full ${screenSize.width < 700 ? 'h-[12rem]' : 'h-[20rem]'}`}
                        slidesPerView={slidesPerView}
                        spaceBetween={spaceBetween}
                    >
                        {movieRecommendations.results.filter(movie => movie.poster_path !== null).map((movie, index) => (
                            <>
                                <SwiperSlide key={index}>
                                    <Link to={`/movies/${movie.id}`} state={type || state}>
                                        <div
                                            style={{
                                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url('https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}')`,
                                                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',
                                            }}
                                            className='flex flex-col h-full w-full items-start justify-end p-[3%] gap-1 rounded-lg cursor-pointer'
                                        >
                                            <p className='text-white font-bold max-small-phone:text-sm'>{movie.title || movie.name}</p>
                                            <div className='flex gap-3'>
                                                <div className='flex gap-1 items-center'>
                                                    <i><StarIcon className='w-5 h-5 text-yellow-400 max-small-phone:' /></i>
                                                    <p className='text-white text-sm'>{movie.vote_average.toFixed(1)}/10</p>
                                                </div>
                                                <div className='flex gap-1 items-center'>
                                                    <p className='text-white text-sm'>&#8226;</p>
                                                    <p className='text-white text-sm'>
                                                        {type === 'movie' && movie.release_date.slice(0, 4)}
                                                        {type === 'tv' && movie.first_air_date.slice(0, 4)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            </>
                        ))}
                    </Swiper >
                    :
                    <p className='font-bold'>Not Available</p>
            }

        </div>
    )
}

export default MovieRecommendations