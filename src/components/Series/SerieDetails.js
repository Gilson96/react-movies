import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useGetSerieDetailsQuery } from '../../features/Series/allSeriesApi';
import { ArrowLeftCircleIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/outline'
import SerieActors from './SerieActors';
import SerieDetailsList from './SerieDetailsList';
import SerieRecommendations from './SerieRecommendations';
import SerieCompanies from './SerieCompanies';
import AddToAccount from './AddSeriesToAccount'
import {
  usePostToFavouriteSeriesMutation,
  usePostToWatchlistSeriesMutation,
} from '../../features/Account/accountApi'
import { useGetAccountDetailsQuery } from '../../features/Account/accountApi';
import { FilmIcon } from '@heroicons/react/24/outline';
import useScreenSize from '../../features/useScreenSize'
import { CircularProgress } from '@chakra-ui/react'

const SerieDetails = () => {
  let { serieId } = useParams();
  const { data: serieDetails = [], isLoading } = useGetSerieDetailsQuery(parseInt(serieId))
  const [addToFavourite] = usePostToFavouriteSeriesMutation()
  const [addToWatchlist] = usePostToWatchlistSeriesMutation()
  const { data: account = [] } = useGetAccountDetailsQuery()
  const screenSize = useScreenSize()

  console.log(account)
  return (
    <div className='flex flex-col h-full w-full'>

      {isLoading ?
        <CircularProgress isIndeterminate color='green.300' />
        :
        <>
          {/* // Serie Hero Image */}
          {serieDetails.backdrop_path ?
            <div
              style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://image.tmdb.org/t/p/w1280/${serieDetails.backdrop_path}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
              className={`flex h-[32rem] w-full`}
            >
              <Link to='/'>
                <ArrowLeftCircleIcon className='w-10 h-10 absolute right-[2rem] top-[1rem] text-white hover:text-white/50' />
              </Link>
              <div className={`relative top-[28rem] bg-background w-full h-[5rem] blur-sm`}></div>
            </div>
            :
            // Fallback
            <div
              style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://image.tmdb.org/t/p/w1280/${serieDetails.backdrop_path}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
              className={`flex h-[32rem] w-full`}
            >
              <div className='flex absolute items-center top-[10%] left-[25%] text-white'>
                <p className='font-bold tablet:text-5xl laptop:text-[5rem]'>React-Movies</p>
                <FilmIcon className='tablet:w-[5rem] tablet:h-[5rem] laptop:w-[8rem] laptop:h-[8rem]' />
              </div>
              <Link to='/'>
                <ArrowLeftCircleIcon className='w-10 h-10 absolute right-[2rem] top-[1rem] text-white hover:text-white/50' />
              </Link>
              <div className={`relative top-[28rem] bg-background w-full h-[5rem] blur-sm`}></div>
            </div>
          }

          {/* Serie title and genres */}
          <div className='flex flex-col p-[2%]'>
            <div className='flex flex-col absolute top-[18rem] gap-3'>
              <p className='text-3xl text-white font-bold'>{serieDetails.name}</p>
              <div className='flex gap-1'>
                {serieDetails.genres.map(genre => (
                  <div className='border border-[#F6F7EB] rounded-full py-3 px-5'>
                    <p className='text-[#F6F7EB] font-bold'> {genre.name}</p>
                  </div>
                ))}
              </div>

              {/* serie details list */}
              <div className='flex w-full mt-2 laptop:gap-[5rem] tablet:gap-[2rem] tablet:overflow-x-auto'>
                <SerieDetailsList serieDetails={serieDetails} />
              </div>
            </div>

            {/* Overview */}
            <div className='flex w-full mt-[2%] justify-between'>
              <div className='flex flex-col gap-2 w-[60%]'>
                <p className='text-xl text-white font-bold'>Overview</p>
                <p className='italic text-white'>{serieDetails.overview}</p>
              </div>

              {/* Add to the account */}
              <div className='flex flex-col gap-2 mt-[2%]'>
                <AddToAccount
                  serieDetails={serieDetails}
                  addToWatchlist={addToWatchlist}
                  addToFavourite={addToFavourite}
                  account={account}
                  eyeIcon={<EyeIcon className='h-10 w-10 text-green-400' />}
                  heartIcon={<HeartIcon className='h-10 w-10 text-red-400' />}
                />
              </div>
            </div>

            {/* Actors */}
            <div className='flex justify-between mt-[5%] w-full'>
              <div className='w-[50%] pr-[2%]'>
                <p className='text-xl text-white font-bold'>Actors</p>
                {screenSize.width < 1000 ?
                  <SerieActors
                    serieId={serieId}
                    slidesPerView={3}
                    spaceBetween={10}
                  />
                  :
                  <SerieActors
                    serieId={serieId}
                    slidesPerView={5}
                    spaceBetween={10}
                  />
                }
              </div>

              {/* Companies */}
              <div className='w-[50%] pl-[2%]'>
                <p className='text-xl text-white font-bold'>Production Companies</p>
                <SerieCompanies
                  serieDetails={serieDetails}
                />
              </div>
            </div>

            {/* Recommendations */}
            <div className='mt-[2%]'>
              <p className='text-xl text-white font-bold'>Recommendations</p>
              {screenSize.width < 1000 ?
                <SerieRecommendations
                  serieId={serieId}
                  slidesPerView={3}
                  spaceBetween={10}
                />
                :
                <SerieRecommendations
                  serieId={serieId}
                  slidesPerView={5}
                  spaceBetween={10}
                />
              }
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default SerieDetails
