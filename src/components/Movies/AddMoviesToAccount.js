import { useState } from 'react'
import { EyeIcon, HeartIcon } from '@heroicons/react/24/outline'
import { Alert, AlertIcon } from '@chakra-ui/react'
import useScreenSize from '../../features/useScreenSize'
import { useParams } from 'react-router-dom'
import { useGetAccountDetailsQuery } from '../../features/Account/accountApi';
import { Tooltip } from '@chakra-ui/react'
const AddMoviesToAccount = ({ addToWatchlist, addToFavourite, addToRated, eyeIcon, heartIcon, starIcon, movieDetails }) => {
    const { data: account = [], isLoading } = useGetAccountDetailsQuery()
    const { movieId } = useParams()
    const screenSize = useScreenSize()
    const [watchlistFeedback, setWatchlistFeedback] = useState()
    const [favouriteFeedback, setFavouriteFeedback] = useState()
    const newMovieDetails = { id: Math.floor(Math.random() * 101), movieDetails }

    if (isLoading) return <p>Loading</p>
    const handleIfMovieExistInWatchlist = () => {
        let movieExist = []

        for (let i = 0; i < account[0].watchlistMovies.length; i++) {

            if (account.some(account => account.watchlistMovies[i].movieDetails.id === parseInt(movieId))) {
                movieExist.push('exist')
            }
        }
        return movieExist
    }

    const handleIfMovieExistInFavourites = () => {
        let movieExist = []

        for (let i = 0; i < account[0].favouriteMovies.length; i++) {

            if (account.some(account => account.favouriteMovies[i].movieDetails.id === parseInt(movieId))) {
                movieExist.push('exist')
            }
        }
        return movieExist
    }

    return (
        <div>
            <div className='flex gap-5 mr-2'>
                {watchlistFeedback &&
                    <div className='absolute w-[30%] right-1'>
                        <Alert status='success' className='rounded-xl'>
                            <AlertIcon />
                            Your movie was added to the Watchlist sucessfully! Refresh to see the magic
                        </Alert>
                    </div>
                }
                {favouriteFeedback &&
                    <div className='absolute w-[30%] right-1'>
                        <Alert status='success' className='rounded-xl'>
                            <AlertIcon />
                            Your movie was added to the Favourites sucessfully! Refresh to see the magic
                        </Alert>
                    </div>
                }
                <Tooltip label={!handleIfMovieExistInWatchlist().includes('exist') ? 'Add to Watchlist' : 'Watchlisted'} aria-label='A tooltip'>
                    <div
                        className={` justify-center items-center ${!handleIfMovieExistInWatchlist().includes('exist') ? 'cursor-pointer' : ''} ${screenSize.width < 700 ? 'flex flex-row w-[50%] border p-2 rounded-lg gap-1' : 'flex flex-col'}`}
                        onClick={() => {
                            return !handleIfMovieExistInWatchlist().includes('exist') ?
                                <>
                                    {addToWatchlist({ id: 1, body: newMovieDetails })}
                                    {setWatchlistFeedback(true)}
                                </>
                                :
                                ''
                        }}
                    >
                        {handleIfMovieExistInWatchlist().includes('exist') ?
                            <EyeIcon className='h-10 w-10 fill-green-400' />
                            :
                            <EyeIcon className='h-10 w-10 text-green-400 hover:text-green-500 hover:fill-green-400' />
                        }

                        <p className='text-white font-semibold'>{!handleIfMovieExistInWatchlist().includes('exist') ? 'Watchlist' : 'Watchlisted'}</p>
                    </div>
                </Tooltip>

                <Tooltip label={!handleIfMovieExistInFavourites().includes('exist') ? 'Add to Favourites' : 'Favourited'} aria-label='A tooltip'>
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
                </Tooltip>
            </div>
        </div>
    )
}

export default AddMoviesToAccount