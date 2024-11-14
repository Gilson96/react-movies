import { useState } from 'react'
import Card from '../Card'
import { ArrowLeftCircleIcon, } from '@heroicons/react/24/outline'
import { Link } from "react-router-dom";
import { CircularProgress, Alert, AlertIcon } from '@chakra-ui/react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useRemoveWatchlistMoviesMutation, useRemoveFavouriteMoviesMutation, useGetAccountDetailsQuery } from '../../features/Account/accountApi'
import useScreenSize from '../../features/useScreenSize'

const MyMovies = () => {
    const { data: account, isLoading } = useGetAccountDetailsQuery()
    const screenSize = useScreenSize()
    const [removeMoviefromWatchlist] = useRemoveWatchlistMoviesMutation()
    const [removeMoviefromFavourite] = useRemoveFavouriteMoviesMutation()
    const [watchlistFeedback, setWatchlistFeedback] = useState()
    const [favouriteFeedback, setFavouriteFeedback] = useState()
    const [isActive, setIsActive] = useState('watchlist')

    return (
        <div className={`flex flex-col w-full ${screenSize.width < 700 ? 'h-screen' : 'min-h-[60rem]'} p-[2%] mb-[2%]`}>
            {isLoading ?
                <div className='flex flex-col w-full h-full justify-center items-center mt-[2%]'>
                    <CircularProgress isIndeterminate size='100px' color='green.300' />
                    <p className='text-white font-bold'>Loading...</p>
                </div>
                :
                <>
                    <div className='flex w-full h-full justify-between text-white'>
                        <p className='text-white font-bold mt-[1%] text-2xl'>My Movies</p>
                        <Link to='/'>
                            <ArrowLeftCircleIcon className='w-10 h-10 hover:text-white/75' />
                        </Link>
                    </div>

                    <div className={`${screenSize.width < 700 ? 'flex flex-col-reverse' : 'flex'} w-full h-full justify-end gap-1 p-[2%]`}>

                        {/* Advice */}
                        <div className={`${screenSize.width < 700 ? 'w-full' : 'absolute w-[30%] left-[2rem] top-[7rem]'} `}>
                            <p className='italic text-slate-400'>(refresh to see movie if added)</p>
                        </div>

                        {/* Watchlist and favourites toggle */}
                        <div className={`flex w-full justify-end gap-1`}>
                            <div
                                onClick={() => { setIsActive('watchlist') }}
                                className={`flex justify-center items-center rounded-full h-[3rem] w-auto ${screenSize.width < 700 ? 'p-[3%]' : 'p-[2%]'} cursor-pointer ${isActive === 'watchlist' ? 'bg-white' : 'bg-white/40'}`}
                            >
                                <p>Watchlist</p>
                            </div>
                            <div
                                onClick={() => { setIsActive('favourite') }}
                                className={`flex justify-center items-center rounded-full h-[3rem] w-auto ${screenSize.width < 700 ? 'p-[3%]' : 'p-[2%]'} cursor-pointer ${isActive === 'favourite' ? 'bg-white' : 'bg-white/40'}`}
                            >
                                <p>Favourite</p>
                            </div>
                        </div>
                    </div>

                    {/* Watchlist Movies */}
                    <div className={`flex w-full h-full gap-[1rem] mt-[2%] ${screenSize.width < 700 ? 'flex-wrap gap-[2rem] justify-center items-center' : ''}`}>
                        {
                            isActive === 'watchlist' &&
                            account.map(account => account.watchlistMovies.map(movie =>
                                <div className='flex flex-col'>
                                    {/* Feedback */}
                                    {watchlistFeedback &&
                                        <div className='absolute w-[30%] left-[2rem] top-[7rem] z-10'>
                                            <Alert status='success' className='rounded-xl'>
                                                <AlertIcon />
                                                Your movie was removed to the Watchlist sucessfully! Refresh to see the magic
                                            </Alert>
                                        </div>
                                    }
                                    <div className='w-full flex items-end'>
                                        <Card
                                            image={`https://image.tmdb.org/t/p/w342/${movie.movieDetails.poster_path}`}
                                            screenSize={screenSize}
                                            title={screenSize.width < 700 ? '' : <p className='text-white'>{movie.movieDetails.title || movie.movieDetails.name}</p>}
                                            getId={movie.movieDetails.id}
                                            type={movie.movieDetails.runtime ? 'movie' : 'tv'}
                                        />
                                        <TrashIcon
                                            className={`h-5 w-5 relative ${screenSize.width < 700 ? '-bottom-[1.5rem] right-[10%]' : '-bottom-[10%] right-[10%]'}  text-red-300 cursor-pointer`}
                                            onClick={() => {
                                                removeMoviefromWatchlist({ id: 1, movieId: movie.id })
                                                setWatchlistFeedback(true)
                                            }}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* Favourites Movies */}
                    <div className={`flex w-full h-full gap-[1rem] mt-[2%] ${screenSize.width < 700 ? 'flex-wrap gap-[2rem] justify-center items-center' : ''}`}>
                        {
                            isActive === 'favourite' &&
                            account.map(account => account.favouriteMovies.map(movie =>
                                <div className='flex flex-col'>

                                    {/* Feedback */}
                                    {favouriteFeedback &&
                                        <div className='absolute w-[30%] left-[2rem] top-[7rem] z-10'>
                                            <Alert status='success' className='rounded-xl'>
                                                <AlertIcon />
                                                Your movie was removed to the Favourite sucessfully! Refresh to see the magic
                                            </Alert>
                                        </div>
                                    }
                                    <div className='w-full flex items-end'>
                                        <Card
                                            image={`https://image.tmdb.org/t/p/w342/${movie.movieDetails.poster_path}`}
                                            title={screenSize.width < 700 ? '' : <p className='text-white'>{movie.movieDetails.title || movie.movieDetails.name}</p>}
                                            getId={movie.movieDetails.id}
                                            screenSize={screenSize}
                                        />
                                        <TrashIcon
                                            className={`h-5 w-5 relative ${screenSize.width < 700 ? '-bottom-[1.5rem] right-[10%]' : '-bottom-[10%] right-[10%]'}  text-red-300 cursor-pointer`}
                                            onClick={() => {
                                                removeMoviefromFavourite({ id: 1, movieId: movie.id })
                                                setFavouriteFeedback(true)
                                            }}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default MyMovies

