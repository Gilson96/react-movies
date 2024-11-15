import React, { useState } from 'react'
import HeroSection from './HeroSection'
import { useGetTrendingMoviesQuery } from '../features/Movies/moviesByGenreApi'
import Navigator from './Navigator'
import HeroSectionFallback from './Fallback/HeroSectionFallback'
import CategoriesNew from './CategoriesNew'
import useScreenSize from '../features/useScreenSize'
import MovieByList from './Movies/MovieByList'
import Footer from './Footer'

const Dashboard = () => {
  const [type, setType] = useState('movie')
  const { data: trendingMovies = [], isLoading } = useGetTrendingMoviesQuery(type)
  const screeenSize = useScreenSize()

  return (
    <div className='h-full w-full'>

      <Navigator setIsActive={setType} isActive={type} />

      {isLoading ?
        <HeroSectionFallback />
        :
        <HeroSection data={trendingMovies} type={type} />
      }

      {screeenSize.width > 1000 ?
        <CategoriesNew type={type} slidesPerView={3.5} />
        :
        <CategoriesNew type={type} slidesPerView={2} />
      }

      {type === 'movie' &&
        < div className='mt-[1%] p-[3%]'>
          {screeenSize.width > 1000 ?
            <MovieByList list={'upcoming'} type={type} slidesPerView={5} spaceBetween={10} />
            :
            <MovieByList list={'upcoming'} type={type} slidesPerView={2} spaceBetween={20} />
          }
        </div>
      }
      {type === 'tv' &&
        < div className='mt-[1%] p-[3%]'>
          {screeenSize.width > 1000 ?
            <MovieByList list={'on_the_air'} type={type} slidesPerView={5} spaceBetween={10} />
            :
            <MovieByList list={'on_the_air'} type={type} slidesPerView={2} spaceBetween={20} />
          }
        </div>
      }

      <div className='mt-[1%] p-[3%]'>
        {screeenSize.width > 1000 ?
          <MovieByList list={'popular'} type={type} slidesPerView={5} spaceBetween={10} />
          :
          <MovieByList list={'popular'} type={type} slidesPerView={2} spaceBetween={20} />
        }
      </div>

      <div className='mt-[1%] p-[3%]'>
        {screeenSize.width > 1000 ?
          <MovieByList list={'top_rated'} type={type} slidesPerView={5} spaceBetween={10} />
          :
          <MovieByList list={'top_rated'} type={type} slidesPerView={2} spaceBetween={20}/>
        }
      </div>

      <Footer />
    </div >
  )
}

export default Dashboard