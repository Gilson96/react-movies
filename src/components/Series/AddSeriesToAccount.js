import { EyeIcon, HeartIcon } from '@heroicons/react/24/outline'
import { Alert, AlertIcon } from '@chakra-ui/react'
import { useState } from 'react'

const AddSeriesToAccount = ({ addToWatchlist, addToFavourite, addToRated, eyeIcon, heartIcon, starIcon, serieDetails, account }) => {
    const [watchlistFeedback, setWatchlistFeedback] = useState()
    const [favouriteFeedback, setFavouriteFeedback] = useState()
    const newSerieDetails = { id: Math.floor(Math.random() * 101), serieDetails }

    const handleIfSerieExistInWatchlist = () => {
        return account.map(account => account.watchlistSeries.some(serie => serie.id === serieDetails.id))
    }

    const handleIfSerieExistInFavourites = () => {
        return account.map(account => account.favouriteSeries.some(serie => serie.id === serieDetails.id))
    }

    console.log(newSerieDetails)

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
                    className={`flex flex-col justify-center items-center ${!handleIfSerieExistInWatchlist()[0] ? 'cursor-pointer' : ''}`}
                    onClick={() => {
                        return !handleIfSerieExistInWatchlist()[0] ?
                            <>
                                {addToWatchlist({ id: 1, body: newSerieDetails })}
                                {setWatchlistFeedback(true)}
                            </>
                            :
                            ''
                    }}
                >
                    {handleIfSerieExistInWatchlist()[0] ? <EyeIcon
                        className='h-10 w-10 fill-green-400' /> : <EyeIcon
                        className='h-10 w-10 text-green-400 hover:text-green-500 hover:fill-green-400'
                    />}

                    <p className='text-white font-semibold'>{!handleIfSerieExistInWatchlist()[0] ? 'Watchlist' : 'Watchlisted'}</p>
                </div>

                <div
                    className={`flex flex-col justify-center items-center ${!handleIfSerieExistInFavourites()[0] ? 'cursor-pointer' : ''}`}
                    onClick={() => {
                        return !handleIfSerieExistInFavourites()[0] ?
                            <>
                                {addToFavourite({ id: 1, body: newSerieDetails })}
                                {setFavouriteFeedback(true)}
                            </>
                            :
                            ''
                    }}
                >
                    {handleIfSerieExistInFavourites()[0] ? <HeartIcon
                        className='h-10 w-10 fill-red-400' /> : <HeartIcon
                        className='h-10 w-10 text-red-400 hover:text-red-500 hover:fill-red-400'
                    />}

                    <p className='text-white font-semibold'>{!handleIfSerieExistInFavourites()[0] ? 'Favourite' : 'Favourited'}</p>
                </div>
            </div>
        </div>
    )
}

export default AddSeriesToAccount