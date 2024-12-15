import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGetMovieByGenreQuery } from '../../features/Movies/moviesByGenreApi'
import { ArrowLeftCircleIcon, StarIcon } from '@heroicons/react/24/solid'
import useScreenSize from '../../features/useScreenSize'

const AllMovies = () => {
    let { state } = useLocation()
    const screenSize = useScreenSize()
    let genreName = state[0].genreName
    let type = state[0].type
    let genre = state[0].genre
    const { data: movieByGenre = [], isLoading } = useGetMovieByGenreQuery({ genre: genre, type: type })
   
    if (isLoading) return <p>Loading</p>
    return (
        <div>
            {/* Title */}
            <p className='text-white uppercase p-[3%] text-3xl font-bold'>{genreName}</p>

            {/* back to Home link */}
            <Link to='/'>
                <ArrowLeftCircleIcon className={` absolute text-white hover:text-white/50 ${screenSize.width < 700 ? 'right-[0.2rem] top-[0.5rem] w-[2rem] h-[2rem]' : 'right-[3rem] top-[2rem] w-10 h-10'}`} />
            </Link>

            {/* All movies */}
            <div className={`w-full h-full flex flex-wrap items-center ${screenSize.width < 700 ? 'justify-center gap-2 mt-[1rem]' : 'justify-center gap-2'}`}>
                {movieByGenre.results.filter(movie => movie.backdrop_path !== null).map(movie =>
                    <Link to={`/movies/${movie.id}`} state={type}>
                        <div
                            style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url('https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}')`
                            }}
                            className={`${screenSize.width < 700 ? 'h-[8rem] w-[8rem]' : 'h-[22rem] w-[15rem]'}  gap-1 rounded-lg bg-no-repeat bg-cover bg-center `}
                        >
                            <div className='h-full w-full flex flex-col items-start hover:bg-[rgb(0,0,0,0.5)] justify-end rounded-lg p-[3%]'>
                                <p className={`${screenSize.width < 700 && 'text-xs'} text-white font-bold `}>{movie.title || movie.name}</p>
                                <div className='flex gap-3'>
                                    <div className='flex gap-1 items-center'>
                                        <i><StarIcon className={`text-yellow-400 ${screenSize.width < 700 ? 'w-3 h-3' : 'w-5 h-5 '}`} /></i>
                                        <p className={` text-white ${screenSize.width < 700 ? 'text-[xs]' :'text-sm'}`}>{movie.vote_average.toFixed(1)}/10</p>
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <p className={`text-white ${screenSize.width < 700 ? 'text-xs' :'text-sm'} `}>&#8226;</p>
                                        <p className={`text-white ${screenSize.width < 700 ? 'text-xs' :'text-sm'} `}>
                                            {type === 'movie' && movie.release_date.slice(0, 4)}
                                            {type === 'tv' && movie.first_air_date.slice(0, 4)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default AllMovies