import { useState } from 'react'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from "react-router-dom";
import { Alert, AlertIcon } from '@chakra-ui/react'
import { useRemoveWatchlistMoviesMutation, useRemoveFavouriteMoviesMutation, useGetAccountDetailsQuery } from '../../features/Account/accountApi'
import useScreenSize from '../../features/useScreenSize'
import { SkeletonText, Box } from '@chakra-ui/react'
import Toggle from '../UI/Toggle';

const MyMovies = () => {
    const { data: account, isLoading } = useGetAccountDetailsQuery()
    let { state } = useLocation();
    const screenSize = useScreenSize()
    const [removeMoviefromWatchlist] = useRemoveWatchlistMoviesMutation()
    const [removeMoviefromFavourite] = useRemoveFavouriteMoviesMutation()
    const [feedback, setFeedback] = useState(false)
    const [isActive, setIsActive] = useState('watchlist')
    const [mouseHover, setMouseHover] = useState()

    const handleWatchlistOrFavouriteObj = () => {
        if (isActive === 'watchlist') return account[0].watchlistMovies
        if (isActive === 'favourite') return account[0].favouriteMovies
    }

    const handleRemoveMovieFromWatchlistOrFavourite = (data) => {
        if (isActive === 'watchlist') return (removeMoviefromWatchlist({ id: 1, movieId: data.id }), setFeedback('watchlist'))
        if (isActive === 'favourite') return (removeMoviefromFavourite({ id: 1, movieId: data.id }), setFeedback('favourite'))
    }

    return (
        <div className={`flex flex-col w-full min-h-screen p-[2%]`}>
            <>
                {/* Feedback */}
                {feedback &&
                    <div className='w-auto absolute'>
                        <Alert status='success' rounded={'lg'}>
                            <AlertIcon />
                            Movie was successfully removed! Refresh
                        </Alert>
                    </div>
                }

                <div className='flex justify-between text-white'>
                    {/* Title */}
                    <p className={`text-white font-bold mt-[1%] ${screenSize.width < 700 ? 'text-lg' : 'text-2xl'} `}>My Movies</p>

                    {/* link back to home */}
                    <Link to='/'>
                        <ArrowLeftCircleIcon className={`${screenSize.width < 700 ? 'w-[2rem] h-[2rem]' : 'w-10 h-10'} hover:text-white/75`} />
                    </Link>
                </div>

                <div className={`flex justify-between items-center gap-1 py-[1%]`}>

                    {/* Advice */}
                    <div className={`w-full`}>
                        <p className={`italic text-slate-400 text-xs`}>(refresh to see movie if added)</p>
                    </div>

                    {/* Watchlist and favourites toggle */}
                    <Toggle isActive={isActive} setIsActive={setIsActive} />
                </div>


                {/* Fallback */}
                {isLoading ?
                    <Box padding='6' boxShadow='lg' className={`${screenSize.width < 700 ? ' w-[7rem] h-[10rem]' : ' w-[15rem] h-[20rem]'} rounded-3xl border`}>
                        <SkeletonText mt='4' noOfLines={screenSize.width < 700 ? 4 : 10} spacing='4' skeletonHeight='2' />
                    </Box>
                    :
                    <>
                        {/* Wrapper */}
                        <div className={`flex flex-wrap w-full h-full gap-[1rem] ${screenSize.width < 700 ? 'mt-[2%]' : ''}`}>

                            {/* Movies from account */}
                            {handleWatchlistOrFavouriteObj().map((movie, index) =>
                                <div
                                    onMouseOver={() => setMouseHover(movie.movieDetails.id)}
                                    onMouseLeave={() => setMouseHover(false)}
                                    className={`flex flex-col ${screenSize.width > 700 ? 'h-[20rem] w-[12rem]' : 'h-[14rem] w-[10rem]'}  items-start justify-end gap-1 rounded-lg bg-[url(https://image.tmdb.org/t/p/w1280/${movie.movieDetails.poster_path})] bg-center bg-no-repeat bg-cover`}
                                >
                                    {mouseHover === movie.movieDetails.id &&
                                        <div
                                            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))` }}
                                            className='h-full w-full flex flex-col justify-center items-center gap-2'
                                        >
                                            <p className={`text-white w-full text-center ${screenSize.width < 700 ? 'text-xs' : 'text-xl'} font-bold`}>{movie.movieDetails.title || movie.movieDetails.name}</p>
                                            <div className='flex flex-col gap-1'>
                                                <div className="w-full flex justify-center items-center gap-2 p-[2%]">
                                                    <Link
                                                        key={index}
                                                        to={`/movies/${movie.movieDetails.id}`}
                                                        state={state = (movie.movieDetails.runtime ? 'movie' : 'tv')}
                                                        className={`h-auto w-auto p-[10%] bg-neutral-400 text-neutral-800 rounded-xl font-bold ${screenSize.width < 700 && 'text-xs'} hover:bg-neutral-500 hover:underline`}
                                                    >
                                                        <p>Details</p>
                                                    </Link>

                                                    {/* Remove movie from Account */}
                                                    <button
                                                        onClick={() => handleRemoveMovieFromWatchlistOrFavourite(movie)}
                                                        className={`h-auto w-auto p-[10%] bg-neutral-400 text-neutral-800 rounded-xl font-bold ${screenSize.width < 700 && 'text-xs'} hover:bg-neutral-500 hover:underline`}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            )}
                        </div>
                    </>
                }
            </>
        </div >
    )
}

export default MyMovies

