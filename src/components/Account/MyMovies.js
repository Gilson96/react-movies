import { useState } from 'react'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import { Link, useParams, useLocation } from "react-router-dom";
import { Alert, AlertIcon } from '@chakra-ui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
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
    const [watchlistFeedback, setWatchlistFeedback] = useState()
    const [favouriteFeedback, setFavouriteFeedback] = useState()
    const [isActive, setIsActive] = useState('watchlist')

    return (
        <div className={`flex flex-col w-full h-screen p-[2%]`}>
            <>
                <div className='flex justify-between text-white'>
                    <p className={`text-white font-bold mt-[1%] ${screenSize.width < 700 ? 'text-lg' : 'text-2xl'} `}>My Movies</p>
                    <Link to='/'>
                        <ArrowLeftCircleIcon className={`${screenSize.width < 700 ? 'w-[2rem] h-[2rem]' : 'w-10 h-10'} hover:text-white/75`} />
                    </Link>
                </div>

                <div className={`flex justify-end gap-1 p-[2%]`}>

                    {/* Advice */}
                    <div className={`w-full ${screenSize.width > 700 && 'mt-[2%]'}`}>
                        <p className={`italic text-slate-400 ${screenSize.width < 700 && 'text-xs'}`}>(refresh to see movie if added)</p>
                    </div>

                    {/* Watchlist and favourites toggle */}
                    <Toggle isActive={isActive} setIsActive={setIsActive}/>
                </div>

                {/* Watchlist Movies */}

                {/* Fallback */}
                {isLoading ?
                    <Box padding='6' boxShadow='lg' className={`${screenSize.width < 700 ? ' w-[7rem] h-[10rem]' : ' w-[15rem] h-[20rem]'} rounded-3xl border`}>
                        <SkeletonText mt='4' noOfLines={screenSize.width < 700 ? 4 : 10} spacing='4' skeletonHeight='2' />
                    </Box>
                    :
                    <>
                        {isActive === 'watchlist' &&
                            <div className={`flex flex-wrap w-full h-full gap-[1rem] ${screenSize.width < 700 ? 'justify-center mt-[3%]' : ''}`}>
                                {account.map(account => account.watchlistMovies.map(movie =>

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
                                        <div className={`w-full h-full flex items-start`}>
                                            <Link to={`/movies/${movie.movieDetails.id}`} state={state}>
                                                <div
                                                    style={{
                                                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url('https://image.tmdb.org/t/p/w1280/${movie.movieDetails.backdrop_path}')`
                                                    }}
                                                    className={`${screenSize.width < 700 ? 'h-[10rem] w-[7rem]' : 'h-[15rem] w-[12rem]'}  gap-1 rounded-lg bg-no-repeat bg-cover bg-center`}
                                                >
                                                    <div className='h-full w-full flex flex-col items-start hover:bg-[rgb(0,0,0,0.5)] justify-end rounded-lg p-[3%]'>
                                                        <p className={`${screenSize.width < 700 && 'text-xs'} text-white font-bold`}>{movie.movieDetails.title || movie.movieDetails.name}</p>

                                                    </div>
                                                </div>
                                            </Link>
                                            <XMarkIcon
                                                className={`h-5 w-5 relative ${screenSize.width < 700 ? 'top-[1%]' : 'top-[1%]'}  text-red-300 cursor-pointer`}
                                                onClick={() => {
                                                    removeMoviefromWatchlist({ id: 1, movieId: movie.id })
                                                    setWatchlistFeedback(true)
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }


                        {isActive === 'favourite' &&
                            <div className={`flex flex-wrap w-full h-full gap-[1rem] ${screenSize.width < 700 ? 'justify-center mt-[3%]' : 'justify-start'}`}>
                                {account.map(account => account.favouriteMovies.map(movie =>

                                    <div className='flex flex-col'>
                                        {/* Feedback */}
                                        {favouriteFeedback &&
                                            <div className='absolute w-[30%] left-[2rem] top-[7rem] z-10'>
                                                <Alert status='success' className='rounded-xl'>
                                                    <AlertIcon />
                                                    Your movie was removed to the Watchlist sucessfully! Refresh to see the magic
                                                </Alert>
                                            </div>
                                        }
                                        <div className={`w-full h-full flex items-start`}>
                                            <Link to={`/movies/${movie.movieDetails.id}`} state={state}>
                                                <div
                                                    style={{
                                                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url('https://image.tmdb.org/t/p/w1280/${movie.movieDetails.backdrop_path}')`
                                                    }}
                                                    className={`${screenSize.width < 700 ? 'h-[10rem] w-[7rem]' : 'h-[15rem] w-[12rem]'}  gap-1 rounded-lg bg-no-repeat bg-cover bg-center`}
                                                >
                                                    <div className='h-full w-full flex flex-col items-start hover:bg-[rgb(0,0,0,0.5)] justify-end rounded-lg p-[3%]'>
                                                        <p className={`${screenSize.width < 700 && 'text-xs'} text-white font-bold`}>{movie.movieDetails.title || movie.movieDetails.name}</p>

                                                    </div>
                                                </div>
                                            </Link>
                                            <XMarkIcon
                                                className={`h-5 w-5 relative ${screenSize.width < 700 ? 'top-[1%]' : 'top-[1%]'}  text-red-300 cursor-pointer`}
                                                onClick={() => {
                                                    removeMoviefromFavourite({ id: 1, movieId: movie.id })
                                                    setFavouriteFeedback(true)
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </>
                }
            </>
        </div >
    )
}

export default MyMovies

