import { useState } from 'react'
import useScreenSize from '../../features/useScreenSize'
import { useParams } from 'react-router-dom'
import { useGetAccountDetailsQuery } from '../../features/Account/accountApi';
import AnimatedButton from '../AnimatedUI/AnimatedButton'

const AddMoviesToAccount = ({ addToWatchlist, addToFavourite, movieDetails }) => {
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

        <div className='w-full h-full flex justify-between items-end'>
            {/* {watchlistFeedback &&
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
                } */}

            <div
                className={`h-[57px] border w-1/2 border-neutral-700 bg-neutral-800 flex justify-center items-center`}
                onClick={() => {
                    return !handleIfMovieExistInWatchlist().includes('exist') &&
                        <>
                            {addToWatchlist({ id: 1, body: newMovieDetails })}
                            {setWatchlistFeedback(true)}
                        </>
                }
                }
            >
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