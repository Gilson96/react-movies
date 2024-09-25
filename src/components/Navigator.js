import React, { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { FilmIcon } from '@heroicons/react/24/outline'
import { useSearchMoviesQuery } from '../features/Movies/allMoviesApi'
import { useSearchSeriesQuery } from '../features/Series/allSeriesApi'
import Card from '../components/Card'
import SearchedMovie from './Movies/SearchedMovie'
import { useDisclosure } from '@chakra-ui/react'
import Account from './Account/Account'
import { Link } from 'react-router-dom'

const Navigator = ({ setIsActive, isActive }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isFocus, setIsFocus] = useState('movie')
    const [showSearch, setShowSearch] = useState(false)
    const [inputValue, setInputValue] = useState()
    const { data: searchMovies = [], isLoading } = useSearchMoviesQuery(inputValue)
    const { data: searchSeries = [] } = useSearchSeriesQuery(inputValue)


    const handleInputValue = (e) => {
        setInputValue(e.target.value)
    }

    if (isLoading) return <p>Loading</p>

    return (
        <>
            <div className='flex w-full h-[4rem] justify-between items-center'>

                <div className='flex w-auto h-auto justify-center items-center gap-2 '>
                    <p className='text-3xl text-white font-bold'>React-Movies</p>
                    <FilmIcon className='h-12 w-12 text-white' />
                </div>

                <div className='flex justify-between items-center border rounded-full pl-[2%] pr-[5px] bg-slate-950 h-[3.2rem] laptop:w-[20%]'>
                    <div
                        className={`flex justify-center items-center text-slate-400 cursor-pointer w-[5rem]`}
                        onClick={() => { setIsActive('movie'); setIsFocus('movie') }}
                    >
                        <p className={` ${isFocus === 'movie' ? 'text-white' : ''}`}>Movies</p>
                    </div>
                    <p
                        className={`flex justify-center items-center text-slate-400 cursor-pointer w-[5rem]`}
                        onClick={() => { setIsActive('serie'); setIsFocus('serie') }}
                    >
                        <p className={` ${isFocus === 'serie' ? 'text-white' : ''}`}>Series</p>
                    </p>
                    <i
                        className='bg-slate-700 flex justify-center items-center w-[2.5rem] h-[2.5rem] rounded-full cursor-pointer'
                        onClick={() => { setShowSearch(true); onOpen(); }}
                    >
                        <MagnifyingGlassIcon className='w-5 h-5 text-white' />
                    </i>
                </div>
                <Account />
            </div >

            {showSearch &&
                <SearchedMovie
                    onOpen={onOpen}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <div className='flex flex-col w-full h-full gap-2'>
                        <div>
                            <input
                                className='flex h-[2rem] rounded-full p-2 laptop:w-[50%] bg-slate-200 border'
                                type='text'
                                value={inputValue}
                                onChange={handleInputValue}
                                placeholder='search by title'
                            />
                        </div>
                        <div className='flex flex-wrap h-full w-full gap-2'>
                            {isActive === 'movie' &&
                                searchMovies.results.filter(movie => movie.backdrop_path !== null).map(movie =>
                                    <Link to={`/movies/${movie.id}`}>
                                        <Card
                                            image={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                                            // rating={movie.vote_average}
                                            // title={movie.title}
                                            getId={movie.id}
                                            setGetId={() => { }}
                                            navigate={true}
                                            setNavigate={() => { }}
                                        // year={movie.release_date.slice(0, 4)}
                                        />
                                    </Link>
                                )
                            }
                            {isActive === 'serie' &&
                                searchSeries.results.filter(serie => serie.backdrop_path !== null).map(serie =>
                                    <Link to={`/series/${serie.id}`}>
                                        <Card
                                            image={`https://image.tmdb.org/t/p/w342/${serie.poster_path}`}
                                            // rating={serie.vote_average}
                                            // title={serie.title}
                                            getId={serie.id}
                                            setGetId={() => { }}
                                            navigate={true}
                                            setNavigate={() => { }}
                                        // year={serie.release_date.slice(0, 4)}
                                        />
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                </SearchedMovie>
            }
        </>
    )
}

export default Navigator