import React, { useState } from 'react'
import { useGetTrendingMoviesQuery } from '../features/Movies/moviesByGenreApi'
import useScreenSize from '../features/useScreenSize'
import AnimatedHeroSwiper from './AnimatedUI/AnimatedHeroSwiper'
import AnimatedNavbar from './AnimatedUI/AnimatedNavbar'
import AnimatedCategoriesButton from './AnimatedUI/AnimatedCategoriesButton'
import AnimatedCardCarousel from './AnimatedUI/AnimatedCardCarousel'
import MobileCategories from '../components/MobileView/MobileCategories'
import MobileCardCarousel from './UI/MobileCardCarousel'
import MobileHeroSwiper from './MobileView/MobileHeroSwiper'
import BarLoader from './UI/BarLoader'

const Dashboard = () => {
  const [type, setType] = useState('movie')
  const screenSize = useScreenSize()
  const { data: trendingMovies = [], isLoading } = useGetTrendingMoviesQuery(type)

  return (
    <div className='h-full w-full'>

      {/* Navigation bar */}
      <AnimatedNavbar setIsActive={setType} isActive={type} />


      {screenSize.width > 700 ?
        // Hero Swiper for desktop
        (isLoading ?
          <div className='h-[35rem] flex justify-center items-center'>
            <BarLoader height={'h-[6rem]'} />
          </div>
          :
          <AnimatedHeroSwiper type={type} data={trendingMovies} />
        )
        :
        // Hero Swiper for mobile
        (isLoading ?
          <div className='h-screen flex justify-center items-center'>
            <BarLoader height={'h-[5rem]'} />
          </div>
          :
          <MobileHeroSwiper type={type} data={trendingMovies} />
        )
      }

      {screenSize.width > 700 ?
        // dashboard for desktop
        <div className='h-full w-full flex flex-col'>
          <AnimatedCategoriesButton type={type} />
          <AnimatedCardCarousel list={'popular'} type={type} />
        </div>
        :
        // dashboard for mobile
        <div>
          <MobileCategories type={type} />
          <MobileCardCarousel type={type} />
        </div>
      }
    </div >
  )
}

export default Dashboard