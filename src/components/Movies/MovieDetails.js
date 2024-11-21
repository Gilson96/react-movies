import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import { useGetMovieDetailsQuery } from '../../features/Movies/allMoviesApi';
import { ArrowLeftCircleIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/solid'
import MovieActors from './MovieActors';
import MovieDetailsList from './MovieDetailsList';
import MovieRecommendations from './MovieRecommendations';
import MovieCompanies from './MovieCompanies';
import AddToAccount from './AddMoviesToAccount'
import {
  usePostToFavouriteMoviesMutation,
  usePostToWatchlistMoviesMutation,
} from '../../features/Account/accountApi'
import { useGetAccountDetailsQuery } from '../../features/Account/accountApi';
import { FilmIcon } from '@heroicons/react/24/outline';
import useScreenSize from '../../features/useScreenSize'
import { StarIcon } from '@heroicons/react/24/solid';

const MovieDetails = () => {
  let { movieId } = useParams();
  let { state } = useLocation();
  let newMovieId = parseInt(movieId)
  const { data: movieDetails = [], isLoading } = useGetMovieDetailsQuery({ id: newMovieId, type: state })
  const [addToFavourite] = usePostToFavouriteMoviesMutation()
  const [addToWatchlist] = usePostToWatchlistMoviesMutation()
  const screenSize = useScreenSize()

  if (isLoading) return <p>Loading</p>
  return (
    <div className='flex flex-col h-full w-full'>

      <>
        {/* Movie Hero Image */}
        {movieDetails.backdrop_path ?
          <div
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
            className={`flex h-[32rem] w-full`}
          >
            <Link to='/'>
              <ArrowLeftCircleIcon className='w-10 h-10 absolute right-[2rem] top-[1rem] text-white hover:text-white/50' />
            </Link>

            <div className='w-full h-full flex flex-col justify-end px-[3%] py-[1%] gap-3'>
              <p className='text-3xl text-white font-bold'>{movieDetails.title || movieDetails.name}</p>
              <div className='flex gap-1 items-center'>
                <i><StarIcon className='w-5 h-5 text-yellow-400' /></i>
                <p className='text-white text-lg'>{movieDetails.vote_average.toFixed(1)}/10</p>
              </div>
              <div className={`flex gap-1 mb-[1%] ${screenSize.width < 700 && 'flex-wrap'}`}>
                {movieDetails.genres.map(genre => (
                  <div className={`border border-[#F6F7EB] rounded-full flex justify-center items-center ${screenSize.width < 700 ? 'py-2 px-3' : 'py-3 px-5'} `}>
                    <p className={`text-[#F6F7EB] font-bold ${screenSize.width < 700 && 'text-xs'}`}> {genre.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          :
          // Fallback
          <div
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
            className={`flex flex-col justify-end h-[32rem] w-full`}
          >
            <Link to='/'>
              <ArrowLeftCircleIcon className='w-10 h-10 absolute right-[2rem] top-[1rem] text-white hover:text-white/50' />
            </Link>

          </div>
        }

        {/* Movie overview and Add to account */}
        <div className={`w-full ${screenSize.width < 700 ? 'flex flex-col' : 'flex justify-between'} px-[3%] py-[1%] my-[2%]`}>
          <div className={`${screenSize.width > 700 ? 'w-[50%]' : 'w-full text-justify my-[4%]'}`}>
            <p className='text-white font-bold text-lg'>Overview</p>
            <p className='text-white'>{movieDetails.overview}</p>
          </div>
          <div>
            <AddToAccount
              movieDetails={movieDetails}
              addToWatchlist={addToWatchlist}
              addToFavourite={addToFavourite}
              eyeIcon={<EyeIcon className='h-10 w-10 text-green-400' />}
              heartIcon={<HeartIcon className='h-10 w-10 text-red-400' />}
            />
          </div>
        </div>

        {/* Actors and movie information*/}
        <div className={`${screenSize.width < 700 ? 'flex flex-col' : 'flex justify-between'} w-full mt-[2%] px-[3%] py-[1%]`}>
          <div className={`${screenSize.width < 700 ? 'w-full my-[3%]' : 'w-[50%]'} `}>
            <p className='text-xl text-white font-bold'>Actors</p>
            {screenSize.width < 1000 ?
              <MovieActors
                movieId={movieId}
                type={state}
                slidesPerView={3}
                spaceBetween={10}
              />
              :
              <MovieActors
                movieId={movieId}
                type={state}
                slidesPerView={5}
                spaceBetween={10}
              />
            }
          </div>
          <div className='flex w-auto h-auto'>
            <MovieDetailsList movieDetails={movieDetails} type={state} />
          </div>
        </div>

        {/* Recommendations */}
        <div className='mt-[2%] px-[3%] py-[1%]'>
          <p className='text-xl text-white font-bold'>Recommendations</p>
          {screenSize.width < 1000 ?
            <MovieRecommendations
              movieId={movieId}
              type={state}
              slidesPerView={2}
              spaceBetween={10}
            />
            :
            <MovieRecommendations
              movieId={movieId}
              type={state}
              slidesPerView={5}
              spaceBetween={10}
            />
          }
        </div>
      </>
    </div>
  )
}

export default MovieDetails
