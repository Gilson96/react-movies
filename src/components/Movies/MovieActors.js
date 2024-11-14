import React from 'react'
import { useGetMovieActorsQuery } from '../../features/Movies/allMoviesApi'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { Avatar } from '@chakra-ui/react'
import { SkeletonCircle, Box } from '@chakra-ui/react'

const MovieActors = ({ movieId, slidesPerView, modules, spaceBetween, type }) => {

    const { data: movieActors = [], isLoading } = useGetMovieActorsQuery({id: parseInt(movieId), type: type})

    return (
        <>
            {isLoading ?
            // actors fallback
                <Box padding='6' boxShadow='lg' className='w-full flex justify-start items-start gap-2'>
                    <SkeletonCircle size='20' />
                    <SkeletonCircle size='20' />
                    <SkeletonCircle size='20' />
                    <SkeletonCircle size='20' />
                    <SkeletonCircle size='20' />
                </Box>
                :
                movieActors.length !== 0 ?
                    <Swiper
                        pagination={{
                            clickable: true,
                        }}
                        className="h-auto mt-[2%] w-full"
                        slidesPerView={slidesPerView}
                        spaceBetween={spaceBetween}
                    >
                        {movieActors.cast.map(actors => (
                            <SwiperSlide>
                                <div className='flex flex-col justify-center items-center w-full'>
                                    <Avatar size='xl' name={actors.name} src={`https://image.tmdb.org/t/p/w342/${actors.profile_path}`} />
                                    <p className='text-xs text-white italic'>{actors.name}</p>
                                    <p className='text-xs text-white italic text-center'>'{actors.character}'</p>
                                </div>
                            </SwiperSlide>
                        ))}

                    </Swiper>
                    :
                    <p className='font-bold text-white'>Not Available</p>
            }
        </>
    )
}

export default MovieActors