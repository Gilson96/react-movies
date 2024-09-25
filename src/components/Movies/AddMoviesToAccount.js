import { useState } from 'react'
import { EyeIcon, HeartIcon } from '@heroicons/react/24/outline'
import { Alert, AlertIcon } from '@chakra-ui/react'

const AddMoviesToAccount = ({ addToWatchlist, addToFavourite, addToRated, eyeIcon, heartIcon, starIcon, movieDetails, account }) => {
    const [watchlistFeedback, setWatchlistFeedback] = useState()
    const [favouriteFeedback, setFavouriteFeedback] = useState()
    const newMovieDetails = { id: Math.floor(Math.random() * 101), movieDetails }

    const handleIfMovieExistInWatchlist = () => {
        return account.map(account => account.watchlistMovies.some(movie => movie.id === movieDetails.id))
    }

    const handleIfMovieExistInFavourites = () => {
        return account.map(account => account.favouriteMovies.some(movie => movie.id === movieDetails.id))
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
                    className={`flex flex-col justify-center items-center ${!handleIfMovieExistInWatchlist()[0] ? 'cursor-pointer' : ''}`}
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
                    {handleIfMovieExistInWatchlist()[0] ? <EyeIcon
                        className='h-10 w-10 fill-green-400' /> : <EyeIcon
                        className='h-10 w-10 text-green-400 hover:text-green-500 hover:fill-green-400'
                    />}

                    <p className='text-white font-semibold'>{!handleIfMovieExistInWatchlist()[0] ? 'Watchlist' : 'Watchlisted'}</p>
                </div>

                <div
                    className={`flex flex-col justify-center items-center ${!handleIfMovieExistInFavourites()[0] ? 'cursor-pointer' : ''}`}
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