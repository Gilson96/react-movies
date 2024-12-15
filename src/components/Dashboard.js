import React, { useState } from 'react'
import { useGetTrendingMoviesQuery } from '../features/Movies/moviesByGenreApi'
import useScreenSize from '../features/useScreenSize'
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

      
       { isLoading ?
          <HeroCarouselFallback />
          :
          <SwipeCarousel type={type} data={trendingMovies} />}
        
        {/* isLoading ?
          <HeroSectionFallback />
          :
          <HeroSection type={type} data={trendingMovies}/>
       */}

      {screeenSize.width > 700 ?
        <div className='h-full w-full flex flex-col'>
          <Categories type={type} />
          <CardCarousel list={'popular'} type={type} />
        </div>
        :
        <CategoriesNew type={type} />
      }
    </div >
  )
}

export default Dashboard