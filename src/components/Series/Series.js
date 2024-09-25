import React from 'react'
import HeroSection from '../HeroSection'
import { useGetTrendingSeriesQuery } from '../../features/Series/allSeriesApi'
import Categories from '../Categories'
import PopularSeries from './PopularSeries'
import ActionSeries from './ActionSeries'
import AdventureSeries from './AdventureSeries'
import DocumentarySeries from './DocumentarySeries'
import DramaSeries from './DramaSeries'
import CrimeSeries from './CrimeSeries'
import ComedySeries from './ComedySeries'
import MysterySeries from './MysterySeries'
import SciFiSeries from './SciFiSeries'
import useScreenSize from '../../features/useScreenSize'
import { CircularProgress } from '@chakra-ui/react'

const Series = () => {
  const { data: allSeries = [], isLoading } = useGetTrendingSeriesQuery()
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
          <HeroSection data={allSeries} />
          <Categories
            popular={
              screenSize.width < 1000 ?
                <PopularSeries slidesPerView={3} spaceBetween={50} />
                :
                <PopularSeries slidesPerView={5} spaceBetween={10} />
            }
            action={
              screenSize.width < 1000 ?
                <ActionSeries slidesPerView={3} spaceBetween={50} />
                :
                <ActionSeries slidesPerView={5} spaceBetween={10} />
            }
            adventure={
              screenSize.width < 1000 ?
                <AdventureSeries slidesPerView={3} spaceBetween={50} />
                :
                <AdventureSeries slidesPerView={5} spaceBetween={10} />
            }
            animation={
              screenSize.width < 1000 ?
                <DocumentarySeries slidesPerView={3} spaceBetween={50} />
                :
                <DocumentarySeries slidesPerView={5} spaceBetween={10} />
            }
            comedy={
              screenSize.width < 1000 ?
                <ComedySeries slidesPerView={3} spaceBetween={50} />
                :
                <ComedySeries slidesPerView={5} spaceBetween={10} />
            }
            crime={
              screenSize.width < 1000 ?
                <CrimeSeries slidesPerView={3} spaceBetween={50} />
                :
                <CrimeSeries slidesPerView={5} spaceBetween={10} />
            }
            drama={
              screenSize.width < 1000 ?
                <DramaSeries slidesPerView={3} spaceBetween={50} />
                :
                <DramaSeries slidesPerView={5} spaceBetween={10} />
            }
            romance={
              screenSize.width < 1000 ?
                <MysterySeries slidesPerView={3} spaceBetween={50} />
                :
                <MysterySeries slidesPerView={5} spaceBetween={10} />
            }
            thriller={
              screenSize.width < 1000 ?
                <SciFiSeries slidesPerView={3} spaceBetween={50} />
                :
                <SciFiSeries slidesPerView={5} spaceBetween={10} />
            }
            categoryOne={'Action'}
            categoryTwo={'Adventure'}
            categoryThree={'Documentary'}
            categoryFour={'Comedy'}
            categoryFive={'Crime'}
            categorySix={'Drama'}
            categorySeven={'Reality'}
            categoryEight={'Sci-Fi'}
          />
        </>
      }
    </div>
  )
}

export default Series
