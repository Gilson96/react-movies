import React from 'react'
import HeroSection from '../HeroSection'
import { useGetTrendingMoviesQuery } from '../../features/Movies/allMoviesApi'
import Categories from '../Categories'
import PopularMovies from './PopularMovies'
import ActionMovies from './ActionMovies'
import AdventureMovies from './AdventureMovies'
import AnimationMovies from './AnimationMovies'
import DramaMovies from './DramaMovies'
import CrimeMovies from './CrimeMovies'
import ComedyMovies from './ComedyMovies'
import RomanceMovies from './RomanceMovies'
import ThrillerMovies from './ThrillerMovies'
import useScreenSize from '../../features/useScreenSize'
import { CircularProgress } from '@chakra-ui/react'

const Movies = () => {
  const { data: allMovies = [], isLoading } = useGetTrendingMoviesQuery()
  const screenSize = useScreenSize()

  return (
    <div className='flex flex-col min-h-[40rem] w-full h-full'>
      {isLoading ?
        <div className='flex flex-col w-full h-full justify-center items-center mt-[2%]'>
          <CircularProgress isIndeterminate size='100px' color='green.300' />
          <p className='text-white font-bold'>Loading...</p>
        </div>
        :
        <>
          <HeroSection data={allMovies} />
          <Categories
            popular={
              screenSize.width < 1000 ?
                <PopularMovies slidesPerView={3} spaceBetween={50} />
                :
                <PopularMovies slidesPerView={5} spaceBetween={10} />
            }
            action={
              screenSize.width < 1000 ?
                <ActionMovies slidesPerView={3} spaceBetween={50} />
                :
                <ActionMovies slidesPerView={5} spaceBetween={10} />
            }
            adventure={
              screenSize.width < 1000 ?
                <AdventureMovies slidesPerView={3} spaceBetween={50} />
                :
                <AdventureMovies slidesPerView={5} spaceBetween={10} />
            }
            animation={
              screenSize.width < 1000 ?
                <AnimationMovies slidesPerView={3} spaceBetween={50} />
                :
                <AnimationMovies slidesPerView={5} spaceBetween={10} />
            }
            comedy={
              screenSize.width < 1000 ?
                <ComedyMovies slidesPerView={3} spaceBetween={50} />
                :
                <ComedyMovies slidesPerView={5} spaceBetween={10} />
            }
            crime={
              screenSize.width < 1000 ?
                <CrimeMovies slidesPerView={3} spaceBetween={50} />
                :
                <CrimeMovies slidesPerView={5} spaceBetween={10} />
            }
            drama={
              screenSize.width < 1000 ?
                <DramaMovies slidesPerView={3} spaceBetween={50} />
                :
                <DramaMovies slidesPerView={5} spaceBetween={10} />
            }
            romance={
              screenSize.width < 1000 ?
                <RomanceMovies slidesPerView={3} spaceBetween={50} />
                :
                <RomanceMovies slidesPerView={5} spaceBetween={10} />
            }
            thriller={
              screenSize.width < 1000 ?
                <ThrillerMovies slidesPerView={3} spaceBetween={50} />
                :
                <ThrillerMovies slidesPerView={5} spaceBetween={10} />
            }
            categoryOne={'Action'}
            categoryTwo={'Adventure'}
            categoryThree={'Animation'}
            categoryFour={'Comedy'}
            categoryFive={'Crime'}
            categorySix={'Drama'}
            categorySeven={'Romance'}
            categoryEight={'Thriller'}
          />
        </>
      }
    </div>
  )
}

export default Movies