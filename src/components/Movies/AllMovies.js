import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGetMovieByGenreQuery } from '../../features/Movies/moviesByGenreApi'
import MovieByGenre from './MovieByGenre'
import { ArrowLeftCircleIcon, StarIcon } from '@heroicons/react/24/solid'

const AllMovies = () => {
    let { state } = useLocation()
    let genreName = state[0]
    let type = state[1]
    let genre = state[2]
    const { data: movieByGenre = [], isLoading } = useGetMovieByGenreQuery({ genre: genre, type: type })

    if (isLoading) return <p>Loading</p>
    return (
        <div>
            <p className='text-white capitalize p-[3%] text-2xl'>{genreName}</p>
            <Link to='/'>
                <ArrowLeftCircleIcon className='w-10 h-10 absolute right-[3rem] top-[2rem] text-white hover:text-white/50' />
            </Link>
            <div className='w-full h-full flex flex-wrap gap-3 justify-center items-center'>
                {movieByGenre.results.filter(movie => movie.backdrop_path !== null).map(movie =>
                    <Link to={`/movies/${movie.id}`} state={type}>
                        <div
                            style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url('https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}')`,
                                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',
                            }}
                            className='flex flex-col h-[22rem] w-[15rem] p-[1%] gap-1 rounded-lg justify-end'
                        >
                            <p className='text-white font-bold'>{movie.title || movie.name}</p>
                            <div className='flex gap-3'>
                                <div className='flex gap-1 items-center'>
                                    <i><StarIcon className='w-5 h-5 text-yellow-400' /></i>
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
                )}
            </div>
        </div>
    )
}

export default AllMovies