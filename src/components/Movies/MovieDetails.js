import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useGetMovieDetailsQuery } from '../../features/Movies/allMoviesApi';
import MovieActors from './MovieActors';
import MovieRecommendations from './MovieRecommendations';
import {
  usePostToFavouriteMoviesMutation,
  usePostToWatchlistMoviesMutation,
} from '../../features/Account/accountApi'
import useScreenSize from '../../features/useScreenSize'
import MovieDetailsHero from './MovieDetailsHero';
import MovieDetailsHeroFallback from '../Fallback/MovieDetailsHeroFallback';

const MovieDetails = () => {
  let { movieId } = useParams();
  let { state } = useLocation();
  let newMovieId = parseInt(movieId)
  const { data: movieDetails = [], isLoading } = useGetMovieDetailsQuery({ id: newMovieId, type: state })
  const screenSize = useScreenSize()


  return (
    <div className='flex flex-col h-full w-full'>
      <>
        {/* Movie Details hero */}
        {isLoading ?
          <MovieDetailsHeroFallback />
          :
          <MovieDetailsHero movieDetails={movieDetails} type={state} />
        }
      </>
    </div >
  )
}

export default MovieDetails
