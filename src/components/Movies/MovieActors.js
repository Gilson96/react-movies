import { useState, useRef } from 'react'
import { useGetMovieActorsQuery } from '../../features/Movies/allMoviesApi'
import { Avatar, Divider } from '@chakra-ui/react'
import { SkeletonCircle, Box } from '@chakra-ui/react'

const MovieActors = ({ movieId, slidesPerView, modules, spaceBetween, type, screenSize}) => {
    const { data: movieActors = [], isLoading } = useGetMovieActorsQuery({ id: parseInt(movieId), type: type })

    console.log(movieActors)

    return (
        <>
            {/* Movie Actors */}
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
                <div className={`w-full h-full flex flex-col justify-center items-center gap-4 relative -top-[26rem]`}>

                    {/* Cast */}
                    <div className='w-full'>
                        <div className='w-full flex justify-between pb-[1%] items-center'>
                            <h1 className='text-xl text-neutral-500 `'>Actors:</h1>
                        </div>
                        <hr className='border-neutral-700 w-full h-[px] pb-[2%]' />
                        <div className='flex'>
                            {movieActors.cast.length > 0 ?
                                movieActors.cast.slice(0, 4).map(actor => (
                                    <div className='flex flex-col w-full justify-center items-center'>
                                        <Avatar size={'xl'} src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`} />
                                        <p className='text-xs line-clamp-1 text-center'>{actor.name}</p>
                                        <p className='text-[0.6rem] italic text-center'>'{actor.character}'</p>
                                    </div>
                                ))
                                :
                                <div className='flex flex-col w-full min-h-[7rem] justify-center  items-center'>
                                    <p>Not Available</p>
                                </div>
                            }
                        </div>
                    </div>

                    {/* crew */}
                    <div className='w-full'>
                        <div className='w-full flex justify-between pb-[1%] items-center'>
                            <h1 className='text-xl text-neutral-500 `'>Production:</h1>
                        </div>
                        <hr className='border-neutral-700 w-full h-[px] pb-[2%]' />
                        <div className='flex h-full'>
                            {movieActors.crew.length > 0 ?
                                movieActors.crew.slice(0, 4).map(actor => (
                                    <div className='flex flex-col w-full justify-center  items-center'>
                                        <Avatar size={'xl'} src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`} name={actor.name} />
                                        <p className='text-xs line-clamp-1 text-center'>{actor.name}</p>
                                        <p className='text-[0.6rem] italic text-center'>'{actor.job}'</p>
                                    </div>
                                ))
                                :
                                <div className='flex flex-col w-full min-h-[7rem] justify-center  items-center'>
                                    <p>Not Available</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default MovieActors

