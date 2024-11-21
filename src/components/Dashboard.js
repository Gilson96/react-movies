import React, { useState } from 'react'
import { useGetTrendingMoviesQuery } from '../features/Movies/moviesByGenreApi'
import Navigator from '../components/UI/Navigator'
import CategoriesNew from './CategoriesNew'
import useScreenSize from '../features/useScreenSize'
import MovieByList from './Movies/MovieByList'
import Footer from './Footer'
import { SwipeCarousel } from '../components/UI/HeroCarousel'
import HeroSection from './OldCode/HeroSection'

const Dashboard = () => {
  const [type, setType] = useState('movie')
  const screeenSize = useScreenSize()
  const { data: trendingMovies = [], isLoading } = useGetTrendingMoviesQuery(type)

  return (
    <div className='h-full w-full'>

      <Navigator setIsActive={setType} isActive={type} />

      {isLoading ?
        <p>loading</p>
        :
        screeenSize.width < 700 ?
          <HeroSection type={type} data={trendingMovies} />
          :
          <SwipeCarousel type={type} data={trendingMovies} />
      }


      {screeenSize.width > 1000 ?
        <CategoriesNew type={type} slidesPerView={3.5} />
        :
        <CategoriesNew type={type} slidesPerView={1} />
      }

      {type === 'movie' &&
        < div className='mt-[1%] p-[3%]'>
          {screeenSize.width > 1000 ?
            <MovieByList list={'upcoming'} type={type} slidesPerView={5} spaceBetween={10} />
            :
            <MovieByList list={'upcoming'} type={type} slidesPerView={1} />
          }
        </div>
      }
      {type === 'tv' &&
        < div className='mt-[1%] p-[3%]'>
          {screeenSize.width > 1000 ?
            <MovieByList list={'on_the_air'} type={type} slidesPerView={5} spaceBetween={10} />
            :
            <MovieByList list={'on_the_air'} type={type} slidesPerView={1} />
          }
        </div>
      }

      <div className='mt-[1%] p-[3%]'>
        {screeenSize.width > 1000 ?
          <MovieByList list={'popular'} type={type} slidesPerView={5} spaceBetween={10} />
          :
          <MovieByList list={'popular'} type={type} slidesPerView={1} />
        }
      </div>

      <div className='mt-[1%] p-[3%]'>
        {screeenSize.width > 1000 ?
          <MovieByList list={'top_rated'} type={type} slidesPerView={5} spaceBetween={10} />
          :
          <MovieByList list={'top_rated'} type={type} slidesPerView={1} />
        }
      </div>

      <Footer />
    </div >
  )
}

export default Dashboard