import { useState } from 'react'
import Card from '../Card'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import { Link } from "react-router-dom";
import { CircularProgress, Alert, AlertIcon } from '@chakra-ui/react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useRemoveFavouriteSeriesMutation, useRemoveWatchlistSeriesMutation, useGetAccountDetailsQuery } from '../../features/Account/accountApi'

const MySeries = () => {
    const { data: account, isLoading } = useGetAccountDetailsQuery()
    const [removeSeriefromWatchlist] = useRemoveWatchlistSeriesMutation()
    const [removeSeriefromFavourite] = useRemoveFavouriteSeriesMutation()
    const [watchlistFeedback, setWatchlistFeedback] = useState()
    const [favouriteFeedback, setFavouriteFeedback] = useState()
    const [isActive, setIsActive] = useState('watchlist')

    return (
        <div className='flex flex-col w-full min-h-[38rem] p-[2%]'>
            {isLoading ?
                <div className='flex flex-col w-full h-full justify-center items-center mt-[2%]'>
                    <CircularProgress isIndeterminate size='100px' color='green.300' />
                    <p className='text-white font-bold'>Loading...</p>
                </div>
                :
                <>
                    <div className='flex w-full h-full justify-between text-white'>
                        <p className='text-white font-bold mt-[1%] text-2xl'>My Series</p>
                        <Link to='/'>
                            <ArrowLeftCircleIcon className='w-10 h-10 hover:text-white/75' />
                        </Link>
                    </div>

                    <div className='flex w-full h-full justify-end gap-1 p-[2%]'>

                        {/* Advice */}
                        <div className='absolute w-[30%] left-[2rem] top-[7rem]'>
                            <p className='italic'>(refresh to see movie if added)</p>
                        </div>

                        {/* Watchlist and favourites toggle */}
                        <div
                            onClick={() => { setIsActive('watchlist') }}
                            className={`flex justify-center items-center rounded-full h-[2rem] tablet:w-[15%] tablet:p-[3%] laptop:w-[10%] laptop:p-[2%] cursor-pointer ${isActive === 'watchlist' ? 'bg-white' : 'bg-white/40'}`}
                        >
                            <p>Watchlist</p>
                        </div>
                        <div
                            onClick={() => { setIsActive('favourite') }}
                            className={`flex h-[2rem] justify-center items-center rounded-full cursor-pointer tablet:w-[15%] tablet:p-[3%] laptop:w-[10%] laptop:p-[2%]  ${isActive === 'favourite' ? 'bg-white' : 'bg-white/40'}`}
                        >
                            <p>Favourite</p>
                        </div>
                    </div>

                    {/* Watchlist Series */}
                    <div className='flex w-full h-full gap-[1rem]'>
                        {
                            isActive === 'watchlist' &&
                            account.map(account => account.watchlistSeries.map(serie =>
                                <div className='flex flex-col'>

                                    {/* Feedback */}
                                    {watchlistFeedback &&
                                        <div className='absolute w-[30%] left-[2rem] top-[7rem] z-10'>
                                            <Alert status='success' className='rounded-xl'>
                                                <AlertIcon />
                                                Your serie was removed to the Watchlist sucessfully! Refresh to see the magic
                                            </Alert>
                                        </div>
                                    }
                                    <div className='flex items-end'>
                                        <Card
                                            image={`https://image.tmdb.org/t/p/w342/${serie.serieDetails.poster_path}`}
                                            title={<p className='text-white'>{serie.serieDetails.name}</p>}
                                            getId={serie.id}
                                            navigate={true}
                                        />
                                        <TrashIcon
                                            className='h-5 w-5 relative -bottom-[10%] right-[10%] text-red-300 cursor-pointer'
                                            onClick={() => {
                                                removeSeriefromWatchlist({ id: 1, serieId: serie.id })
                                                setWatchlistFeedback(true)
                                            }}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* Favourites Series */}
                    <div className='flex w-full h-full gap-[1rem]'>
                        {
                            isActive === 'favourite' &&
                            account.map(account => account.favouriteSeries.map(serie =>
                                <div className='flex flex-col'>

                                    {/* Feedback */}
                                    {favouriteFeedback &&
                                        <div className='absolute w-[30%] left-[2rem] top-[7rem] z-10'>
                                            <Alert status='success' className='rounded-xl'>
                                                <AlertIcon />
                                                Your serie was removed to the Favourite sucessfully! Refresh to see the magic
                                            </Alert>
                                        </div>
                                    }
                                    <div className='flex items-end'>
                                        <Card
                                            image={`https://image.tmdb.org/t/p/w342/${serie.serieDetails.poster_path}`}
                                            title={<p className='text-white'>{serie.serieDetails.name}</p>}
                                            getId={serie.id}
                                            navigate={true}
                                        />
                                        <TrashIcon
                                            className='h-5 w-5 relative -bottom-[10%] right-[10%] text-red-300 cursor-pointer'
                                            onClick={() => {
                                                removeSeriefromFavourite({ id: 1, serieId: serie.id })
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

export default MySeries

