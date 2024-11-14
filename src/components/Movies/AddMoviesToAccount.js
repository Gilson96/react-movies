import { useState } from 'react'
import { EyeIcon, HeartIcon } from '@heroicons/react/24/outline'
import { Alert, AlertIcon } from '@chakra-ui/react'
import useScreenSize from '../../features/useScreenSize'

const AddMoviesToAccount = ({ addToWatchlist, addToFavourite, addToRated, eyeIcon, heartIcon, starIcon, movieDetails, account }) => {
    const screenSize = useScreenSize()
    const [watchlistFeedback, setWatchlistFeedback] = useState()
    const [favouriteFeedback, setFavouriteFeedback] = useState()
    const newMovieDetails = { id: Math.floor(Math.random() * 101), movieDetails }

    const handleIfMovieExistInWatchlist = () => {
        return account.map(account => account.watchlistMovies.some((movie, index) => movie.id === account.watchlistMovies[index].id))
    }

    const handleIfMovieExistInFavourites = () => {
        return account.map(account => account.favouriteMovies.some((movie, index) => movie.id === account.watchlistMovies[index].id))
    }

    return (
        <div>
            <div className='flex gap-5 mr-2'>
                {watchlistFeedback &&
                    <div className='absolute w-[30%] right-1'>
                        <Alert status='success' className='rounded-xl'>
                            <AlertIcon />
                            Your serie was added to the Watchlist sucessfully! Refresh to see the magic
                        </Alert>
                    </div>
                }
                {favouriteFeedback &&
                    <div className='absolute w-[30%] right-1'>
                        <Alert status='success' className='rounded-xl'>
                            <AlertIcon />
                            Your serie was added to the Favourites sucessfully! Refresh to see the magic
                        </Alert>
                    </div>
                }
                <div
                    className={` justify-center items-center ${!handleIfMovieExistInWatchlist()[0] ? 'cursor-pointer' : ''} ${screenSize.width < 700 ? 'flex flex-row w-[50%] border p-2 rounded-lg gap-1' : 'flex flex-col'}`}
                    onClick={() => {
                        return !handleIfMovieExistInWatchlist()[0] ?
                            <>
                                {addToWatchlist({ id: 1, body: newMovieDetails })}
                                {setWatchlistFeedback(true)}
                            </>
                            :
                            ''
                    }}
                >
                    {handleIfMovieExistInWatchlist()[0] ?
                        <EyeIcon className='h-10 w-10 fill-green-400' />
                        :
                        <EyeIcon className='h-10 w-10 text-green-400 hover:text-green-500 hover:fill-green-400' />
                    }

                    <p className='text-white font-semibold'>{!handleIfMovieExistInWatchlist()[0] ? 'Watchlist' : 'Watchlisted'}</p>
                </div>

                <div
                    className={`justify-center items-center ${!handleIfMovieExistInFavourites()[0] ? 'cursor-pointer' : ''} ${screenSize.width < 700 ? 'flex flex-row w-[50%] border p-2 rounded-lg gap-1' : 'flex flex-col'}`}
                    onClick={() => {
                        return !handleIfMovieExistInFavourites()[0] ?
                            <>
                                {addToFavourite({ id: 1, body: newMovieDetails })}
                                {setFavouriteFeedback(true)}
                            </>
                            :
                            ''
                    }}
                >
                    {handleIfMovieExistInFavourites()[0] ? <HeartIcon
                        className='h-10 w-10 fill-red-400' /> : <HeartIcon
                        className='h-10 w-10 text-red-400 hover:text-red-500 hover:fill-red-400'
                    />}

                    <p className='text-white font-semibold'>{!handleIfMovieExistInFavourites()[0] ? 'Favourite' : 'Favourited'}</p>
                </div>
            </div>
        </div>
    )
}

export default AddMoviesToAccount