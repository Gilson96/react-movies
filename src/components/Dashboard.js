import React, { useState } from 'react'
import { useGetTrendingMoviesQuery } from '../features/Movies/moviesByGenreApi'
import useScreenSize from '../features/useScreenSize'
import Footer from './Footer'
import { SwipeCarousel } from '../components/AnimatedUI/HeroCarousel'
import HeroSection from './OldCode/HeroSection'
import HeroSectionFallback from './Fallback/HeroSectionFallback'
import HeroCarouselFallback from './Fallback/HeroCarouselFallback'
import NavBar from './AnimatedUI/Navbar'
import Categories from './AnimatedUI/CategoriesCard'
import CardCarousel from './AnimatedUI/CardCarousel'
import CategoriesNew from '../components/CategoriesNew'
const Dashboard = () => {
  const [type, setType] = useState('movie')
  const screeenSize = useScreenSize()
  const { data: trendingMovies = [], isLoading } = useGetTrendingMoviesQuery(type)

  return (
    <div className='h-full w-full'>

      <NavBar setIsActive={setType} isActive={type} />

      {screeenSize.width > 700 ?
        isLoading ?
          <HeroCarouselFallback />
          :
          <SwipeCarousel type={type} data={trendingMovies} />
        :
        isLoading ?
          <HeroSectionFallback />
          :
          <HeroSection type={type} data={trendingMovies} />
      }

      {screeenSize.width > 700 ?
        <div className='relative bottom-[4rem]'>
          <Categories type={type} />
        </div>
        :
        <CategoriesNew type={type} />
      }

      {type === 'movie' && <CardCarousel list={'upcoming'} type={type} />}
      {type === 'tv' && <CardCarousel list={'on_the_air'} type={type} />}
      <CardCarousel list={'popular'} type={type} />
      <CardCarousel list={'top_rated'} type={type} />

      {/* {type === 'movie' &&
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
      </div> */}

      <Footer />
    </div >
  )
}

export default Dashboard