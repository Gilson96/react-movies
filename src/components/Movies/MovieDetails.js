import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useGetMovieDetailsQuery } from '../../features/Movies/allMoviesApi';
import useScreenSize from '../../features/useScreenSize'
import MovieDetailsHero from './MovieDetailsHero';
import MobileMovieDetails from '../MobileView/MobileMovieDetails';
import BarLoader from '../UI/BarLoader';

const MovieDetails = () => {
  // get id from url
  let { movieId } = useParams();
  // get data from link
  let { state } = useLocation();
  // convert id from url to a integer
  // As it comes as a sting
  let newMovieId = parseInt(movieId)
  // Get data from API
  const { data: movieDetails = [], isLoading } = useGetMovieDetailsQuery({ id: newMovieId, type: state })
  const screenSize = useScreenSize()

  return (
    <div className='flex flex-col h-full w-full'>
      <>
        {screenSize.width > 700 ?
          // Movie Details for desktop
          (isLoading ?
            <BarLoader />
            :
            <MovieDetailsHero movieDetails={movieDetails} type={state} />
          )
          :
          // Movie Details for mobile
          (isLoading ?
            <BarLoader />
            :
            <MobileMovieDetails movieDetails={movieDetails} type={state} />
          )
        }

      </>
    </div >
  )
}

export default MovieDetails
