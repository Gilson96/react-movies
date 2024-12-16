import { useState } from 'react'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import { Link, useParams, useLocation } from "react-router-dom";
import { Alert, AlertIcon, Tooltip } from '@chakra-ui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useRemoveWatchlistMoviesMutation, useRemoveFavouriteMoviesMutation, useGetAccountDetailsQuery } from '../../features/Account/accountApi'
import useScreenSize from '../../features/useScreenSize'
import { SkeletonText, Box } from '@chakra-ui/react'
import Toggle from '../UI/Toggle';
import AnimatedButton from '../AnimatedUI/AnimatedButton';

const MyMovies = () => {
    const { data: account, isLoading } = useGetAccountDetailsQuery()
    let { state } = useLocation();
    const screenSize = useScreenSize()
    const [removeMoviefromWatchlist] = useRemoveWatchlistMoviesMutation()
    const [removeMoviefromFavourite] = useRemoveFavouriteMoviesMutation()
    const [watchlistFeedback, setWatchlistFeedback] = useState()
    const [favouriteFeedback, setFavouriteFeedback] = useState()
    const [isActive, setIsActive] = useState('watchlist')
    const [mouseHover, setMouseHover] = useState()

    console.log(account)
    return (
        <div className={`flex flex-col w-full min-h-screen p-[2%]`}>
            <>
                <div className='flex justify-between text-white'>
                    <p className={`text-white font-bold mt-[1%] ${screenSize.width < 700 ? 'text-lg' : 'text-2xl'} `}>My Movies</p>
                    <Link to='/'>
                        <ArrowLeftCircleIcon className={`${screenSize.width < 700 ? 'w-[2rem] h-[2rem]' : 'w-10 h-10'} hover:text-white/75`} />
                    </Link>
                </div>

                <div className={`flex w-full justify-between items-center gap-1 my-[2%]`}>

                    {/* Advice */}
                    <div className={`w-full ${screenSize.width > 700 && 'mt-[2%]'}`}>
                        <p className={`italic text-slate-400 ${screenSize.width < 700 && 'text-[0.5rem]'}`}>(refresh to see movie if added)</p>
                    </div>

                    {/* Watchlist and favourites toggle */}
                    <Toggle isActive={isActive} setIsActive={setIsActive} />
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
                            <div className={`flex flex-wrap w-full h-full gap-[1rem] ${screenSize.width < 700 ? ' mt-[3%]' : ''}`}>
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

                                        {/* movies */}
                                        <div className={`w-full h-full flex items-start`}>
                                            <Link to={`/movies/${movie.movieDetails.id}`} state={state = (movie.movieDetails.runtime ? 'movie' : 'tv')}>
                                                <div
                                                    onMouseOver={() => setMouseHover(movie.id)}
                                                    onMouseLeave={() => setMouseHover(false)}
                                                    className={`flex flex-col ${screenSize.width < 700 ? 'h-[9rem] w-[5rem]' : 'h-[18rem] w-[12rem]'}  items-start justify-end gap-1 rounded-lg bg-[url(https://image.tmdb.org/t/p/w1280/${movie.movieDetails.poster_path})]  bg-center bg-no-repeat bg-cover`}
                                                >
                                                    {mouseHover === movie.id &&
                                                        <div
                                                            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))` }}
                                                            className='h-full w-full flex flex-col justify-center items-center gap-2'
                                                        >
                                                            <p className={`text-white w-full text-center ${screenSize.width < 700 ? 'text-sm' : 'text-xl'} font-bold`}>{movie.movieDetails.title || movie.movieDetails.name}</p>

                                                            <div className="w-full flex justify-center items-center p-[2%] ">
                                                                <AnimatedButton genreName={'More Details'} specialStyle={{
                                                                    backgroundColor: '#e5e5e5',
                                                                    color: '#262626',
                                                                    fontSize: 0.7 + 'rem',
                                                                    paddingTop: 0.8 + 'rem',
                                                                    paddingBottom: 0.8 + 'rem',
                                                                    width: 8 + 'rem'

                                                                }} />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </Link>
                                            <Tooltip label='Remove'>
                                                <XMarkIcon
                                                    className={`h-5 w-5 relative ${screenSize.width < 700 ? 'top-[1%]' : 'top-[1%]'}  text-red-300 cursor-pointer hover:text-red-500`}
                                                    onClick={() => {
                                                        removeMoviefromWatchlist({ id: 1, movieId: movie.id })
                                                        setWatchlistFeedback(true)
                                                    }}
                                                />
                                            </Tooltip>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }


                        {/* Favourites Movies */}
                        {isActive === 'favourite' &&
                            <div className={`flex flex-wrap w-full h-full gap-[1rem] ${screenSize.width < 700 ? ' mt-[3%]' : 'justify-start'}`}>
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
                                            <Link to={`/movies/${movie.movieDetails.id}`} state={state = (movie.movieDetails.runtime ? 'movie' : 'tv')}>
                                            <div
                                                    onMouseOver={() => setMouseHover(movie.id)}
                                                    onMouseLeave={() => setMouseHover(false)}
                                                    className={`flex flex-col ${screenSize.width < 700 ? 'h-[9rem] w-[5.5rem]' : 'h-[18rem] w-[12rem]'}  items-start justify-end gap-1 rounded-lg bg-[url(https://image.tmdb.org/t/p/w1280/${movie.movieDetails.poster_path})]  bg-center bg-no-repeat bg-cover`}
                                                >
                                                    {mouseHover === movie.id &&
                                                        <div
                                                            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))` }}
                                                            className='h-full w-full flex flex-col justify-center items-center gap-2'
                                                        >
                                                            <p className={`text-white w-full text-center $j#{screenSize.width < 700 ? 'text-sm' : 'text-xl'} font-bold`}>{movie.movieDetails.title || movie.movieDetails.name}</p>

                                                            <div className="w-full flex justify-center items-center p-[2%] ">
                                                                <AnimatedButton genreName={'More Details'} specialStyle={{
                                                                    backgroundColor: '#e5e5e5',
                                                                    color: '#262626',
                                                                    fontSize: 0.7 + 'rem',
                                                                    paddingTop: 0.8 + 'rem',
                                                                    paddingBottom: 0.8 + 'rem',
                                                                    width: 8 + 'rem'

                                                                }} />
                                                            </div>
                                                        </div>
                                                    }
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

