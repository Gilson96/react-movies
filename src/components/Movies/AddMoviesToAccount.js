import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetAccountDetailsQuery } from '../../features/Account/accountApi';
import AnimatedButton from '../AnimatedUI/AnimatedButton'
import {
    Alert,
    AlertIcon,
} from '@chakra-ui/react'

const AddMoviesToAccount = ({ addToWatchlist, addToFavourite, movieDetails }) => {
    // Get data from my API
    const { data: account = [], isLoading } = useGetAccountDetailsQuery()
    // Get id from url
    const { movieId } = useParams()
    // state to show feedback
    const [watchlistFeedback, setWatchlistFeedback] = useState()
    const [favouriteFeedback, setFavouriteFeedback] = useState()
    // object to add the movie into my API
    const newMovieDetails = { id: Math.floor(Math.random() * 101), movieDetails }

    // Checks if movie exist in Watchlist
    const handleIfMovieExistInWatchlist = () => {
        let movieExist = []

        for (let i = 0; i < account[0].watchlistMovies.length; i++) {

            if (account.some(account => account.watchlistMovies[i].movieDetails.id === parseInt(movieId))) {
                movieExist.push('exist')
            }
        }
        return movieExist
    }

    // Checks if movie exist in Favourites
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

        <div className='w-full h-full flex justify-between items-end'>
            {/*if true show feedback  */}
            {watchlistFeedback &&
                <div className='absolute w-[30%] top-0 z-[999999]'>
                    <Alert status='success' className='rounded-xl'>
                        <AlertIcon />
                        <p className='text-black'>Your movie was added to the Watchlist sucessfully! Refresh
                        </p>
                    </Alert>
                </div>
            }
            {favouriteFeedback &&
                <div className='absolute w-[30%] top-0 z-[999999]'>
                    <Alert status='success' className='rounded-xl'>
                        <AlertIcon />
                        <p className='text-black'>Your movie was added to the Favourites sucessfully! Refresh
                        </p>
                    </Alert>
                </div>
            }

            {/* Wrapper */}
            <div
                className={`h-[57px] border w-1/2 border-neutral-700 bg-neutral-800 flex justify-center items-center`}
                onClick={() => {
                    // if movie doesn't exist in Watchlist, add him
                    return !handleIfMovieExistInWatchlist().includes('exist') &&
                        <>
                            {addToWatchlist({ id: 1, body: newMovieDetails })}
                            {setWatchlistFeedback(true)}
                        </>
                }
                }
            >
                {/* if exist disable the button */}
                {handleIfMovieExistInWatchlist().includes('exist') ?
                    <AnimatedButton
                        specialStyle={{
                            border: 'none',
                            width: 100 + '%',
                            height: 100 + '%',
                            display: 'flex',
                            justifyContent: 'justify-center',
                            alignItems: 'center',
                            borderRadius: 0,
                            backgroundColor: '#d4d4d4',
                            color: '#404040',
                            borderRight: 0.25 + 'px solid #404040'

                        }}
                        genreName={'Watchlisted'}
                    />
                    :
                    //  if doens't exist enable the button 
                    <AnimatedButton
                        specialStyle={{
                            border: 'none',
                            width: 100 + '%',
                            height: 100 + '%',
                            display: 'flex',
                            justifyContent: 'justify-center',
                            alignItems: 'center',
                            borderRadius: 0,
                            color: '#ffffff'
                        }}
                        genreName={'Add to Watchlist'}
                    />
                }
            </div>

            <div
                className={`h-[57px] border w-1/2 text-wh border-neutral-700 bg-neutral-800 flex justify-center items-center`}
                onClick={() => {
                    return !handleIfMovieExistInFavourites().includes('exist') &&
                        <>
                            {addToFavourite({ id: 1, body: newMovieDetails })}
                            {setFavouriteFeedback(true)}
                        </>
                }
                }
            >
                {handleIfMovieExistInFavourites().includes('exist') ?
                    <AnimatedButton
                        specialStyle={{
                            border: 'none',
                            width: 100 + '%',
                            height: 100 + '%',
                            display: 'flex',
                            justifyContent: 'justify-center',
                            alignItems: 'center',
                            borderRadius: 0,
                            backgroundColor: '#d4d4d4',
                            color: '#404040',
                            borderLeft: 0.25 + 'px solid #404040'
                        }}
                        genreName={'Favourited'}
                    />
                    :
                    <AnimatedButton
                        specialStyle={{
                            border: 'none',
                            width: 100 + '%',
                            height: 100 + '%',
                            display: 'flex',
                            justifyContent: 'justify-center',
                            alignItems: 'center',
                            borderRadius: 0,
                            color: '#ffffff'
                        }}
                        genreName={'Add to Favourites'}
                    />
                }
            </div>

        </div>
    )
}

export default AddMoviesToAccount