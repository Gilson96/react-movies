import React from 'react'
import MovieDetailsList from './MovieDetailsList'
import { Divider } from '@chakra-ui/react'
import AddMoviesToAccount from './AddMoviesToAccount'
import {
    usePostToFavouriteMoviesMutation, usePostToWatchlistMoviesMutation
} from '../../features/Account/accountApi'
import AnimatedButton from '../AnimatedUI/AnimatedButton'
import MovieActors from './MovieActors'
import { useLocation, Link } from 'react-router-dom'
import useScreenSize from '../../features/useScreenSize'
import MobileMovieActors from './MobileMovieActors'
import MovieRecommendations from './MovieRecommendations'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'

const MobileMovieDetails = ({ movieDetails, type }) => {
    const { movieId } = useLocation()
    const [AddToWatchlist] = usePostToWatchlistMoviesMutation()
    const [AddToFavourites] = usePostToFavouriteMoviesMutation()
    const screenSize = useScreenSize()

    return (
        <div className='h-full w-full flex flex-col'>
            <Link to={'/'} className="absolute right-1 top-[0.5rem]">
                <ArrowLeftCircleIcon className='h-10 w-10 text-white hover:text-neutral-500 ' />
            </Link>
            <div
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path}')`,
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',
                }}
                className={`h-[25rem] w-full  flex justify-center items-center`}>

                <div className={`h-[80%] w-[80%] rounded-xl bg-[url(https://image.tmdb.org/t/p/w1280/${movieDetails.poster_path})] bg-center bg-no-repeat bg-cover relative top-[3rem]`}></div>
            </div>

            <div className='w-full h-full p-[3%]'>
                {/* Movie title */}
                <p className='text-neutral-200 mt-[5%] text-3xl font-semibold'>{movieDetails.title || movieDetails.name}</p>

                {/* genres */}
                <div className='flex flex-wrap gap-1 w-full my-[5%]'>
                    {movieDetails.genres.length > 0 ?
                        movieDetails.genres.map(genre =>
                            <AnimatedButton
                                genreName={genre.name} specialStyle={{
                                    backgroundColor: '#e5e5e5'
                                }}
                            />
                        )
                        :
                        'Not Available'
                    }
                </div>

                {/* Divider */}
                <hr className='my-[2%] border-neutral-700' />

                {/* Movie overview */}
                <p className='my-[2%] text-neutral-200 text-lg'>Overview</p>
                <p className='text-neutral-500 text-justify mb-[3%]'>{movieDetails.overview}</p>
                {/* Add movie to account buttons */}
                <AddMoviesToAccount
                    movieDetails={movieDetails}
                    addToWatchlist={AddToWatchlist}
                    addToFavourite={AddToFavourites}

                />

                {/* Divider */}
                <hr className='my-[5%] border-neutral-700' />

                {/* More details */}
                <p className='my-[2%] text-neutral-200 text-lg'>Information</p>

                <div className='flex w-full justify-start gap-4'>
                    {/* Left Column */}
                    <div className='flex flex-col gap-2'>
                        {/* Runtime */}
                        <div className='flex items-center gap-1'>
                            <h1 className='text-base text-neutral-500'>{type === 'movie' ? 'Runtime:' : 'Seasons:'}</h1>
                            <p className='text-neutral-300 text-base font-light'>{type === 'movie' ? movieDetails.runtime > 0 ? movieDetails.runtime + 'min' : 'Not Available' : movieDetails.seasons.length}</p>
                        </div>

                        {/* Status */}
                        <div className='flex items-center gap-1'>
                            <h1 className='text-base text-neutral-500'>Status:</h1>
                            <p className='text-neutral-300 text-base font-light'>{movieDetails.status}</p>
                        </div>

                        {/* Langugage */}
                        <div className='flex items-center gap-1'>
                            <h1 className='text-base text-neutral-500'>Language:</h1>
                            <p className='text-neutral-300 text-base font-light'>{movieDetails.spoken_languages <= 0 ? 'Not Available' : movieDetails.spoken_languages.slice(0, 2).map(language => language.english_name).join('/')}</p>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-1'>
                            <h1 className='text-base text-neutral-500'>Year:</h1>
                            <p className='text-neutral-300 text-base font-light'>
                                {type === 'movie' ? movieDetails.release_date.slice(0, 4) : movieDetails.first_air_date.slice(0, 4)}
                            </p>
                        </div>

                        {/* Country */}
                        <div className='flex items-center gap-1'>
                            <h1 className='text-base text-neutral-500 '>Country:</h1>
                            {movieDetails.origin_country.map(flag => (
                                <img src={`https://flagsapi.com/${flag}/flat/24.png`} alt='#' />
                            ))}
                        </div>

                        <div className='flex flex-col gap-1'>
                            {/* Votes */}
                            <div className='flex items-center gap-1'>
                                <h1 className='text-base text-neutral-500 '>Votes:</h1>
                                <p className='text-neutral-300 text-base font-light'>{movieDetails.vote_average.toFixed(1)}<span className='italic text-sm'>{'(' + movieDetails.vote_count + ' votes)'}</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className='my-[5%] border-neutral-700' />

                {/* Actors */}
                <p className='my-[2%] text-neutral-200 text-lg'>Actors</p>
                <MobileMovieActors movieId={movieDetails.id} type={type} screenSize={screenSize} />

                {/* Divider */}
                <hr className='my-[5%] border-neutral-700' />

                {/* Recommendations */}
                <p className='my-[2%] text-neutral-200 text-lg'>Recommendations</p>
                <MovieRecommendations
                    movieId={movieDetails.id}
                    type={type}
                    slidesPerView={1.5}
                    spaceBetween={30}
                />

            </div>

        </div>
    )
}

export default MobileMovieDetails