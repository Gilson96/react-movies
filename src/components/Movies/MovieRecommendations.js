import React, { useState } from 'react'
import { useGetMovieRecommendationsQuery } from '../../features/Movies/allMoviesApi'
import { Link, useLocation, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import AnimatedButton from '../AnimatedUI/AnimatedButton';
// Import Swiper styles
import 'swiper/css';
import { SkeletonText, Box } from '@chakra-ui/react'
import { StarIcon } from '@heroicons/react/24/solid'
import useScreenSize from '../../features/useScreenSize';
import { RxHand } from "react-icons/rx";

const MovieRecommendations = ({ movieId, slidesPerView, modules, spaceBetween, id, type, genres }) => {
    const [mouseHover, setMouseHover] = useState()
    let { movie_id } = useParams();
    let { state } = useLocation();
    const { data: movieRecommendations = [], isLoading } = useGetMovieRecommendationsQuery(({ id: (parseInt(movieId || parseInt(movie_id))), type: (type || state) }))
    const screenSize = useScreenSize()
    console.log(movieRecommendations)

    return (
        <div className='w-full h-full relative -top-[50rem] p-[2%] '>
            {/* Title */}
            <div className='flex flex-col w-full'>
                <h1 className='text-xl text-neutral-500'>Recommendations:</h1>
                <hr className='border-neutral-700 w-full h-[px] pb-[2%]' />
            </div>
            {/* Fallback */}
            {isLoading ?
                <div className='flex gap-4'>
                    <Box padding='6' boxShadow='lg' className='w-[15rem] h-[20rem] rounded-3xl border'>
                        <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='2' />
                    </Box>
                    <Box padding='6' boxShadow='lg' className='w-[15rem] h-[20rem] rounded-3xl border'>
                        <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='2' />
                    </Box>
                </div>

                :
                // if movie has movies recommendations show 5 of them
                movieRecommendations.results.length !== 0 ?
                    <div className='w-full h-full'>
                        <div className='w-full flex justify-center items-end gap-2'>
                            {/* Sign to advise` */}
                            <RxHand className='text-xs -rotate-45 -scale-x-100' />
                            <p className='italic text-xs'>drag</p>
                            <RxHand className='text-xs rotate-45' />
                        </div>
                        {/* 5 movies recommendations */}
                        <Swiper
                            slidesPerView={2}
                            className="h-full w-full flex"
                            grabCursor={true}
                        >

                            {movieRecommendations.results.filter(movie => movie.poster_path !== null).slice(0, 5).map((movie, index) => (
                                <>
                                    <SwiperSlide
                                        style={{
                                            height: 100 + '%',
                                            width: 100 + '%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',

                                        }}

                                    >
                                        <Link key={index} to={`/movies/${movie.id}`} state={type || state}>
                                            <div
                                                onMouseOver={() => setMouseHover(movie.id)}
                                                onMouseLeave={() => setMouseHover(false)}
                                                className={`flex flex-col h-[20rem] w-[12rem] items-start justify-end gap-1 rounded-lg bg-[url(https://image.tmdb.org/t/p/w1280/${movie.poster_path})]  bg-center bg-no-repeat bg-cover`}
                                            >
                                                {mouseHover === movie.id ?
                                                    <div
                                                        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))` }}
                                                        className='h-full w-full transition-all animate__animated animate__fadeInUp animate__faster flex flex-col justify-center items-center gap-2'
                                                    >
                                                        <p className='text-white w-full text-center text-2xl font-bold'>{movie.title || movie.name}</p>
                                                        <div className='flex flex-col gap-1'>
                                                            <div className='flex gap-1 items-center'>
                                                                <i><StarIcon className='w-5 h-5 text-yellow-400 ' /></i>
                                                                <p className='text-white text-sm'>{movie.vote_average.toFixed(1)}/10</p>
                                                                <p className='text-white text-sm'>&#8226;
                                                                    {type === 'movie' && movie.release_date.slice(0, 4)}
                                                                    {type === 'tv' && movie.first_air_date.slice(0, 4)}
                                                                </p>
                                                            </div>
                                                            <div className="w-full flex justify-center items-center p-[2%]">
                                                                <AnimatedButton genreName={'More Details'} specialStyle={{
                                                                    backgroundColor: '#a3a3a3',
                                                                    color: '#404040',
                                                                    fontSize: 0.6 + 'rem'
                                                                }} />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    :
                                                    <div>

                                                    </div>
                                                }
                                                {/* 
                                                    <div className='flex gap-1'>
                                                        
                                                    </div> */}
                                            </div>
                                        </Link>


                                    </SwiperSlide >
                                </>
                            ))}

                        </Swiper>

                    </div>
                    :
                    <p className='font-bold text-neutral-400'>Not Available</p>
            }

        </div >
    )
}

export default MovieRecommendations
