import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Box, SkeletonCircle, Avatar } from '@chakra-ui/react'
import { useGetMovieActorsQuery } from '../../features/Movies/allMoviesApi'

const MobileMovieActors = ({ movieId, type }) => {
    const { data: movieActors = [], isLoading } = useGetMovieActorsQuery({ id: parseInt(movieId), type: type })

    return (
        <div>
            <Swiper
                className='h-[9rem] w-full'
                slidesPerView={3}
            >
                {isLoading ?
                    // movies skeleton
                    <>
                        <SwiperSlide>
                            <Box padding='6' boxShadow='lg' className='w-full flex justify-start items-start gap-2'>
                                <SkeletonCircle size='20' />
                                <SkeletonCircle size='20' />
                                <SkeletonCircle size='20' />
                                <SkeletonCircle size='20' />
                                <SkeletonCircle size='20' />
                            </Box>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Box padding='6' boxShadow='lg' className='w-full flex justify-start items-start gap-2'>
                                <SkeletonCircle size='20' />
                                <SkeletonCircle size='20' />
                                <SkeletonCircle size='20' />
                                <SkeletonCircle size='20' />
                                <SkeletonCircle size='20' />
                            </Box>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Box padding='6' boxShadow='lg' className='w-full flex justify-start items-start gap-2'>
                                <SkeletonCircle size='20' />
                                <SkeletonCircle size='20' />
                                <SkeletonCircle size='20' />
                                <SkeletonCircle size='20' />
                                <SkeletonCircle size='20' />
                            </Box>
                        </SwiperSlide>

                    </>
                    :
                    movieActors.cast.length > 0 ?
                        movieActors.cast.map(actor => (
                            <SwiperSlide>
                                <div className='flex flex-col w-full justify-center items-center mt-[2%]'>
                                    <Avatar size={'xl'} src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`} />
                                    <p className='text-xs line-clamp-1 text-center text-neutral-200'>{actor.name}</p>
                                    <p className='text-[0.6rem] italic text-center text-neutral-200'>'{actor.character}'</p>
                                </div>
                            </SwiperSlide>
                        ))
                        :
                        <SwiperSlide>
                            <div className='flex flex-col w-full min-h-[7rem] justify-center  items-center'>
                                <p>Not Available</p>
                            </div>
                        </SwiperSlide>
                }
            </Swiper >
        </div >
    )
}

export default MobileMovieActors
